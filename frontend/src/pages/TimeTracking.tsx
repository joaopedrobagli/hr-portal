import { useState, useEffect } from 'react'
import { Clock, LogIn, LogOut } from 'lucide-react'
import api from '../api'

interface Employee {
  id: number
  name: string
  role: string
  department: string
}

interface TimeRecord {
  id: number
  employee: { id: number; name: string }
  type: string
  time: string
  date: string
}

export default function TimeTracking() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [records, setRecords] = useState<TimeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(() =>
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  )

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      setNow(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [empRes, recRes] = await Promise.all([
        api.get('/employees'),
        api.get('/time-records'),
      ])
      setEmployees(empRes.data)
      setRecords(recRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toLocaleDateString('pt-BR')

  const getStatus = (employeeId: number) => {
    const todayRecords = records
      .filter(r => r.employee?.id === employeeId && r.date === today)
      .sort((a, b) => a.time.localeCompare(b.time))

    if (todayRecords.length === 0) return { type: null, time: null }
    const last = todayRecords[todayRecords.length - 1]
    return { type: last.type, time: last.time }
  }

  const handleRecord = async (employeeId: number, type: 'entrada' | 'saida') => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setNow(time)
    try {
      const res = await api.post('/time-records', {
        type,
        time,
        date: today,
        employee: { id: employeeId },
      })
      const emp = employees.find(e => e.id === employeeId)
      const newRecord = {
        ...res.data,
        employee: { id: employeeId, name: emp?.name ?? '' },
      }
      setRecords([...records, newRecord])
    } catch (err) {
      console.error(err)
    }
  }

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

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Funcionários</h2>
          <span className="text-xs text-gray-500">{employees.length} colaboradores</span>
        </div>

        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="px-6 py-8 text-center text-sm text-gray-400">Carregando...</div>
          ) : employees.map(emp => {
            const status = getStatus(emp.id)
            const isInside = status.type === 'entrada'
            const hasRecord = status.type !== null

            return (
              <div key={emp.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[11px] font-semibold text-[#1B2A4A]">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{emp.name}</div>
                    <div className="text-xs text-gray-400">
                      {hasRecord
                        ? `${status.type === 'entrada' ? 'Entrada' : 'Saída'} às ${status.time}`
                        : 'Sem registro hoje'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {hasRecord && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isInside ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {isInside ? 'Dentro' : 'Saiu'}
                    </span>
                  )}
                  {!hasRecord || isInside ? (
                    <button
                      onClick={() => handleRecord(emp.id, isInside ? 'saida' : 'entrada')}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        isInside
                          ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {isInside ? <><LogOut size={13} /> Saída</> : <><LogIn size={13} /> Entrada</>}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">Encerrado</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}