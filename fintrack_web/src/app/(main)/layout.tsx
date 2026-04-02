import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/layouts/bottom-nav"
import { DesktopSidebar } from "@/components/layouts/desktop-sidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="min-h-dvh bg-muted/20 lg:pl-72">
                <DesktopSidebar />

                <main className="relative min-h-dvh w-full overflow-x-hidden bg-background pb-24 lg:pb-0 lg:border-l lg:border-border/60 lg:shadow-sm">
                    {children}
                </main>

                {/* Fixed Bottom Navigation only for mobile */}
                <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none lg:hidden">
                    <div className="w-full max-w-md pointer-events-auto px-2 sm:px-0">
                        <BottomNav />
                    </div>
                </div>
            </div>
        </AuthGuard>
    )
}
