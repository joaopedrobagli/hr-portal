import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Clock, LogOut } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employees', label: 'Funcionários', icon: Users },
  { to: '/time-tracking', label: 'Ponto', icon: Clock },
]

interface Props {
  user: { email: string; role: string } | null
  onLogout: () => void
}

export default function Sidebar({ user, onLogout }: Props) {
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'U'

  return (
    <aside className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1B2A4A]">HR Portal</span>
        <p className="text-xs text-gray-500 mt-0.5">Gestão de Pessoas</p>
      </div>

      <div className="px-3 flex-1">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 px-3 mb-2">Menu</p>
        <nav className="flex flex-col gap-0.5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#1B2A4A] font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-4 py-5 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-xs font-medium">
              {initials}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700 truncate max-w-[100px]">{user?.email}</p>
              <p className="text-[11px] text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Sair"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}