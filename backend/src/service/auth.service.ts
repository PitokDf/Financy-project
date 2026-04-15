import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { UserRepository } from "@/repositories/user.repository";
import { LoginDTO, RegisterDTO } from "@/schemas/user.schema";
import { BcryptUtil, JwtUtil } from "@/utils";

export class AuthService {
    constructor(private readonly userRepo: typeof UserRepository) { }

    public register = async (data: RegisterDTO) => {
        const existingUser = await this.userRepo.findByEmail(data.email);
        if (existingUser) throw new AppError('Email sudah terdaftar', HttpStatus.CONFLICT);

        const hashedPassword = await BcryptUtil.hash(data.password);

        const user = await this.userRepo.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        const token = JwtUtil.generate({ ...user, user_id: user.id }, '3d');

        return { user, token };
    }

    public login = async (data: LoginDTO) => {
        const user = await this.userRepo.findByEmail(data.email);

        if (!user) throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);

        const isValidPassword = await BcryptUtil.compare(data.password, user.password);

        if (!isValidPassword) throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);

        const token = JwtUtil.generate({ ...user, user_id: user.id }, '3d')

        return { user, token };
    }
}
