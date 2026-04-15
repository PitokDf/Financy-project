import { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";
export interface PaginationQuery {
    page?: number;
    limit?: number;
}
export interface PaginatedUserResponse {
    data: Pick<{
        id: string;
        name: string;
        email: string;
    }, 'id' | 'name' | 'email'>[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}
export declare function getAllUserService(query?: PaginationQuery): Promise<PaginatedUserResponse>;
export declare function getUserByIdService(userId: string): Promise<{
    password: string;
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getUserProfileService(userId: string): Promise<{
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
    level: number;
    streak: number;
    badgeCount: number;
}>;
export declare function getUserByEmailService(email: string, ignoreUserId?: string): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function createUserService(data: CreateUserInput): Promise<{
    password: string;
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateUserService(userId: string, data: UpdateUserInput): Promise<{
    password: string;
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteUserService(userId: string): Promise<{
    password: string;
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.service.d.ts.map