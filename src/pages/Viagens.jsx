import { MapPin } from 'lucide-react'
import { RecordPage } from '../components/RecordPage'
import { Badge, formatCurrency, formatDate, formatNumber } from '../components/UI'

export default function Viagens({ data, setData, trucks }) {
  const plates = trucks.map((truck) => truck.plate)
  const drivers = [...new Set(trucks.map((truck) => truck.driver))]
  const fields = [
    { name: 'date', label: 'Data da viagem', type: 'date', required: true },
    { name: 'truck', label: 'Caminhão utilizado', type: 'select', options: plates, required: true },
    { name: 'driver', label: 'Motorista', type: 'select', options: drivers, required: true },
    { name: 'origin', label: 'Origem', placeholder: 'Cidade, UF', required: true },
    { name: 'destination', label: 'Destino', placeholder: 'Cidade, UF', required: true },
    { name: 'cargo', label: 'Tipo de carga', required: true },
    { name: 'initialMileage', label: 'Quilometragem inicial', type: 'number', min: 0, required: true },
    { name: 'finalMileage', label: 'Quilometragem final', type: 'number', min: 0 },
    { name: 'distance', label: 'Distância percorrida (km)', type: 'number', readOnly: true, defaultValue: 0, hint: 'Calculada automaticamente pela quilometragem.' },
    { name: 'freightValue', label: 'Valor do frete', type: 'number', min: 0, step: '0.01', prefix: 'R$', required: true },
    { name: 'status', label: 'Status da viagem', type: 'select', options: ['Agendada', 'Em andamento', 'Finalizada'], required: true },
    { name: 'notes', label: 'Observações', type: 'textarea' },
  ]
  const columns = [
    { key: 'date', label: 'Data', render: formatDate },
    {
      key: 'origin',
      label: 'Rota',
      render: (value, record) => (
        <div className="flex min-w-52 items-center gap-2">
          <MapPin size={16} className="shrink-0 text-ocean" />
          <span><strong className="block text-slate-700">{value}</strong><small className="text-slate-400">para {record.destination}</small></span>
        </div>
      ),
    },
    { key: 'truck', label: 'Caminhão', render: (value) => <strong className="text-slate-700">{value}</strong> },
    { key: 'driver', label: 'Motorista' },
    { key: 'distance', label: 'Distância', render: (value) => `${formatNumber(value)} km` },
    { key: 'freightValue', label: 'Frete', render: (value) => <strong className="text-slate-700">{formatCurrency(value)}</strong> },
    { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> },
  ]

  return (
    <RecordPage
      eyebrow="Operação"
      title="Controle de viagens"
      description="Registre rotas, motoristas, quilometragens e valores de frete."
      addLabel="Nova viagem"
      data={data}
      setData={setData}
      fields={fields}
      columns={columns}
      filterFields={[
        { name: 'truck', label: 'Todos os caminhões', options: plates },
        { name: 'driver', label: 'Todos os motoristas', options: drivers },
        { name: 'status', label: 'Todos os status', options: ['Agendada', 'Em andamento', 'Finalizada'] },
      ]}
      transformValues={(values) => ({
        ...values,
        distance:
          values.finalMileage && values.initialMileage
            ? Math.max(Number(values.finalMileage) - Number(values.initialMileage), 0)
            : 0,
      })}
    />
  )
}
