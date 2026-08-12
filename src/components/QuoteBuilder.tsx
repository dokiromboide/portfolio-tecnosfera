import { useState } from 'react'

/* ============================================================
   QuoteBuilder — cotizador de 6 pasos
   Fiel al monolito: necesidad, complejidad, features, presupuesto, tiempo, estimación
   ============================================================ */

const STEPS = ['¿QUÉ NECESITAS?', '¿QUÉ TAN COMPLEJO ES?', '¿QUÉ CARACTERÍSTICAS?', '¿CUÁL ES TU PRESUPUESTO?', '¿CUÁNDO LO NECESITAS?', 'ESTIMACIÓN / CONTACTO']

const NEEDS = [
  { v: 'web', c: 'WEB', l: 'DESARROLLO WEB', s: 'Sitio o plataforma digital' },
  { v: 'app', c: 'APP', l: 'APLICACIÓN', s: 'Producto digital a medida' },
  { v: 'auto', c: 'AUT', l: 'AUTOMATIZACIÓN', s: 'Procesos que trabajan solos' },
  { v: 'sistema', c: 'SYS', l: 'SISTEMA A MEDIDA', s: 'Software interno de operación' },
  { v: 'infra', c: 'INF', l: 'INFRAESTRUCTURA', s: 'Hosting, deploy, estabilidad' },
  { v: 'soporte', c: 'SOP', l: 'SOPORTE', s: 'Mantenimiento y evolución' },
]

const COMPLEX = [
  { v: 'baja', l: 'BAJA', s: 'Se puede explicar en una frase.', m: 1 },
  { v: 'media', l: 'MEDIA', s: 'Hay varias piezas que conectar.', m: 2 },
  { v: 'alta', l: 'ALTA', s: 'Hay procesos, roles y datos en juego.', m: 3 },
]

const FEATURES = ['DISEÑO UI A MEDIDA', 'BACKEND / API', 'PANEL DE ADMINISTRACIÓN', 'PAGOS EN LÍNEA', 'INTEGRACIONES EXTERNAS', 'BASE DE DATOS', 'AUTENTICACIÓN DE USUARIOS', 'CONTENIDO MULTIIDIOMA']
const BUDGETS = ['AÚN NO LO SÉ', '< USD 1K', 'USD 1K – 5K', 'USD 5K – 15K', '> USD 15K']
const TIMES = ['URGENTE — MENOS DE 1 MES', 'PRONTO — 1 A 3 MESES', 'FLEXIBLE — ESTE AÑO', 'SIN FECHA DEFINIDA']

interface QzData { need: string | null; complex: string | null; features: Record<string, boolean>; budget: string | null; timeline: string | null }

const needLabel = (v: string | null) => { const n = NEEDS.find(x => x.v === v); return n ? n.l : '—' }

