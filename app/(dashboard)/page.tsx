/*import { prisma } from '@/lib/prisma';

export default async function Home() {
  // 1. Consultamos los usuarios directamente desde PostgreSQL
  const usuarios = await prisma.user.findMany();

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 className="text-3xl font-bold text-blue-600">Dashboard de Usuarios</h1>
      
      {usuarios.length === 0 ? (
        <p>No hay usuarios en la base de datos.</p>
      ) : (
        <ul>
          {usuarios.map((user) => (
            <li key={user.id}>{user.name} - {user.email}  - {user.role}</li>
          ))}
        </ul>
      )}
    </main>
  );
}*/

/*import { prisma } from '@/lib/prisma';
import { addUser } from '../actions';
import DeleteButton from '../components/DeleteButton';
import Search from '../components/Search';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const usuarios = await prisma.user.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
    orderBy: { id: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {// Encabezado }
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Usuarios</h1>
          <p className="text-gray-600">Gestiona la base de datos de PostgreSQL en tiempo real.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {// Columna Izquierda: Formulario }
          <section className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Nuevo Usuario</h2>
              <form action={addUser} className="flex flex-col gap-4">
                <input 
                  name="name" 
                  placeholder="Nombre completo" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                  required 
                />
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                  required 
                />

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
                >
                  Guardar en DB
                </button>
              </form>
            </div>
          </section>

          {// Columna Derecha: Lista y Búsqueda }
          <section className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-800">Registros Existentes</h2>
                <div className="w-full sm:w-64">
                  <Search />
                </div>
              </div>

              <div className="space-y-3">
                {usuarios.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <p>No se encontraron resultados.</p>
                  </div>
                ) : (
                  usuarios.map((user) => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div>
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email} • {user.role ?? 'N/A'}</p>
                      </div>
                      <DeleteButton id={user.id} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}*/
//'use client'
//import { useState } from 'react'
import { Trophy, MessageSquare, Tv, Info, Send, Link, ShieldCheck } from 'lucide-react'
import { prisma } from "@/lib/prisma"
import { enviarComentario } from "./actions"
import ChatForm from "./ChatForm" // Crearemos este sub-componente abajo
import ChatList from "./ChatList"

export default function EnVivoPage() {
  //const [comentario, setComentario] = useState('')
  
/*export default async function EnVivoPage() {
  // Obtenemos los últimos 50 comentarios
  const comentarios = await prisma.comment.findMany({
    take: 50,
    orderBy: { createdAt: 'asc' },
    include: { user: { select: { name: true } } }
  })*/

  return (
    <div className="space-y-6">
      {/* TÍTULO Y ESTADO */}
      <header className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Tv className="text-red-500" /> Torneo Relámpago 2024
          </h1>
          <p className="text-sm text-gray-500">Final Masculina - Mesa 1</p>
        </div>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          • EN VIVO
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA: VIDEO E INFO (2/3 de ancho en PC) */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECCIÓN VIDEO */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            {/* Aquí puedes usar un iframe de YouTube o Twitch */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de ejemplo
              title="Ping Pong Live"
              allowFullScreen
            ></iframe>
          </div>

          {/* INFORMACIÓN DEL JUEGO */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Info size={20} className="text-blue-500" /> Sobre este encuentro
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Se enfrentan los dos mejores del ranking local. El juego se disputa a 
              <strong> 3 de 5 sets</strong>. El ganador clasificará directamente a la 
              final regional del próximo mes. ¡No te pierdas ni un saque!
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: MARCADOR Y COMENTARIOS (1/3 de ancho en PC) */}
        <div className="space-y-6">
          {/* MARCADORES */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-center text-xs font-bold tracking-widest uppercase mb-4 text-slate-400">
              Marcador Actual
            </h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-sm font-medium">García</p>
                <p className="text-4xl font-bold text-blue-400">11</p>
              </div>
              <div className="text-xl font-bold text-slate-600">VS</div>
              <div className="text-center">
                <p className="text-sm font-medium">Pérez</p>
                <p className="text-4xl font-bold text-red-400">08</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-center gap-2">
              <span className="bg-slate-800 px-2 py-1 rounded text-xs">Set 2</span>
              <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs font-bold">1 - 0</span>
            </div>
          </div>

          {/* CHAT REAL */}
            <div className="bg-white flex flex-col h-[400px] rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b bg-gray-50 font-bold text-sm">Chat de la Comunidad</div>
              
              <ChatList />

              {/* Input: Lo separamos a un componente de cliente */}
              <ChatForm />
            </div>
          </div>

        </div>
      

      {/* PIE DE PÁGINA AGREGADO */}
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Masters. Todos los derechos reservados.</p>
          <Link 
            href="/privacidad" 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium"
          >
            <ShieldCheck size={16} />
            Consulte nuestro aviso de privacidad
          </Link>
        </div>
      </footer>
    </div>
  )
}