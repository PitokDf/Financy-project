import nodemailer from 'nodemailer';
import { config } from '@/config';
import logger from '@/utils/winston.logger';

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
});

export async function verifyEmailConnection(): Promise<boolean> {
    try {
        if (!config.SMTP_USER || !config.SMTP_PASS) {
            logger.warn('[Email] SMTP credentials not configured. Email sending disabled.');
            return false;
        }
        await transporter.verify();
        logger.info('[Email] SMTP connection verified successfully');
        return true;
    } catch (error) {
        logger.warn('[Email] SMTP connection failed:', error);
        return false;
    }
}

export async function sendResetPasswordEmail(
    email: string,
    name: string,
    token: string
): Promise<void> {
    if (!config.SMTP_USER || !config.SMTP_PASS) {
        logger.warn('[Email] SMTP not configured. Reset token:', token);
        return;
    }

    const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${token}`;

    try {
        await transporter.sendMail({
            from: `"FinTrack" <${config.SMTP_USER}>`,
            to: email,
            subject: 'Reset Password FinTrack',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                                    <tr>
                                        <td style="background:linear-gradient(135deg,#10b981,#059669);padding:32px;text-align:center;">
                                            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">FinTrack</h1>
                                            <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Manajemen Keuangan Pribadi</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:32px;">
                                            <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:600;">Halo ${name},</h2>
                                            <p style="margin:0 0 24px;color:#71717a;font-size:14px;line-height:1.6;">
                                                Anda menerima email ini karena Anda meminta reset password untuk akun FinTrack Anda.
                                                Klik tombol di bawah untuk membuat password baru.
                                            </p>
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" style="padding:0 0 24px;">
                                                        <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background-color:#10b981;color:#ffffff;text-decoration:none;border-radius:12px;font-weight:600;font-size:14px;">
                                                            Reset Password
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p style="margin:0 0 16px;color:#71717a;font-size:13px;line-height:1.6;">
                                                Atau copy link berikut ke browser Anda:
                                            </p>
                                            <p style="margin:0 0 24px;padding:12px;background-color:#f4f4f5;border-radius:8px;word-break:break-all;">
                                                <a href="${resetUrl}" style="color:#10b981;font-size:13px;text-decoration:none;">${resetUrl}</a>
                                            </p>
                                            <div style="border-top:1px solid #e4e4e7;padding-top:16px;">
                                                <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;">
                                                    ⏰ Link ini berlaku selama <strong>15 menit</strong>.
                                                </p>
                                                <p style="margin:0;color:#a1a1aa;font-size:12px;">
                                                    Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#f4f4f5;padding:16px 32px;text-align:center;">
                                            <p style="margin:0;color:#a1a1aa;font-size:12px;">
                                                © ${new Date().getFullYear()} FinTrack. Semua hak dilindungi.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });
        logger.info(`[Email] Reset password email sent to ${email}`);
    } catch (error) {
        logger.error('[Email] Failed to send reset password email:', error);
        throw error;
    }
}
