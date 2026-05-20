import { useState, useEffect } from 'react'
import { Users, Clock, UserX, Timer } from 'lucide-react'
import api from '../api'

interface Record {
  id: number
  employee: { id: number; name: string }
  type: string
  time: string
  date: string
}

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [empRes, recRes] = await Promise.all([
        api.get('/employees'),
        api.get('/time-records'),
      ])
      setTotalEmployees(empRes.data.length)
      setRecords(recRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toLocaleDateString('pt-BR')
  const todayRecords = records.filter(r => r.date === today)
  const presentIds = new Set(todayRecords.filter(r => r.type === 'entrada').map(r => r.employee?.id))
  const absentCount = Math.max(0, totalEmployees - presentIds.size)

  const stats = [
    { label: 'Total de Funcionários', value: totalEmployees, icon: Users, delta: 'cadastrados' },
    { label: 'Presentes Hoje', value: presentIds.size, icon: Clock, delta: `de ${totalEmployees} funcionários` },
    { label: 'Ausentes', value: absentCount, icon: UserX, delta: 'sem registro hoje' },
    { label: 'Registros Hoje', value: todayRecords.length, icon: Timer, delta: 'entradas e saídas' },
  ]

  const recentRecords = [...records].reverse().slice(0, 5)

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
            <p className="text-2xl font-semibold text-gray-800 mb-1">
              {loading ? '—' : stat.value}
            </p>
            <p className="text-xs text-gray-500">{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Registros Recentes</h2>
          <span className="text-xs text-gray-500">Últimos 5</span>
        </div>
        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="px-6 py-8 text-center text-sm text-gray-400">Carregando...</div>
          ) : recentRecords.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-gray-400">Nenhum registro ainda</div>
          ) : recentRecords.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-6 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                  {r.employee?.name?.split(' ').map(n => n[0]).join('') ?? '?'}
                </div>
                <span className="text-sm text-gray-700">{r.employee?.name ?? 'Desconhecido'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type === 'entrada' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {r.type === 'entrada' ? 'Entrada' : 'Saída'}
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