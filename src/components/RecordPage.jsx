import {
  Eye,
  Filter,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { FormModal } from './FormModal'
import {
  Button,
  DetailGrid,
  EmptyState,
  Modal,
  PageHeader,
} from './UI'

export function RecordPage({
  title,
  eyebrow,
  description,
  addLabel = 'Novo registro',
  data,
  setData,
  fields,
  columns,
  filterFields = [],
  transformValues,
  topContent,
}) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [editing, setEditing] = useState(null)
  const [viewing, setViewing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  const filteredData = useMemo(() => {
    return data.filter((record) => {
      const matchesSearch =
        !search ||
        Object.values(record).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase()),
        )
      const matchesFilters = filterFields.every(
        (filter) => !filters[filter.name] || record[filter.name] === filters[filter.name],
      )
      return matchesSearch && matchesFilters
    })
  }, [data, filterFields, filters, search])

  const openAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (record) => {
    setEditing(record)
    setFormOpen(true)
  }

  const save = (values) => {
    if (editing) {
      setData((current) =>
        current.map((record) =>
          record.id === editing.id ? { ...values, id: editing.id } : record,
        ),
      )
    } else {
      setData((current) => [{ ...values, id: `${Date.now()}` }, ...current])
    }
    setFormOpen(false)
    setEditing(null)
  }

  const remove = (record) => {
    if (window.confirm(`Excluir este registro de ${title.toLowerCase()}?`)) {
      setData((current) => current.filter((item) => item.id !== record.id))
    }
  }

  const hasFilters = search || Object.values(filters).some(Boolean)

  return (
    <div className="animate-in">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Button icon={Plus} onClick={openAdd}>
            {addLabel}
          </Button>
        }
      />
      {topContent}
      <section className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              className="input-base pl-9"
              placeholder="Buscar em todos os registros..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
            {filterFields.map((filter) => (
              <label key={filter.name} className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select
                  className="input-base min-w-36 py-2.5 pl-8 pr-8 text-sm"
                  value={filters[filter.name] || ''}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      [filter.name]: event.target.value,
                    }))
                  }
                >
                  <option value="">{filter.label}</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {hasFilters && (
              <Button
                variant="ghost"
                icon={RotateCcw}
                onClick={() => {
                  setSearch('')
                  setFilters({})
                }}
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          {filteredData.length ? (
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3.5 text-sm text-slate-600">
                        {column.render
                          ? column.render(record[column.key], record)
                          : record[column.key] || '—'}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setViewing(record)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-ocean"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEdit(record)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => remove(record)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState description="Ajuste os filtros ou adicione um novo registro." />
          )}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3 text-xs text-slate-400">
          <span>{filteredData.length} registros exibidos</span>
          <span>Dados atualizados agora</span>
        </div>
      </section>

      {formOpen && (
        <FormModal
          title={editing ? `Editar ${title.toLowerCase()}` : addLabel}
          description="Preencha os dados abaixo para manter o controle da operação."
          fields={fields}
          initialValue={editing}
          onClose={() => {
            setFormOpen(false)
            setEditing(null)
          }}
          onSave={save}
          transformValues={transformValues}
        />
      )}
      {viewing && (
        <Modal
          title="Detalhes do registro"
          description="Informações completas salvas no TransControl."
          onClose={() => setViewing(null)}
          wide
        >
          <div className="overflow-y-auto">
            <DetailGrid fields={fields} record={viewing} />
          </div>
          <div className="flex justify-end border-t border-slate-100 px-5 py-4">
            <Button variant="secondary" onClick={() => setViewing(null)}>
              Fechar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
