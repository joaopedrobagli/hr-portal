import { useState } from 'react'
import { Search, Plus } from 'lucide-react'

const mockEmployees = [
  { id: 1, name: 'João Silva', role: 'Desenvolvedor', department: 'TI', status: 'Ativo', email: 'joao@empresa.com' },
  { id: 2, name: 'Maria Souza', role: 'Designer', department: 'Marketing', status: 'Ativo', email: 'maria@empresa.com' },
  { id: 3, name: 'Carlos Lima', role: 'Analista', department: 'Financeiro', status: 'Ativo', email: 'carlos@empresa.com' },
  { id: 4, name: 'Ana Costa', role: 'Gerente', department: 'RH', status: 'Inativo', email: 'ana@empresa.com' },
  { id: 5, name: 'Pedro Santos', role: 'Desenvolvedor', department: 'TI', status: 'Ativo', email: 'pedro@empresa.com' },
]

export default function Employees() {
  const [search, setSearch] = useState('')

  const filtered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Funcionários</h1>
          <p className="text-sm text-gray-500 mt-0.5">{mockEmployees.length} colaboradores cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1B2A4A] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#243660] transition-colors">
          <Plus size={14} />
          Novo Funcionário
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar funcionário..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors"
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">E-mail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{emp.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-600">{emp.role}</td>
                <td className="px-6 py-3.5 text-sm text-gray-600">{emp.department}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${emp.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-500">{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}