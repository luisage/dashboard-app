'use client' // Importante para usar useState
import { signOut, useSession } from 'next-auth/react' // Importamos hooks de Auth
import { LogOut, User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link' // Importamos Link
import { usePathname } from 'next/navigation' // Para saber en qué página estamos
import { Menu, X, Users, Settings, BarChart3 } from 'lucide-react'

export default function Sidebar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() // Obtenemos la ruta actual

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Botón Hamburguesa para Móviles */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md md:hidden shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay: Oscurece el fondo cuando el sidebar está abierto en móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
       flex flex-col`}>
        
        <div className="p-6 text-white font-bold text-xl flex items-center gap-2 border-b border-slate-800">
          <div className="w-6 h-6 bg-blue-500 rounded"></div> AppDB
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {/* Navegación a Usuarios (Home) */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <NavItem 
              icon={<Users size={18} />} 
              label="Usuarios" 
              active={pathname === '/'} 
            />
          </Link>

          {/* Navegación a Configuración */}
          <Link href="/configuracion" onClick={() => setIsOpen(false)}>
            <NavItem 
              icon={<Settings size={18} />} 
              label="Configuración" 
              active={pathname === '/configuracion'} 
            />
          </Link>

          <Link href="/reportes" onClick={() => setIsOpen(false)}>
            <NavItem 
                icon={<BarChart3 size={18} />} 
                label="Reportes" 
                active={pathname === '/reportes'} 
            />
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <UserIcon size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{session?.user?.name || 'Usuario'}</p>
            <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
          </div>
        </div>
        
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>



      </aside>
    </>
  )
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
      ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}
    `}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  )
}