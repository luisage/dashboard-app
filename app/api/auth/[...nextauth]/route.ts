// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

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

        // Aquí es donde comparamos la contraseña ingresada con la de la DB
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { 
            id: user.id.toString(), 
            name: user.name, 
            email: user.email,
            role: user.role 
          }
        }
        return null
      }
    })
  ],

  session: {
    strategy: "jwt", // Esto hace que la sesión sea rápida y no consulte la DB en cada clic
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        console.log("Usuario encontrado en login:", user);
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Token en sesión:", token);
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }