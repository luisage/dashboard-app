'use client'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/react' // Para saber quién soy yo
import { Trash2 } from 'lucide-react'
import { eliminarComentario } from './actions'

// Función para obtener los datos
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ChatList() {
  // SWR se encarga de re-validar los datos automáticamente
  const { data: session } = useSession() // Obtenemos mi sesión
  /*const { data: comments, error } = useSWR('/api/comments', fetcher, {
    refreshInterval: 3000, // Se actualiza cada 3 segundos (Simula tiempo real)
  })*/
  const { data: comments, error, mutate } = useSWR('/api/comments', fetcher, { refreshInterval: 3000 })

  // 1. Creamos una referencia al final de la lista
  const scrollRef = useRef<HTMLDivElement>(null)

  const miRol = (session?.user as any)?.role

  const handleEliminar = async (id: number) => {
    if (confirm("¿Seguro que quieres borrar este comentario?")) {
      await eliminarComentario(id)
      mutate() // Actualiza la lista de SWR inmediatamente
    }
  }

  // 2. Este efecto se ejecuta cada vez que 'comments' cambia
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [comments]) // Dependencia: la lista de comentarios

  if (error) return <div className="p-4 text-red-500">Error al cargar mensajes</div>
  if (!comments) return <div className="p-4 text-gray-400">Cargando chat...</div>

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
      {comments.map((c: any) => (
    <div key={c.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
            <p className={`text-xs font-bold ${c.user.role === 'ADMIN' ? 'text-red-600' : 'text-blue-600'}`}>
            {c.user.name}
            </p>
        
            {/* ETIQUETA DE ADMIN */}
            {c.user.role === 'ADMIN' && (
            <span className="bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider border border-red-200">
                Admin
            </span>
            )}
        </div>
      
        <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">
                {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              
              {/* BOTÓN ELIMINAR: Solo visible para ADMIN */}
              {miRol === 'ADMIN' && (
                <button 
                  onClick={() => handleEliminar(c.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                  title="Eliminar comentario"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

        </div>
        <p className="text-sm text-gray-700 leading-snug">{c.text}</p>
    </div>
    ))}

      {/* 3. Este div invisible es el "ancla" al final de la lista */}
      <div ref={scrollRef} />
    </div>
  )
}