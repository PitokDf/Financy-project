import { Wallet } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-dvh flex flex-col justify-center items-center bg-background p-4 md:p-8 overflow-hidden selection:bg-primary selection:text-primary-foreground">
            {/* Stunning Grid & Mesh Pattern Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                {/* Glowing Orbs */}
                <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center justify-center space-y-8 mt-4 mb-4">
                {/* Brand Header */}
                <div className="text-center space-y-4 z-20 flex flex-col items-center animate-in mb-2 mt-4">
                    <div className="bg-primary/5 p-3.5 rounded-2xl border border-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary),0.15)] ring-1 ring-white/10 dark:ring-white/5">
                        <Wallet className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                            Fintrack.
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground/80 max-w-[280px] mx-auto leading-relaxed">
                            Kelola keuangan masa depanmu dengan lebih cerdas.
                        </p>
                    </div>
                </div>

                <div className="w-full z-20 animate-in fade-in zoom-in-95 duration-700">
                    {children}
                </div>
            </div>
        </div>
    )
}