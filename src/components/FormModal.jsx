import { FileText, Paperclip, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, Modal } from './UI'

const emptyFromFields = (fields) =>
  fields.reduce((accumulator, field) => {
    accumulator[field.name] = field.defaultValue ?? ''
    return accumulator
  }, {})

export function FormModal({
  title,
  description,
  fields,
  initialValue,
  onClose,
  onSave,
  transformValues,
}) {
  const [values, setValues] = useState(() => initialValue || emptyFromFields(fields))

  useEffect(() => {
    setValues(initialValue || emptyFromFields(fields))
  }, [initialValue, fields])

  const updateValue = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(transformValues ? transformValues(next, name) : next)
  }

  const submit = (event) => {
    event.preventDefault()
    onSave(values)
  }

  return (
    <Modal title={title} description={description} onClose={onClose} wide>
      <form onSubmit={submit} className="flex min-h-0 flex-col">
        <div className="grid min-h-0 grid-cols-1 gap-x-4 gap-y-4 overflow-y-auto p-5 md:grid-cols-2 md:p-6">
          {fields.map((field) => {
            const span =
              field.full || field.type === 'textarea' || field.type === 'file'
                ? 'md:col-span-2'
                : ''
            return (
              <label key={field.name} className={span}>
                <span className="mb-1.5 block text-xs font-bold text-slate-600">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </span>
                {field.type === 'select' ? (
                  <select
                    className="input-base"
                    value={values[field.name] ?? ''}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    required={field.required}
                  >
                    <option value="">Selecione</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="input-base min-h-24 resize-y"
                    value={values[field.name] ?? ''}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ) : field.type === 'file' ? (
                  <div>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                      <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:text-left">
                        <div className="rounded-lg bg-white p-2 text-ocean shadow-sm">
                          <Paperclip size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-700">
                            {values[field.name] || 'Anexar nota fiscal ou comprovante'}
                          </p>
                          <p className="text-xs text-slate-400">PDF, JPG ou PNG</p>
                        </div>
                        <span className="relative overflow-hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
                          Escolher arquivo
                          <input
                            type="file"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(event) =>
                              updateValue(field.name, event.target.files?.[0]?.name || '')
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {field.prefix && (
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        {field.prefix}
                      </span>
                    )}
                    <input
                      className={`input-base ${field.prefix ? 'pl-9' : ''}`}
                      type={field.type || 'text'}
                      value={values[field.name] ?? ''}
                      onChange={(event) =>
                        updateValue(
                          field.name,
                          field.type === 'number'
                            ? event.target.value === ''
                              ? ''
                              : Number(event.target.value)
                            : event.target.value,
                        )
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      min={field.min}
                      step={field.step}
                      readOnly={field.readOnly}
                      disabled={field.readOnly}
                    />
                  </div>
                )}
                {field.hint && <span className="mt-1 block text-[11px] text-slate-400">{field.hint}</span>}
              </label>
            )
          })}
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 md:px-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" icon={Save}>
            Salvar registro
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export function Attachment({ name }) {
  if (!name) return <span className="text-slate-300">Sem anexo</span>
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean">
      <FileText size={14} />
      {name}
    </span>
  )
}
