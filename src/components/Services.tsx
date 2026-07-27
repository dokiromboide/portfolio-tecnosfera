import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVICES, CATEGORIES, type Service } from '../data/services'
import { formatCOP } from '../lib/format'

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'es' | 'en'
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{service.icon}</span>
            <h3 className="text-xl font-bold">{service.name[lang]}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-2xl leading-none">
            ×
          </button>
        </div>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{service.description[lang]}</p>
        <h4 className="mt-4 font-semibold">{t('services.detail.include')}</h4>
        <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
          {service.features[lang].map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-bold text-indigo-600 dark:text-indigo-300">
            {service.priceLabel[lang]} {service.basePrice > 0 ? formatCOP(service.basePrice) : t('pricing.free')}
          </span>
          <a
            href="#pricing"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500"
          >
            {t('services.quote')}
          </a>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'es' | 'en'
  const [cat, setCat] = useState<string>('all')
  const [selected, setSelected] = useState<Service | null>(null)

  const filtered = SERVICES.filter((s) => cat === 'all' || s.category === cat)

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center">{t('services.title')}</h2>
      <p className="mt-2 text-center text-slate-500 dark:text-slate-400">{t('services.subtitle')}</p>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="self-center text-sm text-slate-500">{t('services.filter')}</span>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              cat === c.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {c.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col hover:shadow-lg transition bg-white dark:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <h3 className="font-bold">{s.name[lang]}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-1">{s.tagline[lang]}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-indigo-600 dark:text-indigo-300">
                {s.priceLabel[lang]} {s.basePrice > 0 ? formatCOP(s.basePrice) : t('pricing.free')}
              </span>
              <button
                onClick={() => setSelected(s)}
                className="text-sm underline text-slate-500 hover:text-indigo-600"
              >
                {t('services.details')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
