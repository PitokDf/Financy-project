import { RegisterForm } from "@/components/pages/auth/register-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function RegisterPage() {
    return (
        <Card className="w-full rounded-md border border-white/10 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden relative">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

            {/* HEADER */}
            <CardHeader className="space-y-2 text-center pb-6 pt-8 px-6 sm:px-8">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <UserPlus className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Buat Akun Baru
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm font-medium">
                    Gabung dengan ribuan pengguna lainnya
                </CardDescription>
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="space-y-6 px-6 sm:px-8">
                <RegisterForm />
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="justify-center text-sm font-medium text-muted-foreground pb-8 px-6 sm:px-8 bg-black/[0.02] dark:bg-white/[0.02] border-t border-white/5 dark:border-white/5 pt-4 mt-2">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="ml-1.5 text-primary hover:text-primary/80 transition-colors flex items-center group">
                    <ArrowLeft className="mr-1 w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Masuk Sekarang
                </Link>
            </CardFooter>
        </Card>
    )
}