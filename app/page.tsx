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

import { prisma } from '@/lib/prisma';
import { addUser } from './actions';
import DeleteButton from './components/DeleteButton';
import Search from './components/Search';

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
        
        {/* Encabezado */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Usuarios</h1>
          <p className="text-gray-600">Gestiona la base de datos de PostgreSQL en tiempo real.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Formulario */}
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

          {/* Columna Derecha: Lista y Búsqueda */}
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
}