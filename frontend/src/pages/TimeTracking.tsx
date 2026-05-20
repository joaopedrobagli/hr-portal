import { useState } from 'react'
import { LogIn, LogOut, Clock } from 'lucide-react'

const mockRecords = [
  { id: 1, name: 'João Silva', date: '20/05/2025', entry: '08:02', exit: '17:05', total: '9h03' },
  { id: 2, name: 'Maria Souza', date: '20/05/2025', entry: '08:15', exit: '17:00', total: '8h45' },
  { id: 3, name: 'Carlos Lima', date: '20/05/2025', entry: '09:00', exit: '18:00', total: '9h00' },
  { id: 4, name: 'Ana Costa', date: '20/05/2025', entry: '07:50', exit: '16:50', total: '9h00' },
  { id: 5, name: 'Pedro Santos', date: '20/05/2025', entry: '08:30', exit: '--:--', total: 'Em andamento' },
]

export default function TimeTracking() {
  const [now] = useState(() =>
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Controle de Ponto</h1>
          <p className="text-sm text-gray-400 mt-0.5">Registros de hoje</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg">
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-600">{now}</span>
        </div>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 py-4 rounded-xl transition-all group">
          <LogIn size={16} className="group-hover:text-emerald-600" />
          <span className="text-sm font-medium">Registrar Entrada</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-600 py-4 rounded-xl transition-all group">
          <LogOut size={16} className="group-hover:text-red-500" />
          <span className="text-sm font-medium">Registrar Saída</span>
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Registros do Dia</h2>
          <span className="text-xs text-gray-400">{mockRecords.length} registros</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Funcionário</th>
              <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Entrada</th>
              <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Saída</th>
              <th className="px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-500">
                      {record.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{record.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-400">{record.date}</td>
                <td className="px-6 py-3.5">
                  <span className="text-sm text-emerald-600 font-medium">{record.entry}</span>
                </td>
                <td className="px-6 py-3.5">
                  <span className={`text-sm font-medium ${record.exit === '--:--' ? 'text-gray-300' : 'text-red-400'}`}>
                    {record.exit}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${record.total === 'Em andamento' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                    {record.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}