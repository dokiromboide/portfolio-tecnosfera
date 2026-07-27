import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVICES, type Service } from '../data/services'
import { formatCOP } from '../lib/format'

const RECURRING = new Set(['seo', 'soporte'])

export function QuoteBuilder() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'es' | 'en'
  const [serviceId, setServiceId] = useState<string>(SERVICES[1].id)
  const [addOns, setAddOns] = useState<Record<string, boolean>>({})

  const service = useMemo<Service>(
    () => SERVICES.find((s) => s.id === serviceId) ?? SERVICES[1],
    [serviceId],
  )

  const total = useMemo(() => {
    let sum = service.basePrice
    for (const a of service.addOns) if (addOns[a.id]) sum += a.price
    return sum
  }, [service, addOns])

  const suffix = RECURRING.has(service.id) ? t('pricing.month') : service.basePrice > 0 ? t('pricing.project') : ''

  const onService = (id: string) => {
    setServiceId(id)
    setAddOns({})
  }

  return (
    <section id="pricing" className="bg-slate-50 dark:bg-slate-900/50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">{t('pricing.title')}</h2>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">{t('pricing.subtitle')}</p>

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
          <label className="block text-sm font-medium mb-2">{t('pricing.service')}</label>
          <select
            value={serviceId}
            onChange={(e) => onService(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name[lang]} {s.basePrice > 0 ? `· ${formatCOP(s.basePrice)}` : `· ${t('pricing.free')}`}
              </option>
            ))}
          </select>

          {service.addOns.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium mb-2">{t('pricing.addons')}</p>
              <div className="space-y-2">
                {service.addOns.map((a) => (
                  <label key={a.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!addOns[a.id]}
                        onChange={() => setAddOns((p) => ({ ...p, [a.id]: !p[a.id] }))}
                        className="accent-indigo-600"
                      />
                      {a.label}
                    </span>
                    <span className="text-slate-500">+ {formatCOP(a.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <span className="font-semibold">{t('pricing.total')}</span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-300">
              {total === 0 ? t('pricing.free') : `${formatCOP(total)} ${suffix}`}
            </span>
          </div>

          <a
            href="#contact"
            className="mt-5 block text-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            {service.basePrice === 0 ? t('contact.title') : t('pricing.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
