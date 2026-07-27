import { useTranslation } from 'react-i18next'
import { CONTACT } from '../config'

export function Hero() {
  const { t } = useTranslation()
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/20 via-sky-400/10 to-transparent dark:from-indigo-700/30" />
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 text-center">
        <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
          {t('hero.badge')}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto">
          {t('hero.title')}
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href="#pricing"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-500 transition"
          >
            {t('hero.cta1')}
          </a>
          <a
            href="#services"
            className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {t('hero.cta2')}
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          ✅ {t('hero.note')} ·{' '}
          <a href={`https://wa.me/${CONTACT.whatsapp}`} className="underline">
            WhatsApp {CONTACT.whatsapp}
          </a>
        </p>
      </div>
    </section>
  )
}
