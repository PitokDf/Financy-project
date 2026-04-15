'server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export async function ProtectedRoute({ children }: ProtectedRouteProps) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/login')

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
                        <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Memuat...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
