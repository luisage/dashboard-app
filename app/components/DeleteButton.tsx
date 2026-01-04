'use client' // Los botones necesitan interactividad en el cliente
import { deleteUser } from '../actions'

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button 
  onClick={() => deleteUser(id)}
  className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-md border border-red-200 transition-colors"
>
  Eliminar
</button>
  )
}