'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { enviarComentario } from './actions'

export default function ChatForm() {
  const [texto, setTexto] = useState('')

  const handleSend = async () => {
    if (!texto.trim()) return
    await enviarComentario(texto)
    setTexto('') // Limpiar input
  }

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Escribe un mensaje..."
          className="flex-1 text-sm p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}