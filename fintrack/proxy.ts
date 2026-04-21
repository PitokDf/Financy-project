import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    let isTokenValid = false;
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-development-only');
            await jwtVerify(token, secret);
            isTokenValid = true;
        } catch (e) {
            isTokenValid = false;
        }
    }

    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
    const isPublicRoute = request.nextUrl.pathname === '/';

    if (isAuthRoute && isTokenValid) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isStaticFile = request.nextUrl.pathname.match(/\.(.*)$/);
    const isNextAsset = request.nextUrl.pathname.startsWith('/_next');
    const isSW = request.nextUrl.pathname.startsWith('/sw');

    const isAssetRoute = isApiRoute || isStaticFile || isNextAsset || isSW;

    if (token && !isTokenValid && !isAssetRoute) {
        const response = NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
        response.cookies.delete('token');
        return response;
    }

    if (!isTokenValid && !isAuthRoute && !isPublicRoute && !isAssetRoute) {
        return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icons|offline).*)',
    ],
};
