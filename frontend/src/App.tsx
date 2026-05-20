import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import TimeTracking from './pages/TimeTracking'
import Layout from './components/Layout'
import Login from './pages/Login'

interface User {
  email: string
  role: string
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') ?? 'null'))

  const handleLogin = (token: string, user: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="time-tracking" element={<TimeTracking />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}