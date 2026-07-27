import { useTranslation } from 'react-i18next'
import { CONTACT } from '../config'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div>
          <p className="font-bold text-slate-700 dark:text-slate-200">⚡ Tecnosfera</p>
          <p>{t('footer.tagline')}</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="font-semibold">{t('footer.contact')}</p>
          <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>
          <p>© {year} Tecnosfera. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
