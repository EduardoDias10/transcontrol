import {
  BarChart3,
  Bell,
  ChevronDown,
  CircleDollarSign,
  Fuel,
  LayoutDashboard,
  Menu,
  Route,
  Search,
  Settings,
  Truck,
  Wrench,
  X,
} from 'lucide-react'

const navigation = [
  { id: 'dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'caminhoes', label: 'Caminhões', icon: Truck },
  { id: 'viagens', label: 'Viagens', icon: Route },
  { id: 'abastecimentos', label: 'Abastecimentos', icon: Fuel },
  { id: 'manutencoes', label: 'Manutenções', icon: Wrench },
  { id: 'gastos', label: 'Gastos extras', icon: CircleDollarSign },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
]

function Brand({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? '' : 'px-1'}`}>
      <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-ocean text-white shadow-lg shadow-blue-900/25">
        <Truck size={22} strokeWidth={2.4} />
        <span className="absolute bottom-0 h-1 w-full bg-ember" />
      </div>
      <div>
        <p className="text-[17px] font-extrabold leading-none tracking-tight text-white">
          Trans<span className="text-blue-400">Control</span>
        </p>
        <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400">
          Gestão de transportes
        </p>
      </div>
    </div>
  )
}

export function Sidebar({ activePage, onNavigate, open, onClose }) {
  const content = (
    <>
      <div className="px-5 pb-7 pt-6">
        <Brand />
      </div>
      <nav className="flex-1 space-y-1.5 px-3">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Operação
        </p>
        {navigation.map((item) => {
          const Icon = item.icon
          const active = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                onClose()
              }}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                active
                  ? 'bg-ocean text-white shadow-lg shadow-blue-950/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.4 : 2}
                className={active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}
              />
              {item.label}
              {item.id === 'manutencoes' && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-extrabold text-amber-950">
                  2
                </span>
              )}
            </button>
          )
        })}
      </nav>
      <div className="m-3 rounded-2xl border border-white/5 bg-white/[0.035] p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Settings size={14} className="text-blue-400" />
          Central da frota
        </div>
        <p className="text-[11px] leading-5 text-slate-500">
          Dados salvos neste dispositivo. Ambiente de demonstração.
        </p>
      </div>
    </>
  )

  return (
    <>
      <aside className="soft-grid fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col bg-ink lg:flex">
        {content}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm lg:hidden">
          <aside className="soft-grid flex h-full w-[280px] flex-col bg-ink shadow-2xl">
            <button
              onClick={onClose}
              className="absolute left-[292px] top-4 rounded-full bg-white/10 p-2 text-white"
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}

export function Header({ title, onOpenMenu, onSearch }) {
  return (
    <header className="sticky top-0 z-20 flex h-[70px] items-center border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl md:px-7 lg:ml-[244px]">
      <button
        className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
      >
        <Menu size={21} />
      </button>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-bold text-ink">{title}</p>
        <p className="text-[11px] text-slate-400">Quinta-feira, 04 de junho</p>
      </div>
      <label className="ml-0 flex min-w-0 flex-1 items-center sm:ml-8 md:max-w-sm">
        <Search className="pointer-events-none ml-3 -mr-8 text-slate-400" size={17} />
        <input
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
          placeholder="Buscar caminhão, motorista..."
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>
      <div className="ml-auto flex items-center gap-2 pl-3">
        <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-50">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>
        <button className="hidden items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-slate-50 md:flex">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-extrabold text-white">
            LM
          </span>
          <span className="text-left">
            <span className="block text-xs font-bold text-ink">Lucas Martins</span>
            <span className="block text-[10px] text-slate-400">Administrador</span>
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  )
}
