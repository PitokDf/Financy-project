import { redisClient } from "@/config/redis";
import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput, UpdateUserInput } from "@/schemas/user.schema";
import { BcryptUtil } from "@/utils";
import { cacheManager } from "@/utils/cache";
import logger from "@/utils/winston.logger";

export interface PaginationQuery {
    page?: number;
    limit?: number;
}

export interface PaginatedUserResponse {
    data: Pick<{ id: string; name: string; email: string }, 'id' | 'name' | 'email'>[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export class UserService {
    constructor(private readonly userRepo: typeof UserRepository) { }

    public findAll = async (query?: PaginationQuery): Promise<PaginatedUserResponse> => {
        const page = query?.page || 1;
        const limit = query?.limit || 10;
        const skip = (page - 1) * limit;

        const cacheKey = `users:all:page:${page}:limit:${limit}`;

        const cachedResult = cacheManager.get<PaginatedUserResponse>(cacheKey);
        if (cachedResult) {
            logger.debug('[CACHE] Users served from cache', { page, limit });
            return cachedResult;
        }

        logger.debug('[CACHE] Users cache miss, fetching from database', { page, limit });

        const [users, total] = await Promise.all([
            this.userRepo.findAllOptimized({ skip, take: limit }),
            this.userRepo.count()
        ]);

        const result = {
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            }
        };

        // Cache the result for 5 minutes (300 seconds)
        cacheManager.set(cacheKey, result, 300);

        return result;
    }

    public findById = async (userId: string) => {
        const user = await this.userRepo.findById(userId)

        if (!user) throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);

        return { ...user, password: '[REDACTED]' }
    }

    public findProfile = async (userId: string) => {
        const user = await this.userRepo.findUserProfile(userId);

        if (!user) throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            level: user.userStats?.level ?? 1,
            streak: user.userStats?.streak ?? 0,
            badgeCount: user._count?.userBadges ?? 0
        };
    }

    public findByEmail = async (email: string, ignoreUserId?: string) => {
        const user = await this.userRepo.findByEmail(email, ignoreUserId)
        return user
    }

    private invalidateUserListCache() {
        cacheManager.delPattern('users:all:page:');
    }

    public create = async (data: CreateUserInput) => {
        const hashedPassword = (await BcryptUtil.hash(data.password))!

        const user = await this.userRepo.create({
            ...data,
            password: hashedPassword
        });

        // Invalidate all paginated cache after create
        this.invalidateUserListCache();

        return { ...user, password: '[REDACTED]' }
    }

    public update = async (userId: string, data: UpdateUserInput) => {
        await this.findById(userId)

        const updateData: any = { ...data };
        if (data && data.password) {
            updateData.password = (await BcryptUtil.hash(data.password))!
        }

        const user = await this.userRepo.update(userId, updateData)

        // Invalidate all paginated cache after update
        this.invalidateUserListCache();

        return { ...user, password: '[REDACTED]' }
    }

    public delete = async (userId: string) => {
        await this.findById(userId)

        const user = await this.userRepo.delete(userId)

        // Invalidate all paginated cache after delete
        this.invalidateUserListCache();

        return { ...user, password: '[REDACTED]' }
    }

    public purgeAllData = async (userId: string, password: string): Promise<void> => {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new AppError("User tidak ditemukan", HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await BcryptUtil.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Password salah. Periksa kembali password Anda.", HttpStatus.BAD_REQUEST);
        }

        logger.warn(`[UserDataService] Purging ALL data for user ${userId} (${user.email})`);

        // 2. Delete all user data in a single atomic transaction
        this.userRepo.purgeDeleteData(userId)
        const cachedKey = `dashboard:${userId}`;
        redisClient.del(cachedKey)

        logger.info(`[UserDataService] Successfully purged all data for user ${userId}`);
    }
}

export const userService = new UserService(UserRepository);