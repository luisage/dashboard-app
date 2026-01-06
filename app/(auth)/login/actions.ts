'use server' // IMPORTANTE: Cambia 'use client' por 'use server'
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registrarUsuario(formData: any) {
  const { email, password, name } = formData

  // 1. Encriptar la contraseña para guardarla
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const nuevoUsuario = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword, // Aquí guardamos el hash
      },
    })
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, error: "El email ya existe o hay un error de red" }
  }
}