import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RootLayoutClient } from "@/components/layouts/RootLayout";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: 'Fintrack',
    template: '%s | Fintrack'
  },
  description: "Aplikasi web manajemen keuangan pribadi untuk analisis pengeluaran, budgeting, dan laporan finansial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="id" className={cn("font-sans", inter.variable)}>
      <body className={`${fontSans.variable} antialiased bg-background text-foreground`}>
        <RootLayoutClient >
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
