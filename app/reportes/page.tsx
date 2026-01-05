import { prisma } from '@/lib/prisma';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartWrapper from '../components/ChartWrapper'; // Necesario para evitar errores de renderizado

export default async function ReportesPage() {
  // Obtener usuarios con edad de la DB
  const usuarios = await prisma.user.findMany({
    where: { age: { not: 0 } },
    select: { age: true }
  });

  // Procesar datos para la gráfica
  const data = [
    { rango: '0-18', cantidad: usuarios.filter(u => u.age! <= 18).length },
    { rango: '19-30', cantidad: usuarios.filter(u => u.age! > 18 && u.age! <= 30).length },
    { rango: '31-50', cantidad: usuarios.filter(u => u.age! > 30 && u.age! <= 50).length },
    { rango: '50+', cantidad: usuarios.filter(u => u.age! > 50).length },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Reportes y Estadísticas</h1>
        <p className="text-gray-600">Distribución demográfica de los usuarios registrados.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Card de la Gráfica */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Usuarios por Rango de Edad</h3>
          <div className="h-80 w-full">
            <ChartWrapper data={data} colors={COLORS} />
          </div>
        </div>
      </div>
    </div>
  );
}