import { useState } from 'react'

/* ============================================================
   Solutions — 6 servicios colapsables + panel de lectura
   Fiel al monolito: mapea a data/services.ts
   ============================================================ */

interface SolService {
  id: string
  num: string
  name: string
  category: 'web' | 'con' | 'mkt'
  catLabel: string
  desc: string
  includes: string[]
  need: string
}

const SOL_SERVICES: SolService[] = [
  { id: 'aud', num: '/01', name: 'Auditoría Web Gratuita', category: 'con', catLabel: 'CONSULTORÍA', desc: 'Saber dónde está parado tu negocio en internet, sin costo.', includes: ['Revisión técnica y de contenido', 'Informe claro y accionable', '30 min de llamada de diagnóstico', 'Sin costo y sin compromiso'], need: 'web' },
  { id: 'web', num: '/02', name: 'Página Web Autocontenida', category: 'web', catLabel: 'WEB', desc: 'Una web rápida y profesional que no depende de terceros.', includes: ['Hasta 5 secciones a medida', 'Dominio y archivos propios', 'Velocidad y accesibilidad optimizadas', 'Sin suscripciones ocultas'], need: 'web' },
  { id: 'seo', num: '/03', name: 'SEO Local y Google Maps', category: 'mkt', catLabel: 'MARKETING', desc: 'Para que te encuentren cuando buscan en tu ciudad.', includes: ['Google Business Profile optimizado', 'Palabras clave locales', 'Gestión de reseñas', 'Informe mensual de posiciones'], need: 'web' },
  { id: 'shop', num: '/04', name: 'Tienda Online', category: 'web', catLabel: 'WEB', desc: 'Vende tus productos sin comisiones de marketplace.', includes: ['Catálogo y carrito propios', 'Pagos en línea integrados', 'Sin comisiones de marketplace', 'Capacitación de pedidos incluida'], need: 'web' },
  { id: 'trans', num: '/05', name: 'Transformación Digital PYME', category: 'con', catLabel: 'CONSULTORÍA', desc: 'Lleva tu negocio al mundo digital sin perder el rumbo.', includes: ['Diagnóstico integral del negocio', 'Roadmap digital por fases', 'Automatización de procesos críticos', 'Acompañamiento continuo'], need: 'auto' },
  { id: 'sop', num: '/06', name: 'Soporte y Mantenimiento', category: 'web', catLabel: 'WEB', desc: 'Tu web siempre encendida y actualizada.', includes: ['Actualizaciones y respaldos', 'Monitoreo de disponibilidad', 'Cambios menores mensuales', 'Soporte prioritario por WhatsApp'], need: 'soporte' },
]

const READ_MAP: Record<string, { num: string; name: string }> = {
  aud: { num: '01', name: 'AUDITORÍA WEB GRATUITA' },
  web: { num: '02', name: 'PÁGINA WEB AUTOCONTENIDA' },
  seo: { num: '03', name: 'SEO LOCAL Y GOOGLE MAPS' },
  shop: { num: '04', name: 'TIENDA ONLINE' },
  trans: { num: '05', name: 'TRANSFORMACIÓN DIGITAL PYME' },
  sop: { num: '06', name: 'SOPORTE Y MANTENIMIENTO' },
}

export function Solutions({ onCotizar }: { onCotizar: (need: string) => void }) {
  const [open, setOpen] = useState<string | null>('aud')
  const [read, setRead] = useState({ num: '01', name: 'AUDITORÍA WEB GRATUITA' })

  const setReadFor = (id: string) => {
    const r = READ_MAP[id]
    if (r) setRead(r)
  }

  const togglePhase = (id: string) => {
    setOpen(prev => prev === id ? null : id)
    setReadFor(id)
  }

  return (
    <section id="soluciones">
      <div className="wrap">
        <div className="door rv"><span>Cada síntoma es una puerta. <b>Nosotros la abrimos.</b></span><i className="arr">↓</i></div>
      </div>
      <div className="wrap sol-grid">
        <div className="sol-left">
          <div className="sec-h rv"><span className="sec-n">( 03 )</span><span className="scr">SOLUCIONES</span></div>
          <h2 className="h2 rv">Construimos<br/>sistemas.</h2>
          <p className="mono rv" style={{ fontSize: '11px', letterSpacing: '.2em', color: 'var(--dim)' }}>
            SEIS SERVICIOS / UN OBJETIVO —<br />SELECCIONA UN REGISTRO
          </p>
          <div className="sol-read rv">
            <span className="sr-n">{read.num}</span>
            <span className="sr-name">{read.name}</span>
            <span className="sr-st"><i className="dot"></i>SISTEMA: DISPONIBLE</span>
          </div>
        </div>
        <div className="sol-right">
          <div className="sol-phases">
            {SOL_SERVICES.map(s => (
              <article
                key={s.id}
                className={`sol-phase rv ${open === s.id ? 'open' : ''}`}
                data-id={s.id}
                data-need={s.need}
                onMouseEnter={() => setReadFor(s.id)}
              >
                <span className="sol-ph-n">{s.num}</span>
                <div>
                  <div className="sol-ph-head" onClick={() => togglePhase(s.id)}>
                    <h3>{s.name}</h3>
                    <span className={`sol-ph-cat cat-${s.category}`}>{s.catLabel}</span>
                    <span className="sol-ph-x">+</span>
                  </div>
                  <div className="sol-ph-body">
                    <div className="sol-ph-bwrap" onClick={e => e.stopPropagation()}>
                      <div className="sol-ph-bi">
                        <p className="sol-ph-d">{s.desc}</p>
                        <ul className="sol-ph-inc">
                          {s.includes.map((inc, i) => <li key={i}>{inc}</li>)}
                        </ul>
                        <button
                          className="btn btn-a sm"
                          data-cot={s.id}
                          data-need={s.need}
                          onClick={(e) => { e.stopPropagation(); onCotizar(s.need) }}
                        >
                          COTIZAR ESTE SERVICIO →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
