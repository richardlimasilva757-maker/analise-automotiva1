import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rotas públicas que não precisam de autenticação
  const publicPaths = ['/', '/login']
  const path = request.nextUrl.pathname

  // Se é uma rota pública, permite acesso
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Para rotas protegidas, verifica se tem token do Supabase
  const supabaseToken = request.cookies.get('sb-access-token')

  if (!supabaseToken) {
    // Redireciona para login se não estiver autenticado
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
