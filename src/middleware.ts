import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const admin = request.cookies.get('admin')?.value || null; // Verifica si la cookie existe
    const { pathname } = request.nextUrl;

    // Si no hay cookie 'admin', redirige a /auth/login
    if (!admin) {
        // Permite el acceso solo a rutas de login o register
        if (pathname.startsWith('/admin') && pathname !== '/auth/login' && pathname !== '/auth/register') {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'] // Aplica el middleware a cualquier ruta bajo /admin
};
