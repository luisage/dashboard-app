'use server'
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export async function enviarComentario(texto: string) {
  const session = await getServerSession()
  
  if (!session?.user?.email) return { error: "No autorizado" }

  const usuario = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!usuario) return { error: "Usuario no encontrado" }

  await prisma.comment.create({
    data: {
      text: texto,
      userId: usuario.id
    }
  })

  // Esto refresca la página automáticamente para mostrar el nuevo mensaje
  revalidatePath('/en-vivo')
}

export async function eliminarComentario(id: number) {
  const session = await getServerSession()
  
  // 1. Buscamos al usuario que intenta borrar
  const usuario = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" }
  })

  // 2. Solo permitimos si es ADMIN
  if (usuario?.role !== 'ADMIN') {
    return { error: "No tienes permisos" }
  }

  await prisma.comment.delete({
    where: { id }
  })

  revalidatePath('/en-vivo')
  return { success: true }
}