import { useEffect, useRef, useState } from 'react'

/* ============================================================
   Boot — secuencia de arranque v2.6
   Fiel al monolito: 3 líneas tipo terminal + barra + skip
   ============================================================ */

const BOOT_LINES = [
  { l: 'CARGANDO REALIDAD', d: 12, s: 'OK' },
  { l: 'FRACTURA DETECTADA', d: 9, s: 'OK' },
  { l: 'ENTRANDO A LA TECNOSFERA', d: 3, s: null as string | null },
]

export function Boot({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)
  const skipRef = useRef(false)

  const finish = () => {
    if (done) return
    setDone(true)
    onDone()
  }

  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (RM) { onDone(); return }

    const el = ref.current
    if (!el) return

    let cancelled = false
    const wait = (ms: number) => new Promise(r => setTimeout(r, skipRef.current ? 0 : ms))
    const bar = el.querySelector('#bootBar') as HTMLElement

    async function typeTxt(textEl: HTMLSpanElement, txt: string) {
      for (let i = 0; i < txt.length; i++) {
        if (cancelled) return
        textEl.textContent += txt[i]
        await wait(13)
      }
    }

    async function run() {
      const box = el?.querySelector('#bootLines') as HTMLElement | null
      if (!box) return
      box.innerHTML = ''  // Clear any stray content
      let pct = 8

      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return
        const item = BOOT_LINES[i]
        const row = document.createElement('div')
        row.className = 'bl'
        const left = document.createElement('span')
        left.className = 'bl-l'
        const a = document.createElement('span')
        a.textContent = ''  // Ensure empty start to avoid stray first char
        const dt = document.createElement('i')
        dt.className = 'dots'
        left.appendChild(a); left.appendChild(dt)
        row.appendChild(left)
        let b: HTMLElement | null = null
        if (item.s) {
          b = document.createElement('b')
          b.className = 'ok2'
          row.appendChild(b)
        }
        box.appendChild(row)
        await typeTxt(a, item.l)
        for (let k = 0; k < item.d; k++) {
          if (cancelled) return
          dt.textContent += '.'
          await wait(34)
        }
        if (b) {
          b.textContent = ' ' + item.s
          pct = 30 + (i + 1) * 22
          if (bar) bar.style.width = pct + '%'
        }
        await wait(160)
      }
      if (cancelled) return
      if (bar) bar.style.width = '100%'
      await wait(420)
      finish()
    }

    const timeout = setTimeout(finish, 7000)
    run()

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation()
    skipRef.current = true
    finish()
  }

  if (done) return null

  return (
    <div ref={ref} id="boot" role="status" aria-label="Cargando Tecnosfera" onClick={finish}>
      <div className="boot-in">
        <div className="boot-logo">TECNOSFERA OS — v2.6 <span>// CO-2026</span></div>
        <div id="bootLines"></div>
        <div className="boot-bar"><i id="bootBar"></i></div>
        <button id="bootSkip" onClick={handleSkip}>OMITIR →</button>
      </div>
    </div>
  )
}
