import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

interface Props {
  user: { email: string; role: string } | null
  onLogout: () => void
}

export default function Layout({ user, onLogout }: Props) {
  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}