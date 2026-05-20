import { useState } from 'react'
import api from '../api'

interface Props {
  onLogin: (token: string, user: { email: string; role: string }) => void
}

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      onLogin(res.data.token, res.data.user)
    } catch {
      setError('E-mail ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm w-full max-w-sm p-8">

        <div className="mb-8">
          <h1 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1B2A4A] mb-1">HR Portal</h1>
          <p className="text-xl font-semibold text-gray-800">Entrar na sua conta</p>
          <p className="text-sm text-gray-500 mt-1">Gestão de Pessoas</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Senha</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 text-sm font-medium text-white bg-[#1B2A4A] rounded-lg hover:bg-[#243660] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

      </div>
    </div>
  )
}