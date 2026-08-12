import { useEffect, useState } from 'react'
import { Cosmos, Cursor } from './components/Cosmos'
import { Boot } from './components/Boot'
import { Header, Rail, ScrollProgress } from './components/Header'
import { CommandPalette } from './components/CommandPalette'
import { Hero, FractureStrip, Problem } from './components/Hero'
import { Solutions } from './components/Solutions'
import { Projects, Process, Technology, About } from './components/Sections'
import { QuoteBuilder } from './components/QuoteBuilder'
import { Contact, Footer } from './components/Contact'
import { useReveal, useActiveSection, useProcFill } from './hooks/useTecnosfera'
import { CONTACT } from './config'

const ALL_SECTIONS = ['realidad', 'problema', 'soluciones', 'proyectos', 'proceso', 'tecnologia', 'nosotros', 'cotizador', 'contacto']

export default function App() {
  const [booting, setBooting] = useState(true)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [prefillMsg, setPrefillMsg] = useState<string | null>(null)

  const activeSection = useActiveSection(ALL_SECTIONS)
  useReveal()
  useProcFill()

  // Start hero animation after boot
  const onBootDone = () => {
    setBooting(false)
    document.body.classList.remove('lock')
    const h = document.getElementById('realidad')
    if (h) h.classList.add('go')
  }

  // CMD palette actions
  const navigate = (id: string) => {
    setCmdOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const cmdAction = (action: string) => {
    setCmdOpen(false)
    if (action === 'wa') window.open(`https://wa.me/${CONTACT.whatsapp}`, '_blank')
    else if (action === 'li') window.open(CONTACT.linkedin, '_blank')
    else if (action === 'aud') {
      const el = document.getElementById('cotizador')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cotizar desde Solutions → prefill contact
  const onCotizar = (_need: string) => {
    const el = document.getElementById('cotizador')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // QuoteBuilder → enviar a contacto
  const onSendToContact = (msg: string) => {
    setPrefillMsg(msg)
    const el = document.getElementById('contacto')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // CMD keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen(o => !o)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Universo vibrante */}
      <Cosmos />
      <div className="noise" aria-hidden="true"></div>
      <Cursor />

      {/* Boot */}
      {booting && <Boot onDone={onBootDone} />}

      {/* Skip link */}
      <a className="skip" href="#contenido">SALTAR AL CONTENIDO</a>

      {/* Header + progress + rail */}
      <Header activeSection={activeSection} onCmdOpen={() => setCmdOpen(true)} />
      <ScrollProgress />
      <Rail activeSection={activeSection} />

      {/* Command palette */}
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={navigate}
        onAction={cmdAction}
      />

      {/* Main content */}
      <main id="contenido">
        <Hero />
        <FractureStrip />
        <Problem />
        <Solutions onCotizar={onCotizar} />
        <Projects />
        <Process />
        <Technology />
        <About />
        <QuoteBuilder onSendToContact={onSendToContact} />
        <Contact prefillMsg={prefillMsg} />
      </main>

      <Footer />
    </>
  )
}
