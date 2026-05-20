import { useState, useEffect } from 'react'
import { LogIn, LogOut, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../api'

interface Employee {
  id: number
  name: string
}

interface TimeRecord {
  id: number
  employee: { id: number; name: string }
  type: string
  time: string
  date: string
}

const PER_PAGE = 4

export default function TimeTracking() {
  const [records, setRecords] = useState<TimeRecord[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [now, setNow] = useState(() =>
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  )

  useEffect(() => {
    fetchRecords()
    fetchEmployees()
  }, [])

  const fetchRecords = async () => {
    try {
      const res = await api.get('/time-records')
      setRecords(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees')
      setEmployees(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getTime = () => {
    const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setNow(t)
    return t
  }

  const getDate = () => new Date().toLocaleDateString('pt-BR')

  const handleRecord = async (type: 'entrada' | 'saida') => {
    if (employees.length === 0) {
      alert('Nenhum funcionário cadastrado!')
      return
    }
    try {
      const time = getTime()
      const firstEmployee = employees[0]
      const res = await api.post('/time-records', {
        type,
        time,
        date: getDate(),
        employee: { id: firstEmployee.id },
      })

      const newRecord = {
        ...res.data,
        employee: { id: firstEmployee.id, name: firstEmployee.name },
      }

      setRecords([newRecord, ...records])
      setPage(1)
    } catch (err) {
      console.error(err)
    }
  }

  const totalPages = Math.max(1, Math.ceil(records.length / PER_PAGE))
  const paginated = records.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Controle de Ponto</h1>
          <p className="text-sm text-gray-500 mt-0.5">Registros de hoje</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg">
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-600">{now}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => handleRecord('entrada')}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 py-4 rounded-xl transition-all group"
        >
          <LogIn size={16} className="group-hover:text-emerald-600" />
          <span className="text-sm font-medium">Registrar Entrada</span>
        </button>
        <button
          onClick={() => handleRecord('saida')}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-600 py-4 rounded-xl transition-all group"
        >
          <LogOut size={16} className="group-hover:text-red-500" />
          <span className="text-sm font-medium">Registrar Saída</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Registros do Dia</h2>
          <span className="text-xs text-gray-500">{records.length} registros</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Funcionário</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Horário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">Carregando...</td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">Nenhum registro encontrado</td>
              </tr>
            ) : paginated.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                      {record.employee?.name?.split(' ').map(n => n[0]).join('') ?? '?'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{record.employee?.name ?? 'Desconhecido'}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-500">{record.date}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${record.type === 'entrada' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {record.type === 'entrada' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-sm font-medium text-gray-600">{record.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Página {page} de {totalPages}</span>
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