function estimate(d: QzData) {
  const BASE: Record<string, number> = { web: 34, app: 48, auto: 26, sistema: 52, infra: 30, soporte: 14 }
  const WK: Record<string, [number, number]> = { web: [3, 6], app: [6, 12], auto: [2, 5], sistema: [6, 14], infra: [2, 6], soporte: [1, 3] }
  const MUL: Record<string, number> = { baja: 1, media: 1.55, alta: 2.3 }
  const m = d.complex ? MUL[d.complex] : 1
  const score = Math.round((BASE[d.need || ''] || 30) * m + Object.keys(d.features).length * 7)
  const tier = score < 70 ? 'BASE' : score < 130 ? 'AVANZADO' : 'COMPLEJO'
  const wk = WK[d.need || ''] || [2, 6]
  const w0 = Math.max(1, Math.round(wk[0] * m * 0.9))
  const w1 = Math.max(w0 + 1, Math.round(wk[1] * m * 1.1))
  return { score, tier, w0, w1 }
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function QuoteBuilder({ onSendToContact }: { onSendToContact: (msg: string) => void }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState<QzData>({ need: null, complex: null, features: {}, budget: null, timeline: null })

  const canNext = step === 0 ? !!d.need : step === 1 ? !!d.complex : true

  const select = (k: string, v: string) => {
    if (k === 'need') setD(p => ({ ...p, need: v }))
    else if (k === 'complex') setD(p => ({ ...p, complex: v }))
    else if (k === 'feature') setD(p => { const f = { ...p.features }; if (f[v]) delete f[v]; else f[v] = true; return { ...p, features: f } })
    else if (k === 'budget') setD(p => ({ ...p, budget: v }))
    else if (k === 'timeline') setD(p => ({ ...p, timeline: v }))
  }

  const next = () => {
    if (step === 5) { setStep(0); setD({ need: null, complex: null, features: {}, budget: null, timeline: null }); return }
    if (!canNext) return
    setStep(s => s + 1)
  }

  const back = () => { if (step > 0) setStep(s => s - 1) }

  const sendToContact = () => {
    const feats = Object.keys(d.features)
    const msg = `SEÑAL DESDE EL COTIZADOR\nNECESIDAD: ${needLabel(d.need)}\nCOMPLEJIDAD: ${(d.complex || '—').toUpperCase()}\nCARACTERÍSTICAS: ${feats.length ? feats.join(', ') : '—'}\nPRESUPUESTO: ${d.budget || '—'}\nTIEMPO: ${d.timeline || '—'}`
    onSendToContact(msg)
  }

  return (
    <section id="cotizador">
      <div className="wrap">
        <div className="sec-h rv"><span className="sec-n">( 08 )</span><span className="scr">COTIZADOR</span><span className="sec-m">CONFIGURADOR / 06 PASOS · ESTIMACIÓN ORIENTATIVA</span></div>
        <h2 className="h2 rv">¿Qué necesitas<br/><em>construir?</em></h2>
        <p className="sec-p rv">Responde 6 preguntas. Al final recibes una estimación orientativa de alcance, tiempo y esfuerzo.</p>
        <div className="qz">
          <aside className="qz-rail" aria-label="Progreso del cotizador">
            <ol id="qzRail">
              {STEPS.map((s, i) => (
                <li key={i} className={i < step ? 'done' : i === step ? 'cur' : ''}>
                  <i>0{i + 1}</i>{s}
                </li>
              ))}
            </ol>
            <div className="qz-bar"><i id="qzBarI" style={{ width: ((step + 1) / 6 * 100) + '%' }}></i></div>
          </aside>
          <div className="qz-main">
            <div id="qzBody" aria-live="polite">
              {step === 0 && (
                <>
                  <p className="qz-title">// 01 — ¿QUÉ NECESITAS?</p>
                  <p className="qz-sub">Elige el frente de trabajo. Esto define la base del sistema.</p>
                  <div className="qz-opts">
                    {NEEDS.map(n => (
                      <button key={n.v} className={`qz-opt ${d.need === n.v ? 'sel' : ''}`} onClick={() => select('need', n.v)}>
                        <b>{n.c}</b><strong>{n.l}</strong><small>{n.s}</small>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <p className="qz-title">// 02 — ¿QUÉ TAN COMPLEJO ES?</p>
                  <p className="qz-sub">No necesitas certeza absoluta: una intuición honesta basta.</p>
                  <div className="qz-opts">
                    {COMPLEX.map(c => (
                      <button key={c.v} className={`qz-opt ${d.complex === c.v ? 'sel' : ''}`} onClick={() => select('complex', c.v)}>
                        <b>NIVEL {c.l}</b><small>{c.s}</small>
                        <span className="mtr">{[1, 2, 3].map(k => <i key={k} className={k <= c.m ? 'f' : ''}></i>)}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <p className="qz-title">// 03 — ¿QUÉ CARACTERÍSTICAS NECESITAS?</p>
                  <p className="qz-sub">Marca todas las que apliquen. Cada una suma alcance.</p>
                  <div className="qz-chips">
                    {FEATURES.map(f => (
                      <button key={f} className={`chip ${d.features[f] ? 'sel' : ''}`} onClick={() => select('feature', f)}>{f}</button>
                    ))}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <p className="qz-title">// 04 — ¿CUÁL ES TU PRESUPUESTO?</p>
                  <p className="qz-sub">Un rango aproximado. "Aún no lo sé" también es una respuesta válida.</p>
                  <div className="qz-opts">
                    {BUDGETS.map(bd => (
                      <button key={bd} className={`qz-opt ${d.budget === bd ? 'sel' : ''}`} onClick={() => select('budget', bd)}><strong>{bd}</strong></button>
                    ))}
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <p className="qz-title">// 05 — ¿CUÁNDO LO NECESITAS?</p>
                  <p className="qz-sub">El tiempo disponible cambia el orden de las decisiones.</p>
                  <div className="qz-opts">
                    {TIMES.map(t => (
                      <button key={t} className={`qz-opt ${d.timeline === t ? 'sel' : ''}`} onClick={() => select('timeline', t)}><strong>{t}</strong></button>
                    ))}
                  </div>
                </>
              )}
              {step === 5 && (() => {
                const est = estimate(d)
                const feats = Object.keys(d.features)
                return (
                  <>
                    <p className="qz-title">// 06 — ESTIMACIÓN DEL SISTEMA</p>
                    <p className="qz-sub">Lectura orientativa generada por el configurador. No es un precio: es un mapa.</p>
                    <div className="qz-tier">
                      <div><b>NIVEL DE SISTEMA</b><strong>{est.tier}</strong></div>
                      <div><b>TIEMPO APROXIMADO</b><strong>{est.w0}–{est.w1} SEM</strong></div>
                      <div><b>ÍNDICE DE ESFUERZO</b><strong>{est.score} PTS</strong></div>
                    </div>
                    <div className="qz-meter"><i style={{ width: clamp(est.score / 2.2, 4, 100) + '%' }}></i></div>
                    <div className="qz-sum">
                      <div><span>NECESIDAD</span><b>{needLabel(d.need)}</b></div>
                      <div><span>COMPLEJIDAD</span><b>{d.complex ? d.complex.toUpperCase() : '—'}</b></div>
                      <div><span>CARACTERÍSTICAS</span><b>{feats.length ? feats.length + ' MÓDULOS' : '—'}</b></div>
                      <div><span>PRESUPUESTO</span><b>{d.budget || '—'}</b></div>
                      <div><span>TIEMPO</span><b>{d.timeline || '—'}</b></div>
                    </div>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                      <button className="btn-acc" id="qzSend" onClick={sendToContact}>Enviar a contacto →</button>
                    </div>
                    <p className="qz-disc">// EL ALCANCE REAL SE DEFINE EN UNA SESIÓN DE DIAGNÓSTICO. SIN COMPROMISO.</p>
                  </>
                )
              })()}
            </div>
            <div className="qz-nav">
              <button className="qz-back" id="qzBack" onClick={back} style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>← RETROCEDER</button>
              <span className="hint" id="qzHint">PASO 0{step + 1} / 06 — {STEPS[step]}</span>
              <button className="qz-next" id="qzNext" onClick={next} disabled={!canNext && step < 5}>{step === 5 ? 'REINICIAR ⟲' : 'AVANZAR →'}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
