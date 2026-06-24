export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh max-w-2xl mx-auto bg-background">
      {children}
    </main>
  );
}
