import { UserRepository } from "../repositories/user.repository";
import { LoginDTO, RegisterDTO } from "../schemas/user.schema";
export declare class AuthService {
    private readonly userRepo;
    constructor(userRepo: typeof UserRepository);
    register: (data: RegisterDTO) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login: (data: LoginDTO) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map