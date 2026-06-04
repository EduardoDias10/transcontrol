import { CircleDollarSign } from 'lucide-react'
import { Attachment } from '../components/FormModal'
import { RecordPage } from '../components/RecordPage'
import { Badge, formatCurrency, formatDate } from '../components/UI'

export default function GastosExtras({ data, setData, trucks }) {
  const plates = trucks.map((truck) => truck.plate)
  const categories = ['Mecânica', 'Pedágio', 'Multas', 'Lavagem', 'Peças', 'Alimentação', 'Hospedagem', 'Outros']
  const fields = [
    { name: 'date', label: 'Data do gasto', type: 'date', required: true },
    { name: 'truck', label: 'Caminhão relacionado', type: 'select', options: plates, required: true },
    { name: 'category', label: 'Categoria do gasto', type: 'select', options: categories, required: true },
    { name: 'location', label: 'Local onde foi feito', required: true },
    { name: 'description', label: 'Descrição do gasto', type: 'textarea', required: true },
    { name: 'value', label: 'Valor', type: 'number', min: 0, step: '0.01', prefix: 'R$', required: true },
    { name: 'attachment', label: 'Nota fiscal', type: 'file' },
    { name: 'notes', label: 'Observações', type: 'textarea' },
  ]
  const columns = [
    { key: 'date', label: 'Data', render: formatDate },
    {
      key: 'category',
      label: 'Categoria',
      render: (value) => (
        <span className="inline-flex items-center gap-2">
          <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><CircleDollarSign size={15} /></span>
          <Badge tone="green">{value}</Badge>
        </span>
      ),
    },
    { key: 'truck', label: 'Caminhão', render: (value) => <strong className="text-slate-700">{value}</strong> },
    { key: 'location', label: 'Local' },
    { key: 'description', label: 'Descrição', render: (value) => <span className="block max-w-56 truncate">{value}</span> },
    { key: 'value', label: 'Valor', render: (value) => <strong className="text-slate-700">{formatCurrency(value)}</strong> },
    { key: 'attachment', label: 'Anexo', render: (value) => <Attachment name={value} /> },
  ]

  return (
    <RecordPage
      eyebrow="Custos operacionais"
      title="Gastos extras"
      description="Registre os custos adicionais de cada viagem e veículo sem perder comprovantes."
      addLabel="Novo gasto"
      data={data}
      setData={setData}
      fields={fields}
      columns={columns}
      filterFields={[
        { name: 'truck', label: 'Todos os caminhões', options: plates },
        { name: 'category', label: 'Todas as categorias', options: categories },
      ]}
    />
  )
}
