export default function OfflinePage() {
    return (
        <main className="min-h-screen px-5 py-10 flex items-center justify-center bg-background text-foreground">
            <section className="w-full max-w-sm rounded-2xl border bg-card p-6 text-center shadow-sm">
                <h1 className="text-lg font-semibold">Kamu sedang offline</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Koneksi internet terputus. Halaman yang sudah pernah dibuka dan data API GET yang
                    sudah tersimpan cache tetap bisa diakses.
                </p>
            </section>
        </main>
    );
}
