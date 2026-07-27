import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { EMAILJS, CONTACT } from '../config'
import { SERVICES } from '../data/services'

export function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '', service: SERVICES[1].name.es })

  const configured = EMAILJS.publicKey.startsWith('TU_') === false

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!configured) {
      // fallback: abrir cliente de correo si aún no se configura EmailJS
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        'Cotización ' + form.service,
      )}&body=${encodeURIComponent(`${form.name}\n${form.email}\n\n${form.message}`)}`
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        name: form.name,
        email: form.email,
        message: form.message,
        service: form.service,
      }, { publicKey: EMAILJS.publicKey })
      setStatus('ok')
      setForm({ name: '', email: '', message: '', service: SERVICES[1].name.es })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center">{t('contact.title')}</h2>
      <p className="mt-2 text-center text-slate-500 dark:text-slate-400">{t('contact.subtitle')}</p>

      <form onSubmit={send} className="mt-8 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('contact.name')}</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('contact.email')}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('contact.service')}</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name.es}>
                {s.name.es}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('contact.message')}</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-60"
        >
          {status === 'sending' ? t('contact.sending') : t('contact.send')}
        </button>

        {status === 'ok' && <p className="text-green-600 text-sm text-center">{t('contact.success')}</p>}
        {status === 'error' && <p className="text-red-600 text-sm text-center">{t('contact.error')}</p>}
        {!configured && (
          <p className="text-xs text-slate-400 text-center">
            EmailJS no configurado: al enviar se abrirá tu cliente de correo a {CONTACT.email}
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        WhatsApp:{' '}
        <a href={`https://wa.me/${CONTACT.whatsapp}`} className="underline">
          {CONTACT.whatsapp}
        </a>{' '}
        · LinkedIn: <a href={CONTACT.linkedin} className="underline">in/jesus-caicedo</a>
      </p>
    </section>
  )
}
