import { useState } from 'react'
import { CONTACT } from '../config'
import { Logo } from './Logo'

/* ============================================================
   Contact — info + form + confirmación WhatsApp
   ============================================================ */

const WA = `https://wa.me/${CONTACT.whatsapp}`

export function Contact({ prefillMsg }: { prefillMsg: string | null }) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [serv, setServ] = useState('Página Web Autocontenida')
  const [errs, setErrs] = useState<Record<string, boolean>>({})

  // Prefill from quote builder
  if (prefillMsg && msg !== prefillMsg) {
    setMsg(prefillMsg)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrs: Record<string, boolean> = {}
    if (!name.trim()) newErrs.name = true
    if (!email.trim()) newErrs.email = true
    if (!msg.trim()) newErrs.msg = true
    setErrs(newErrs)
    if (Object.keys(newErrs).length) return

    const btn = document.getElementById('cSend') as HTMLButtonElement
    if (btn) { btn.disabled = true; btn.textContent = 'TRANSMITIENDO SEÑAL…' }

    setTimeout(() => {
      const fullMsg = `Hola Tecnosfera 👋 Soy ${name.trim()}.\nServicio de interés: ${serv}\n\n${msg.trim()}\n\nEmail de retorno: ${email.trim()}`
      const waLink = document.getElementById('cOkWa') as HTMLAnchorElement
      if (waLink) waLink.href = WA + '?text=' + encodeURIComponent(fullMsg)
      setSent(true)
      if (btn) btn.textContent = 'SEÑAL ENVIADA ✓'
      const ok = document.getElementById('cOk')
      if (ok) ok.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 900)
  }

  return (
    <section id="contacto">
      <div className="wrap con-grid">
        <div className="con-left">
          <div className="sec-h rv"><span className="sec-n">( 09 )</span><span className="scr">CONTACTO</span></div>
          <h2 className="h2 rv">Entremos en la<br/><span className="cy">Tecnosfera.</span></h2>
          <p className="sec-p rv">Cuéntanos tu proyecto y te respondemos en 24–72 h.</p>
          <div style={{ marginTop: '34px' }} className="rv">
            <div className="con-row"><span>CANAL DIRECTO</span><a href={WA} target="_blank" rel="noopener">WHATSAPP +57 315 406 8410</a></div>
            <div className="con-row"><span>RED PROFESIONAL</span><a href={CONTACT.linkedin} target="_blank" rel="noopener">LINKEDIN ↗</a></div>
            <div className="con-row"><span>TIEMPO DE RESPUESTA</span><b style={{ fontWeight: 500 }}>24 – 72 HORAS</b></div>
            <div className="con-row"><span>BASE DE OPERACIÓN</span><b style={{ fontWeight: 500 }}>CO / 2026</b></div>
          </div>
          <div className="con-btns rv">
            <a className="btn btn-a" href={WA} target="_blank" rel="noopener">WHATSAPP DIRECTO</a>
            <a className="btn btn-b" href={CONTACT.linkedin} target="_blank" rel="noopener">LINKEDIN ↗</a>
          </div>
        </div>

        <form className="con-form rv" id="cForm" style={{ ['--d' as any]: '.15s' }} onSubmit={submit} noValidate>
          <div className={`fld ${errs.name ? 'err' : ''}`}>
            <label htmlFor="fName">IDENTIFÍCATE — NOMBRE</label>
            <input id="fName" type="text" autoComplete="name" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={`fld ${errs.email ? 'err' : ''}`}>
            <label htmlFor="fMail">CANAL DE RETORNO — EMAIL</label>
            <input id="fMail" type="email" autoComplete="email" placeholder="tucorreo@dominio.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="fld">
            <label htmlFor="fServ">SERVICIO DE INTERÉS</label>
            <select id="fServ" value={serv} onChange={e => setServ(e.target.value)}>
              <option>Auditoría Web Gratuita</option>
              <option selected>Página Web Autocontenida</option>
              <option>SEO Local y Google Maps</option>
              <option>Tienda Online</option>
              <option>Transformación Digital PYME</option>
              <option>Soporte y Mantenimiento</option>
            </select>
          </div>
          <div className={`fld ${errs.msg ? 'err' : ''}`}>
            <label htmlFor="fMsg">DESCRIBE EL PROBLEMA REAL</label>
            <textarea id="fMsg" placeholder="Cuéntanos qué está frenando tu negocio…" value={msg} onChange={e => setMsg(e.target.value)}></textarea>
          </div>
          <button className="btn btn-a" id="cSend" type="submit">ENVIAR SEÑAL →</button>
          {sent && (
            <div className="c-ok" id="cOk">
              <h3>// SEÑAL RECIBIDA</h3>
              <p>Tu mensaje quedó registrado en el sistema. Responderemos por el canal indicado en 24–72 horas. Mientras tanto, la Tecnosfera sigue en línea.</p>
              <a className="btn btn-a sm" id="cOkWa" target="_blank" rel="noopener">CONFIRMAR POR WHATSAPP →</a>
            </div>
          )}
          <p className="c-note">NOTA: CONEXIÓN DE ENVÍO REAL PENDIENTE DE CONFIGURACIÓN EN DESPLIEGUE — PARA RESPUESTA INMEDIATA USA EL CANAL DE WHATSAPP.</p>
        </form>
      </div>
    </section>
  )
}

/* ---- Footer ---- */
export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-word" aria-hidden="true">TECN<Logo size={72} className="logo-o" spin />SFERA</div>
        <div className="f-grid">
          <div>© 2026 TECNOSFERA<br />TODOS LOS SISTEMAS OPERATIVOS<br /><span className="mg">LA REALIDAD TIENE LÍMITES</span></div>
          <nav aria-label="Pie">
            <a href="#soluciones">SOLUCIONES</a><a href="#proyectos">PROYECTOS</a><a href="#proceso">PROCESO</a><a href="#cotizador">COTIZADOR</a><a href="#contacto">CONTACTO</a>
          </nav>
          <div className="f-r">
            <a href={WA} target="_blank" rel="noopener">WHATSAPP 57 315 406 8410</a><br />
            <a href={CONTACT.linkedin} target="_blank" rel="noopener">LINKEDIN ↗</a><br />
            SYSTEM / ONLINE · CO / 2026 · <span id="clk2">--:--:--</span>
          </div>
        </div>
        <div className="f-hint">↑↓ NAVEGAR · ↵ EJECUTAR · ESC CERRAR — PULSA ⌘K PARA ABRIR EL SISTEMA</div>
      </div>
    </footer>
  )
}
