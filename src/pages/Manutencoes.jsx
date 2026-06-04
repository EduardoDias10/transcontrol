import { AlertTriangle, CalendarClock, Wrench } from 'lucide-react'
import { Attachment } from '../components/FormModal'
import { RecordPage } from '../components/RecordPage'
import { Badge, formatCurrency, formatDate, formatNumber } from '../components/UI'

export default function Manutencoes({ data, setData, trucks }) {
  const plates = trucks.map((truck) => truck.plate)
  const types = ['Troca de óleo', 'Revisão', 'Pneus', 'Freios', 'Elétrica', 'Mecânica', 'Outro']
  const upcoming = [...data]
    .filter((item) => item.nextDate)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
    .slice(0, 3)

  const fields = [
    { name: 'date', label: 'Data da manutenção', type: 'date', required: true },
    { name: 'truck', label: 'Caminhão', type: 'select', options: plates, required: true },
    { name: 'type', label: 'Tipo de manutenção', type: 'select', options: types, required: true },
    { name: 'location', label: 'Oficina / local', required: true },
    { name: 'description', label: 'Serviço realizado', type: 'textarea', required: true },
    { name: 'value', label: 'Valor gasto', type: 'number', min: 0, step: '0.01', prefix: 'R$', required: true },
    { name: 'mileage', label: 'Quilometragem atual', type: 'number', min: 0, required: true },
    { name: 'nextDate', label: 'Data da próxima manutenção', type: 'date' },
    { name: 'nextMileage', label: 'Km da próxima manutenção', type: 'number', min: 0 },
    { name: 'attachment', label: 'Nota fiscal', type: 'file' },
    { name: 'notes', label: 'Observações', type: 'textarea' },
  ]
  const columns = [
    { key: 'date', label: 'Realizada em', render: formatDate },
    {
      key: 'truck',
      label: 'Caminhão',
      render: (value) => (
        <span className="inline-flex items-center gap-2 font-bold text-slate-700">
          <span className="rounded-lg bg-violet-50 p-2 text-violet-600"><Wrench size={15} /></span>{value}
        </span>
      ),
    },
    { key: 'type', label: 'Tipo', render: (value) => <Badge tone="slate">{value}</Badge> },
    { key: 'location', label: 'Oficina / local' },
    { key: 'value', label: 'Valor', render: (value) => <strong className="text-slate-700">{formatCurrency(value)}</strong> },
    { key: 'nextDate', label: 'Próxima manutenção', render: (value, record) => <span><strong className="block text-amber-700">{formatDate(value)}</strong><small className="text-slate-400">{formatNumber(record.nextMileage)} km</small></span> },
    { key: 'attachment', label: 'Anexo', render: (value) => <Attachment name={value} /> },
  ]

  const topContent = (
    <section className="mb-5 grid gap-3 md:grid-cols-3">
      {upcoming.map((item, index) => (
        <article key={item.id} className="panel flex items-center gap-3 p-4">
          <div className={`rounded-xl p-2.5 ${index === 0 ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
            {index === 0 ? <AlertTriangle size={19} /> : <CalendarClock size={19} />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-700">{item.truck} · {item.type}</p>
            <p className="mt-0.5 text-xs text-slate-400">{formatDate(item.nextDate)} · {formatNumber(item.nextMileage)} km</p>
          </div>
        </article>
      ))}
    </section>
  )

  return (
    <RecordPage
      eyebrow="Saúde da frota"
      title="Manutenções"
      description="Organize serviços realizados e antecipe as próximas paradas de cada veículo."
      addLabel="Nova manutenção"
      data={data}
      setData={setData}
      fields={fields}
      columns={columns}
      topContent={topContent}
      filterFields={[
        { name: 'truck', label: 'Todos os caminhões', options: plates },
        { name: 'type', label: 'Todos os tipos', options: types },
      ]}
    />
  )
}
