import {
  BarChart3,
  CircleDollarSign,
  Download,
  Fuel,
  ReceiptText,
  Route,
  Truck,
  Wrench,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge, Button, EmptyState, PageHeader, StatCard, formatCurrency, formatDate } from '../components/UI'

export default function Relatorios({ store }) {
  const { trucks, trips, fuels, maintenances, expenses } = store
  const [filters, setFilters] = useState({ start: '', end: '', truck: '', type: '', driver: '' })
  const drivers = [...new Set(trucks.map((truck) => truck.driver))]

  const history = useMemo(() => {
    const records = [
      ...fuels.map((item) => ({ ...item, kind: 'Diesel', value: item.total, detail: `${item.liters} litros em ${item.location}` })),
      ...maintenances.map((item) => ({ ...item, kind: 'Manutenção', detail: `${item.type} · ${item.location}` })),
      ...expenses.map((item) => ({ ...item, kind: 'Gasto extra', detail: `${item.category} · ${item.location}` })),
      ...trips.map((item) => ({ ...item, kind: 'Viagem', value: item.freightValue, detail: `${item.origin} para ${item.destination}` })),
    ]
    return records
      .filter((item) => !filters.start || item.date >= filters.start)
      .filter((item) => !filters.end || item.date <= filters.end)
      .filter((item) => !filters.truck || item.truck === filters.truck)
      .filter((item) => !filters.driver || item.driver === filters.driver)
      .filter((item) => !filters.type || item.kind === filters.type)
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [expenses, filters, fuels, maintenances, trips])

  const totalByKind = (kind) =>
    history.filter((item) => item.kind === kind).reduce((sum, item) => sum + Number(item.value || 0), 0)
  const diesel = totalByKind('Diesel')
  const maintenance = totalByKind('Manutenção')
  const extras = totalByKind('Gasto extra')
  const general = diesel + maintenance + extras
  const tripCount = history.filter((item) => item.kind === 'Viagem').length

  const exportReport = () => {
    const rows = [
      ['Data', 'Tipo', 'Caminhão', 'Descrição', 'Valor'],
      ...history.map((item) => [formatDate(item.date), item.kind, item.truck, item.detail, Number(item.value || 0).toFixed(2)]),
    ]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';')).join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
    link.download = 'relatorio-transcontrol.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const kindTone = { Diesel: 'blue', Manutenção: 'orange', 'Gasto extra': 'green', Viagem: 'slate' }

  return (
    <div className="animate-in">
      <PageHeader
        eyebrow="Inteligência operacional"
        title="Relatórios"
        description="Cruze custos e atividades para entender melhor o desempenho da sua frota."
        actions={<Button icon={Download} onClick={exportReport}>Exportar relatório</Button>}
      />

      <section className="panel mb-5 p-4 md:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink"><BarChart3 size={17} className="text-ocean" /> Filtros do relatório</div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <label><span className="mb-1 block text-[11px] font-bold text-slate-500">Data inicial</span><input type="date" className="input-base" value={filters.start} onChange={(event) => setFilters({ ...filters, start: event.target.value })} /></label>
          <label><span className="mb-1 block text-[11px] font-bold text-slate-500">Data final</span><input type="date" className="input-base" value={filters.end} onChange={(event) => setFilters({ ...filters, end: event.target.value })} /></label>
          <label><span className="mb-1 block text-[11px] font-bold text-slate-500">Caminhão</span><select className="input-base" value={filters.truck} onChange={(event) => setFilters({ ...filters, truck: event.target.value })}><option value="">Todos</option>{trucks.map((truck) => <option key={truck.id}>{truck.plate}</option>)}</select></label>
          <label><span className="mb-1 block text-[11px] font-bold text-slate-500">Tipo de registro</span><select className="input-base" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}><option value="">Todos</option>{['Diesel', 'Manutenção', 'Gasto extra', 'Viagem'].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span className="mb-1 block text-[11px] font-bold text-slate-500">Motorista</span><select className="input-base" value={filters.driver} onChange={(event) => setFilters({ ...filters, driver: event.target.value })}><option value="">Todos</option>{drivers.map((driver) => <option key={driver}>{driver}</option>)}</select></label>
        </div>
      </section>

      <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Diesel" value={formatCurrency(diesel)} icon={Fuel} tone="blue" />
        <StatCard label="Manutenção" value={formatCurrency(maintenance)} icon={Wrench} tone="orange" />
        <StatCard label="Gastos extras" value={formatCurrency(extras)} icon={CircleDollarSign} tone="green" />
        <StatCard label="Total geral" value={formatCurrency(general)} icon={ReceiptText} tone="violet" />
        <StatCard label="Total de viagens" value={tripCount} icon={Route} tone="slate" />
        <StatCard label="Média por caminhão" value={formatCurrency(general / Math.max(trucks.length, 1))} icon={Truck} tone="blue" />
      </section>

      <section className="panel overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="font-bold text-ink">Histórico consolidado</p>
          <p className="mt-0.5 text-xs text-slate-400">{history.length} registros encontrados no período</p>
        </div>
        {history.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead><tr className="bg-slate-50/80 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400"><th className="px-5 py-3">Data</th><th className="px-4 py-3">Tipo</th><th className="px-4 py-3">Caminhão</th><th className="px-4 py-3">Descrição</th><th className="px-5 py-3 text-right">Valor</th></tr></thead>
              <tbody>
                {history.map((item) => (
                  <tr key={`${item.kind}-${item.id}`} className="border-t border-slate-100 text-sm">
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(item.date)}</td>
                    <td className="px-4 py-3.5"><Badge tone={kindTone[item.kind]}>{item.kind}</Badge></td>
                    <td className="px-4 py-3.5 font-bold text-slate-700">{item.truck}</td>
                    <td className="px-4 py-3.5 text-slate-500">{item.detail}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-slate-700">{formatCurrency(item.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState description="Altere os filtros para visualizar registros." />}
      </section>
    </div>
  )
}
