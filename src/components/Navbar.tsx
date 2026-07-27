import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { dark, toggle } = useTheme()

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const linkBase =
    'text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#top" className="font-bold text-lg tracking-tight">
          ⚡ Tecnosfera
        </a>
        <div className="flex items-center gap-1">
          <a href="#services" className={linkBase}>{t('nav.services')}</a>
          <a href="#pricing" className={linkBase}>{t('nav.pricing')}</a>
          <a href="#contact" className={linkBase}>{t('nav.contact')}</a>
          <button onClick={toggleLang} className={linkBase} aria-label="language">
            {t('lang.toggle')}
          </button>
          <button
            onClick={toggle}
            className={linkBase}
            aria-label={t('theme.toggle')}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  )
}
