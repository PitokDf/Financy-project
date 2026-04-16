'use client'; // Changed to client component if it returns UI on loading, or simply keep it as a fragment

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    // You can keep loading state logic here if needed (e.g., waiting for client-side Auth provider)
    // But for SSR redirects, middleware handles it before rendering.
    return <>{children}</>;
}
