import { useState, useEffect } from 'react'
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import EmployeeModal from '../components/EmployeeModal'
import api from '../api'

interface Employee {
  id: number
  name: string
  role: string
  department: string
  status: string
  email: string
}

const PER_PAGE = 4

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees')
      setEmployees(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSave = async (data: { name: string; role: string; department: string; email: string }) => {
    try {
      const res = await api.post('/employees', data)
      setEmployees([res.data, ...employees])
      setPage(1)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {modalOpen && (
        <EmployeeModal onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Funcionários</h1>
          <p className="text-sm text-gray-500 mt-0.5">{employees.length} colaboradores cadastrados</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#1B2A4A] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#243660] transition-colors"
        >
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
              onChange={e => { setSearch(e.target.value); setPage(1) }}
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">Carregando...</td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">Nenhum funcionário encontrado</td>
              </tr>
            ) : paginated.map(emp => (
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

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Página {page} de {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 text-xs rounded-lg border transition-colors ${
                  p === page
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}