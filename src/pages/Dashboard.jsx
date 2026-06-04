import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  Fuel,
  Plus,
  Route,
  Truck,
  Wrench,
} from 'lucide-react'
import { Badge, Button, PageHeader, StatCard, formatCurrency, formatDate, formatNumber } from '../components/UI'

function SpendChart({ fuelTotal, maintenanceTotal, expensesTotal }) {
  const values = [
    { label: 'Diesel', value: fuelTotal, color: 'bg-blue-500' },
    { label: 'Manutenção', value: maintenanceTotal, color: 'bg-amber-500' },
    { label: 'Gastos extras', value: expensesTotal, color: 'bg-emerald-500' },
  ]
  const total = values.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="panel p-5 md:p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="font-bold text-ink">Gastos por categoria</p>
          <p className="mt-1 text-xs text-slate-400">Distribuição do período atual</p>
        </div>
        <Badge tone="blue">Junho 2026</Badge>
      </div>
      <div className="flex flex-col items-center gap-7 sm:flex-row">
        <div
          className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#3b82f6 0 ${total ? (fuelTotal / total) * 100 : 0}%, #f59e0b 0 ${
              total ? ((fuelTotal + maintenanceTotal) / total) * 100 : 0
            }%, #10b981 0)`,
          }}
        >
          <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
              <p className="text-sm font-extrabold text-ink">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-4">
          {values.map((item) => (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-semibold text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  {item.label}
                </span>
                <span className="font-bold text-ink">{formatCurrency(item.value)}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${total ? Math.max((item.value / total) * 100, 5) : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Dashboard({ store, onNavigate }) {
  const { trucks, trips, fuels, maintenances, expenses } = store
  const fuelTotal = fuels.reduce((sum, item) => sum + Number(item.total || 0), 0)
  const maintenanceTotal = maintenances.reduce((sum, item) => sum + Number(item.value || 0), 0)
  const expensesTotal = expenses.reduce((sum, item) => sum + Number(item.value || 0), 0)
  const activeTrips = trips.filter((trip) => trip.status === 'Em andamento').length
  const availableTrucks = trucks.filter((truck) => truck.status === 'Disponível').length
  const maintenanceAlerts = [...maintenances]
    .filter((item) => item.nextDate)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
    .slice(0, 3)

  return (
    <div className="animate-in">
      <PageHeader
        eyebrow="Centro de controle"
        title="Visão geral da operação"
        description="Acompanhe os principais indicadores da frota e tome decisões com mais agilidade."
        actions={
          <Button icon={Plus} onClick={() => onNavigate('viagens')}>
            Registrar viagem
          </Button>
        }
      />

      <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Viagens no mês" value={trips.length} icon={Route} tone="blue" trend={12} trendLabel="vs. mês anterior" />
        <StatCard label="Gasto com diesel" value={formatCurrency(fuelTotal)} icon={Fuel} tone="orange" trend={-3.4} trendLabel="vs. mês anterior" />
        <StatCard label="Manutenções" value={formatCurrency(maintenanceTotal)} icon={Wrench} tone="violet" trend={5.1} trendLabel="vs. mês anterior" />
        <StatCard label="Gastos extras" value={formatCurrency(expensesTotal)} icon={CircleDollarSign} tone="green" trend={-8} trendLabel="vs. mês anterior" />
        <StatCard label="Caminhões" value={trucks.length} icon={Truck} tone="slate" />
        <StatCard label="Próximas revisões" value={maintenanceAlerts.length} icon={CalendarClock} tone="orange" />
      </section>

      <section className="mb-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="soft-grid relative overflow-hidden rounded-[20px] bg-ink p-6 text-white shadow-xl shadow-slate-300/50">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-400">Operação em tempo real</p>
            <h2 className="mt-2 max-w-lg text-2xl font-bold tracking-tight">
              Sua frota está rodando com {availableTrucks} caminhões disponíveis.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Há {activeTrips} viagem em andamento e {maintenanceAlerts.length} revisões programadas para acompanhar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('caminhoes')} className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-ink transition hover:bg-blue-50">
                Ver frota
              </button>
              <button onClick={() => onNavigate('relatorios')} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10">
                Abrir relatórios <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <SpendChart fuelTotal={fuelTotal} maintenanceTotal={maintenanceTotal} expensesTotal={expensesTotal} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="font-bold text-ink">Últimas viagens</p>
              <p className="mt-0.5 text-xs text-slate-400">Movimentações recentes da frota</p>
            </div>
            <button onClick={() => onNavigate('viagens')} className="text-xs font-bold text-ocean hover:text-blue-700">
              Ver todas
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-slate-50/80 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3">Rota</th>
                  <th className="px-4 py-3">Caminhão</th>
                  <th className="px-4 py-3">Distância</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.slice(0, 4).map((trip) => (
                  <tr key={trip.id} className="border-t border-slate-100 text-sm">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-slate-700">{trip.origin}</p>
                      <p className="mt-0.5 text-xs text-slate-400">para {trip.destination} · {formatDate(trip.date)}</p>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-600">{trip.truck}</td>
                    <td className="px-4 py-3.5 text-slate-500">{formatNumber(trip.distance)} km</td>
                    <td className="px-4 py-3.5"><Badge>{trip.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel p-5">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="font-bold text-ink">Alertas de manutenção</p>
              <p className="mt-0.5 text-xs text-slate-400">Próximos compromissos</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-2 text-amber-600"><Wrench size={17} /></div>
          </div>
          <div className="space-y-3">
            {maintenanceAlerts.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate('manutencoes')}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-100 hover:bg-blue-50/40"
              >
                <span className={`h-9 w-1 rounded-full ${index === 0 ? 'bg-red-400' : 'bg-amber-400'}`} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold text-slate-700">{item.truck} · {item.type}</span>
                  <span className="mt-1 block text-[11px] text-slate-400">{formatDate(item.nextDate)} · {formatNumber(item.nextMileage)} km</span>
                </span>
                <ArrowRight size={15} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
