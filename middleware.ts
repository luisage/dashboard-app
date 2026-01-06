// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login", // La página a la que redirige si no hay sesión
  },
})

// Opcional: Define qué rutas proteger
export const config = { 
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|registro).*)",
  ] 
}

/*export { default } from "next-auth/middleware"

// Rutas que quieres proteger
export const config = { matcher: ["/", "/reportes", "/configuracion"] }*/