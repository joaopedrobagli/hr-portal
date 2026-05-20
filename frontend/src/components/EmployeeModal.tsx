import { useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
  onSave: (employee: { name: string; role: string; department: string; email: string }) => void
}

export default function EmployeeModal({ onClose, onSave }: Props) {
  const [form, setForm] = useState({ name: '', role: '', department: '', email: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if (!form.name || !form.role || !form.department || !form.email) return
    onSave(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-gray-800">Novo Funcionário</h2>
            <p className="text-xs text-gray-500 mt-0.5">Preencha os dados do colaborador</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Nome completo</label>
            <input
              name="name"
              type="text"
              placeholder="Ex: João Silva"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Cargo</label>
            <input
              name="role"
              type="text"
              placeholder="Ex: Desenvolvedor"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Departamento</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors text-gray-700"
            >
              <option value="">Selecione...</option>
              <option value="TI">TI</option>
              <option value="Marketing">Marketing</option>
              <option value="Financeiro">Financeiro</option>
              <option value="RH">RH</option>
              <option value="Operações">Operações</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">E-mail</label>
            <input
              name="email"
              type="email"
              placeholder="Ex: joao@empresa.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1B2A4A] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 text-sm text-white bg-[#1B2A4A] rounded-lg hover:bg-[#243660] transition-colors font-medium"
          >
            Salvar
          </button>
        </div>

      </div>
    </div>
  )
}