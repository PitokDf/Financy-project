import jwt from 'jsonwebtoken';
export type JwtPayload = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
};
export declare const JwtUtil: {
    generate(payload: JwtPayload, expiresIn?: any): string;
    verify(token: string): jwt.JwtPayload & JwtPayload;
    decode(token: string): jwt.JwtPayload;
};
//# sourceMappingURL=jwt.d.ts.map