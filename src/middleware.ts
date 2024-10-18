import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const admin = request.cookies.get('admin');
    const { pathname } = request.nextUrl;

    // Si no tiene token, redirige al login
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Si está intentando acceder a /admin y no es admin, redirige al home
    if (pathname.startsWith('/admin') && !admin ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/admin/brands') && !admin ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/admin/orders') && !admin ) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    // Permitir acceso si cumple con los requisitos
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/admin', '/admin/brands', '/admin/orders', '/dashboard'] // Define las rutas donde aplicar el middleware
};
