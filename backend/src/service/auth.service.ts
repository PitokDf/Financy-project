import crypto from "crypto";
import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { UserRepository } from "@/repositories/user.repository";
import { ChangePassword, LoginDTO, RegisterDTO } from "@/schemas/user.schema";
import { BcryptUtil, JwtUtil } from "@/utils";
import prisma from "@/config/prisma";
import { sendResetPasswordEmail } from "./email.service";
import logger from "@/utils/winston.logger";

export class AuthService {
  constructor(private readonly userRepo: typeof UserRepository) {}

  public register = async (data: RegisterDTO) => {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser)
      throw new AppError("Email sudah terdaftar", HttpStatus.CONFLICT);

    const hashedPassword = await BcryptUtil.hash(data.password);

    const user = await this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const token = JwtUtil.generate({ ...user, user_id: user.id }, "3d");

    return { user, token };
  };

  public changePassword = async (data: ChangePassword, email: string) => {
    const existingUser = await this.userRepo.findByEmail(email);
    if (!existingUser)
      throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);

    if (!existingUser.password && existingUser.password === null) {
      throw new AppError(
        "Akun Google SSO tidak dapat mengganti kata sandi",
        HttpStatus.BAD_REQUEST,
      );
    }

    const isCorrect = await BcryptUtil.compare(
      data.currentPassword,
      existingUser.password,
    );
    if (!isCorrect) throw new AppError("Kata sandi saat ini salah");

    const isPasswordSame = await BcryptUtil.compare(
      data.newPassword,
      existingUser.password,
    );
    if (isPasswordSame)
      throw new AppError("Kata sandi baru tidak boleh sama dengan saat ini");

    const newPasswordHashed = await BcryptUtil.hash(data.newPassword);
    return await this.userRepo.update(existingUser.id, {
      password: newPasswordHashed,
    });
  };

  public login = async (data: LoginDTO) => {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user)
      throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);

    if (!user.password) {
      throw new AppError(
        "Akun ini menggunakan Google SSO. Silakan masuk dengan Google.",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await BcryptUtil.compare(
      data.password,
      user.password,
    );

    if (!isValidPassword)
      throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);

    const token = JwtUtil.generate({ ...user, user_id: user.id }, "3d");

    return { user, token };
  };

  public forgotPassword = async (email: string) => {
    const user = await this.userRepo.findByEmail(email);
    if (!user)
      throw new AppError("Email tidak ditemukan", HttpStatus.NOT_FOUND);

    if (!user.password) {
      throw new AppError(
        "Akun ini terdaftar via Google SSO. Silakan masuk dengan Google.",
        HttpStatus.BAD_REQUEST,
      );
    }

    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    try {
      await sendResetPasswordEmail(user.email, user.name, token);
    } catch (error) {
      logger.error(
        "[Auth] Failed to send reset email, but token was created:",
        error,
      );
    }

    return { message: "Email reset password telah dikirim" };
  };

  public resetPassword = async (token: string, newPassword: string) => {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken)
      throw new AppError("Token tidak valid", HttpStatus.BAD_REQUEST);
    if (resetToken.used)
      throw new AppError("Token sudah digunakan", HttpStatus.BAD_REQUEST);
    if (resetToken.expiresAt < new Date())
      throw new AppError(
        "Token sudah kedaluwarsa. Silakan minta reset password lagi.",
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await BcryptUtil.hash(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ]);

    return { message: "Password berhasil direset" };
  };
}
