import { useEffect, useRef, useState } from 'react'

/* ============================================================
   CommandPalette — ⌘K palette con keyboard nav
   Fiel al monolito
   ============================================================ */

interface Cmd { n: string; t: string; a: () => void }

const SECTIONS = [
  { id: 'realidad', label: 'IR — REALIDAD (INICIO)', n: '01' },
  { id: 'problema', label: 'IR — EL PROBLEMA', n: '02' },
  { id: 'soluciones', label: 'IR — SOLUCIONES', n: '03' },
  { id: 'proyectos', label: 'IR — PROYECTOS', n: '04' },
  { id: 'proceso', label: 'IR — PROCESO', n: '05' },
  { id: 'tecnologia', label: 'IR — TECNOLOGÍA', n: '06' },
  { id: 'nosotros', label: 'IR — NOSOTROS', n: '07' },
  { id: 'cotizador', label: 'IR — COTIZADOR / INICIAR PROYECTO', n: '08' },
  { id: 'contacto', label: 'IR — CONTACTO', n: '09' },
]

export function CommandPalette({ open, onClose, onNavigate, onAction }: {
  open: boolean
  onClose: () => void
  onNavigate: (id: string) => void
  onAction: (action: string) => void
}) {
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const cmds: Cmd[] = [
    ...SECTIONS.map(s => ({ n: s.n, t: s.label, a: () => onNavigate(s.id) })),
    { n: '⌘', t: 'ACCIÓN — AUDITORÍA WEB GRATUITA', a: () => onAction('aud') },
    { n: '↗', t: 'ACCIÓN — WHATSAPP DIRECTO', a: () => onAction('wa') },
    { n: '↗', t: 'ACCIÓN — LINKEDIN', a: () => onAction('li') },
  ]

  const filtered = cmds.filter(c => c.t.toLowerCase().includes(query.trim().toLowerCase()))
  const items = filtered.length ? filtered : [{ n: '—', t: 'SIN RESULTADOS', a: () => {} }]

  useEffect(() => {
    if (open) {
      setQuery(''); setIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) onClose()
        return
      }
      if (!open) return
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => (i + 1) % items.length) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => (i - 1 + items.length) % items.length) }
      else if (e.key === 'Enter') { e.preventDefault(); items[idx]?.a() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, items, idx])

  if (!open) return null

  const run = (i: number) => { items[i]?.a() }

  return (
    <div className="cmd" id="cmd" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cmd-p">
        <input
          ref={inputRef}
          id="cmdIn"
          placeholder="ESCRIBE UN COMANDO…"
          autoComplete="off"
          aria-label="Paleta de comandos"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIdx(0) }}
        />
        <div className="cmd-list" id="cmdList">
          {items.map((c, i) => (
            <button
              key={i}
              className={`ci ${i === idx ? 'act' : ''}`}
              data-i={i}
              onClick={() => run(i)}
            >
              <b>{c.n}</b>{c.t}
            </button>
          ))}
        </div>
        <div className="cmd-f mono">↑↓ NAVEGAR · ↵ EJECUTAR · ESC CERRAR</div>
      </div>
    </div>
  )
}


