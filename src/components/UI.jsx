import {
  ArrowDownRight,
  ArrowUpRight,
  Inbox,
  X,
} from 'lucide-react'

export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0))

export const formatNumber = (value) =>
  new Intl.NumberFormat('pt-BR').format(Number(value || 0))

export const formatDate = (value) => {
  if (!value) return '—'
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
    new Date(`${value}T12:00:00Z`),
  )
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  ...props
}) {
  const variants = {
    primary: 'bg-ocean text-white hover:bg-blue-700 shadow-sm shadow-blue-200',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] px-3.5 py-2.5 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </button>
  )
}

export function Badge({ children, tone }) {
  const normalized = String(children || '').toLowerCase()
  const inferredTone =
    tone ||
    (normalized.includes('finalizada') ||
    normalized.includes('disponível') ||
    normalized.includes('pago')
      ? 'green'
      : normalized.includes('andamento') ||
          normalized.includes('viagem') ||
          normalized.includes('agendada')
        ? 'blue'
        : normalized.includes('manutenção') || normalized.includes('próxima')
          ? 'orange'
          : 'slate')

  const tones = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
    blue: 'bg-blue-50 text-blue-700 ring-blue-600/10',
    orange: 'bg-amber-50 text-amber-700 ring-amber-600/10',
    red: 'bg-red-50 text-red-700 ring-red-600/10',
    slate: 'bg-slate-100 text-slate-600 ring-slate-600/10',
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tones[inferredTone]}`}
    >
      {children}
    </span>
  )
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-ocean">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-[28px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'blue',
  trend,
  trendLabel,
}) {
  const tones = {
    blue: 'bg-blue-50 text-ocean',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-amber-50 text-amber-600',
    violet: 'bg-violet-50 text-violet-600',
    slate: 'bg-slate-100 text-slate-600',
  }
  const isUp = Number(trend) >= 0

  return (
    <article className="panel p-4 md:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-ink">{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>
          <Icon size={20} strokeWidth={2.2} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span
            className={`flex items-center gap-0.5 font-semibold ${
              isUp ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400">{trendLabel}</span>
        </div>
      )}
    </article>
  )
}

export function Modal({ title, description, children, onClose, wide = false }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-[2px] md:items-center md:p-5"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className={`animate-in flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl md:rounded-2xl ${
          wide ? 'md:max-w-4xl' : 'md:max-w-2xl'
        }`}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 md:px-6">
          <div>
            <h2 className="text-lg font-bold text-ink">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={19} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function EmptyState({ title = 'Nenhum registro encontrado', description }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center p-8 text-center">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
        <Inbox size={22} />
      </div>
      <p className="font-semibold text-slate-700">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>}
    </div>
  )
}

export function DetailGrid({ fields, record }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 md:p-6">
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.type === 'textarea' ? 'md:col-span-2' : ''}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {field.label}
          </p>
          <div className="mt-1.5 text-sm font-medium leading-6 text-slate-700">
            {field.format
              ? field.format(record[field.name])
              : record[field.name] || '—'}
          </div>
        </div>
      ))}
    </div>
  )
}
