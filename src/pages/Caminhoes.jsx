import { Truck } from 'lucide-react'
import { RecordPage } from '../components/RecordPage'
import { Badge, formatNumber } from '../components/UI'

export default function Caminhoes({ data, setData }) {
  const fields = [
    { name: 'plate', label: 'Placa', placeholder: 'ABC-1D23', required: true },
    { name: 'model', label: 'Modelo', placeholder: 'Ex.: Volvo FH 540', required: true },
    { name: 'year', label: 'Ano', type: 'number', min: 1980, required: true },
    { name: 'driver', label: 'Motorista responsável', required: true },
    { name: 'mileage', label: 'Quilometragem atual', type: 'number', min: 0, required: true },
    { name: 'capacity', label: 'Capacidade do caminhão', placeholder: 'Ex.: 29 toneladas' },
    { name: 'status', label: 'Status', type: 'select', options: ['Disponível', 'Em viagem', 'Em manutenção'], required: true },
    { name: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Características, restrições ou informações úteis...' },
  ]
  const columns = [
    {
      key: 'plate',
      label: 'Caminhão',
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-ocean"><Truck size={17} /></span>
          <span><strong className="block text-slate-700">{value}</strong><small className="text-slate-400">{record.model}</small></span>
        </div>
      ),
    },
    { key: 'driver', label: 'Motorista', render: (value) => <span className="font-semibold">{value}</span> },
    { key: 'year', label: 'Ano' },
    { key: 'mileage', label: 'Quilometragem', render: (value) => `${formatNumber(value)} km` },
    { key: 'capacity', label: 'Capacidade' },
    { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> },
  ]

  return (
    <RecordPage
      eyebrow="Gestão de frota"
      title="Caminhões"
      description="Cadastre os veículos, acompanhe a disponibilidade e centralize o histórico da frota."
      addLabel="Novo caminhão"
      data={data}
      setData={setData}
      fields={fields}
      columns={columns}
      filterFields={[{ name: 'status', label: 'Todos os status', options: ['Disponível', 'Em viagem', 'Em manutenção'] }]}
    />
  )
}
