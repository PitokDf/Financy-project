import "module-alias/register";
import { Request, Response } from "express";

// Gunakan dynamic import agar kalau ada error di top-level (module tidak ditemukan, Prisma crash, dsb), 
// errornya bisa ditangkap oleh blok try-catch dan ditampilkan ke layar, alih-alih layar blank "Function Invocation Failed".
export default async function handler(req: Request, res: Response) {
  try {
    const { default: app } = await import("../src/app");
    return app(req, res);
  } catch (error: any) {
    console.error("Vercel Invocation Error:", error);
    res.status(500).json({
      error: "Vercel Invocation Failed",
      message: error.message,
      stack: error.stack,
    });
  }
}
