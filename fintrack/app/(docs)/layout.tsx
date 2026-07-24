import Link from 'next/link'
import { BookOpen, FileText, HelpCircle, ArrowLeft } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Beranda', href: '/docs', icon: BookOpen },
  { label: 'Fitur', href: '/docs/features', icon: FileText },
  { label: 'FAQ', href: '/docs/faq', icon: HelpCircle },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke FinTrack</span>
            <span className="sm:hidden">FinTrack</span>
          </Link>
          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">{children}</main>

      <footer className="border-t border-border/50 mt-12 sm:mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="FinTrack" className="w-6 h-6 rounded-md" />
            <span className="text-sm font-semibold text-foreground">FinTrack</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground flex-wrap justify-center">
            <Link href="/docs" className="hover:text-foreground transition-colors">Dokumentasi</Link>
            <Link href="/docs/features" className="hover:text-foreground transition-colors">Fitur</Link>
            <Link href="/docs/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Masuk</Link>
          </div>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} FinTrack. Dibuat oleh Pito Desri Pauzi.
          </p>
        </div>
      </footer>
    </div>
  )
}
