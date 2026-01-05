export { default } from "next-auth/middleware"

// Rutas que quieres proteger
export const config = { matcher: ["/", "/reportes", "/configuracion"] }