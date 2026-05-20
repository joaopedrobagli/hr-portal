import { Users, Clock, UserX, Timer } from 'lucide-react'

const stats = [
  { label: 'Total de Funcionários', value: '24', icon: Users, delta: '+2 este mês' },
  { label: 'Presentes Hoje', value: '18', icon: Clock, delta: '75% da equipe' },
  { label: 'Ausentes', value: '6', icon: UserX, delta: '3 justificados' },
  { label: 'Horas Trabalhadas', value: '142h', icon: Timer, delta: 'essa semana' },
]

const records = [
  { name: 'João Silva', action: 'Entrada', time: '08:02', type: 'in' },
  { name: 'Maria Souza', action: 'Entrada', time: '08:15', type: 'in' },
  { name: 'Carlos Lima', action: 'Saída', time: '12:00', type: 'out' },
  { name: 'Ana Costa', action: 'Entrada', time: '08:45', type: 'in' },
]

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Visão geral da equipe</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
              <stat.icon size={15} className="text-gray-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Registros Recentes</h2>
          <span className="text-xs text-gray-500">Hoje</span>
        </div>
        <div className="divide-y divide-gray-50">
          {records.map((r) => (
            <div key={r.name} className="flex items-center justify-between px-6 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm text-gray-700">{r.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {r.action}
                </span>
                <span className="text-xs text-gray-500 w-10 text-right">{r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}