import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import TimeTracking from './pages/TimeTracking'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="time-tracking" element={<TimeTracking />} />
      </Route>
    </Routes>
  )
}