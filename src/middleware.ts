import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const publicRoutes = ["/", "/product(.*)", "/cart", "/error(.*)", "/NotFound(.*)", "/search(.*)"];

const middleware = clerkMiddleware((req: any, evt: any) => {
  const url = req.nextUrl;

  // Verifique se a rota é pública
  if (publicRoutes.some((route) => new RegExp(route).test(url.pathname))) {
    return NextResponse.next();
  }

  // Verifique a autenticação para as rotas privadas
  return NextResponse.rewrite(new URL('/login', req.url));
});

export default middleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
