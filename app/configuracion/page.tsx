// app/configuracion/page.tsx
export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Administra las preferencias de tu cuenta y el sistema.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Perfil de Administrador</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Dashboard</label>
            <input type="text" defaultValue="AppDB Admin" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notificaciones por Email</label>
            <input type="checkbox" defaultChecked className="mt-2 h-4 w-4 text-blue-600" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}