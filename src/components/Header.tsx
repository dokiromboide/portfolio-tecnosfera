import { useEffect, useState } from 'react'
import { CONTACT } from '../config'
import { Logo } from './Logo'

/* ---- Reloj ---- */
function useClock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('es-CO', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const NAV_ITEMS = [
  { href: '#soluciones', num: '01', label: 'SOLUCIONES' },
  { href: '#proyectos', num: '02', label: 'PROYECTOS' },
  { href: '#proceso', num: '03', label: 'PROCESO' },
  { href: '#nosotros', num: '04', label: 'NOSOTROS' },
  { href: '#contacto', num: '05', label: 'CONTACTO' },
]

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Header({ activeSection, onCmdOpen }: { activeSection: string; onCmdOpen: () => void }) {
  const time = useClock()
  const [mnavOpen, setMnavOpen] = useState(false)

  const toggleMnav = (v: boolean) => {
    setMnavOpen(v)
    document.body.classList.toggle('lock', v)
  }

  return (
    <>
      <header id="hdr">
        <div className="hdr-in">
          <a href="#realidad" className="logo" onClick={(e) => scrollToSection(e, '#realidad')}>TECN<Logo size={18} className="logo-o" />SFERA</a>
          <nav className="nav" aria-label="Principal">
            {NAV_ITEMS.map(n => (
              <a key={n.href} href={n.href} className={activeSection === n.href.slice(1) ? 'on' : ''} onClick={(e) => scrollToSection(e, n.href)}>
                <i>{n.num}</i>{n.label}
              </a>
            ))}
          </nav>
          <div className="hdr-r">
            <span className="clk">{time}</span>
            <span className="st"><i className="dot"></i>SYSTEM / ONLINE</span>
            <button className="cmdk" onClick={onCmdOpen} aria-label="Abrir paleta de comandos">⌘K</button>
            <button className={`burger ${mnavOpen ? 'open' : ''}`} onClick={() => toggleMnav(!mnavOpen)} aria-label="Menú">
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div id="prog" aria-hidden="true"></div>

      {/* Mobile nav */}
      <div className={`mnav ${mnavOpen ? 'open' : ''}`} id="mnav">
        {NAV_ITEMS.map(n => (
          <a key={n.href} href={n.href} onClick={(e) => { toggleMnav(false); scrollToSection(e, n.href) }}>
            <i>{n.num}</i>{n.label}
          </a>
        ))}
        <div className="m-meta">
          <span>SYSTEM / ONLINE</span><span>CO / 2026</span><span>{time}</span>
        </div>
      </div>
    </>
  )
}

const RAIL_SECTIONS = [
  { id: 'realidad', label: 'REALIDAD' },
  { id: 'problema', label: 'FRACTURA' },
  { id: 'soluciones', label: 'SOLUCIONES' },
  { id: 'proyectos', label: 'PROYECTOS' },
  { id: 'proceso', label: 'PROCESO' },
  { id: 'tecnologia', label: 'TECNOLOGÍA' },
  { id: 'nosotros', label: 'NOSOTROS' },
  { id: 'cotizador', label: 'COTIZADOR' },
  { id: 'contacto', label: 'CONTACTO' },
]

export function Rail({ activeSection }: { activeSection: string }) {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="rail" aria-label="Secciones">
      {RAIL_SECTIONS.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-sec={s.id}
          className={activeSection === s.id ? 'on' : ''}
          onClick={(e) => scrollTo(e, s.id)}
        >
          <i></i><span>{s.label}</span>
        </a>
      ))}
    </nav>
  )
}

/* ---- Scroll progress ---- */
export function ScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      const prog = document.getElementById('prog')
      if (prog) prog.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}

/* ---- Prompt helpers ---- */
export { CONTACT }
