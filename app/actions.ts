'use server' // Indica que este código solo se ejecuta en el servidor
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  //const role = formData.get('role') as string

  // Guardar en PostgreSQL
  /*await prisma.user.create({
    data: {
      name,
      email,

  //    age: age ? parseInt(age) : null,
    },
  })*/

  // Refrescar la página para ver el nuevo usuario
  revalidatePath('/')
}

export async function deleteUser(id: number) {
  // Eliminamos el usuario por su ID único
  await prisma.user.delete({
    where: {
      id: id,
    },
  })

  // Refrescamos la página para que el usuario desaparezca de la lista
  revalidatePath('/')
}