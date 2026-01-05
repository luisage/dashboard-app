import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        // En un proyecto real, aquí deberías usar 'bcrypt' para comparar contraseñas encriptadas
        if (user && user.password === credentials.password) {
          return { id: user.id.toString(), name: user.name, email: user.email }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login', // Le decimos a NextAuth que nuestra página personalizada está en /login
  }
})

export { handler as GET, handler as POST }