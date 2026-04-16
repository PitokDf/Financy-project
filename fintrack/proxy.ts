import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
    const isPublicRoute = request.nextUrl.pathname === '/'; // Add any other public routes here

    // If trying to access auth pages but already logged in
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If trying to access protected pages but not logged in
    if (!token && !isAuthRoute && !isPublicRoute) {
        // Exclude API routes, static files, Next.js assets, etc. from being redirected
        const isApiRoute = request.nextUrl.pathname.startsWith('/api');
        const isStaticFile = request.nextUrl.pathname.match(/\.(.*)$/);
        const isNextAsset = request.nextUrl.pathname.startsWith('/_next');
        const isSW = request.nextUrl.pathname.startsWith('/sw');

        if (!isApiRoute && !isStaticFile && !isNextAsset && !isSW) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icons|offline).*)',
    ],
};
