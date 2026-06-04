import { Fuel } from 'lucide-react'
import { Attachment } from '../components/FormModal'
import { RecordPage } from '../components/RecordPage'
import { formatCurrency, formatDate, formatNumber } from '../components/UI'

export default function Abastecimentos({ data, setData, trucks }) {
  const plates = trucks.map((truck) => truck.plate)
  const drivers = [...new Set(trucks.map((truck) => truck.driver))]
  const fields = [
    { name: 'date', label: 'Data do abastecimento', type: 'date', required: true },
    { name: 'truck', label: 'Caminhão', type: 'select', options: plates, required: true },
    { name: 'driver', label: 'Motorista', type: 'select', options: drivers, required: true },
    { name: 'location', label: 'Posto / local', required: true },
    { name: 'liters', label: 'Litros abastecidos', type: 'number', min: 0, step: '0.01', required: true },
    { name: 'pricePerLiter', label: 'Valor por litro', type: 'number', min: 0, step: '0.01', prefix: 'R$', required: true },
    { name: 'total', label: 'Valor total', type: 'number', readOnly: true, prefix: 'R$', defaultValue: 0, hint: 'Calculado automaticamente.' },
    { name: 'mileage', label: 'Quilometragem no abastecimento', type: 'number', min: 0, required: true },
    { name: 'payment', label: 'Forma de pagamento', type: 'select', options: ['Cartão frota', 'Pix', 'Dinheiro', 'Boleto', 'Outro'], required: true },
    { name: 'attachment', label: 'Nota fiscal', type: 'file' },
    { name: 'notes', label: 'Observações', type: 'textarea' },
  ]
  const columns = [
    { key: 'date', label: 'Data', render: formatDate },
    {
      key: 'truck',
      label: 'Caminhão',
      render: (value, record) => (
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-amber-50 p-2 text-amber-600"><Fuel size={15} /></span>
          <span><strong className="block text-slate-700">{value}</strong><small className="text-slate-400">{record.driver}</small></span>
        </div>
      ),
    },
    { key: 'location', label: 'Posto / local' },
    { key: 'liters', label: 'Litros', render: (value) => `${formatNumber(value)} L` },
    { key: 'pricePerLiter', label: 'R$/litro', render: formatCurrency },
    { key: 'total', label: 'Total', render: (value) => <strong className="text-slate-700">{formatCurrency(value)}</strong> },
    { key: 'attachment', label: 'Anexo', render: (value) => <Attachment name={value} /> },
  ]

  return (
    <RecordPage
      eyebrow="Custos operacionais"
      title="Abastecimentos"
      description="Acompanhe consumo, preços praticados e comprovantes de cada abastecimento."
      addLabel="Novo abastecimento"
      data={data}
      setData={setData}
      fields={fields}
      columns={columns}
      filterFields={[
        { name: 'truck', label: 'Todos os caminhões', options: plates },
        { name: 'payment', label: 'Pagamento', options: ['Cartão frota', 'Pix', 'Dinheiro', 'Boleto', 'Outro'] },
      ]}
      transformValues={(values) => ({
        ...values,
        total: Number((Number(values.liters || 0) * Number(values.pricePerLiter || 0)).toFixed(2)),
      })}
    />
  )
}
