'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { registrarUsuario } from './actions'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isRegister) {
      // Lógica de Registro
      const res = await registrarUsuario(formData)
      if (res.success) {
        alert("Usuario creado con éxito. Ahora inicia sesión.")
        setIsRegister(false)
      } else {
        alert(res.error)
      }
    } else {
      // Lógica de Login (NextAuth)
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })
      if (res?.ok) {
        router.push('/')
        router.refresh()
      } else {
        alert("Error: Revisa tus credenciales")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input 
              type="text" placeholder="Tu nombre" required
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input 
            type="email" placeholder="Email" required
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Contraseña" required
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            {isRegister ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 text-blue-600 font-bold hover:underline"
          >
            {isRegister ? 'Inicia Sesión' : 'Regístrate aquí'}
          </button>
        </p>
      </div>
    </div>
  )
}
/*v1
'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (res?.ok) {
      router.push('/') // Si es correcto, va al Dashboard
      router.refresh()
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Bienvenido a AppDB</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}*/