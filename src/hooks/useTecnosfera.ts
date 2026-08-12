import { useEffect, useState } from 'react'

/* ============================================================
   Hooks compartidos — reveal, scramble, active section, proc fill
   ============================================================ */

const CHARS = '#/<>[]{}=+*01'

export function scramble(el: HTMLElement) {
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const txt = el.dataset.text || el.textContent || ''
  el.dataset.text = txt
  if (RM) { el.textContent = txt; return }
  let f = 0
  const total = Math.max(16, txt.length * 2)
  function step() {
    f++
    let out = ''
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i]
      out += c === ' ' ? ' ' : (i < (f / total) * txt.length ? c : CHARS[Math.floor(Math.random() * CHARS.length)])
    }
    el.textContent = out
    if (f < total) requestAnimationFrame(step)
    else el.textContent = txt
  }
  step()
}

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          if (e.target.classList.contains('scr')) scramble(e.target as HTMLElement)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })

    const els = document.querySelectorAll('.rv,.scr')
    els.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])
}

export function useActiveSection(sections: string[]) {
  const [active, setActive] = useState(sections[0] || '')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id)
      })
    }, { rootMargin: '-40% 0px -55% 0px' })

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    return () => io.disconnect()
  }, [sections.join(',')])

  return active
}

export function useProcFill() {
  useEffect(() => {
    const procEl = document.getElementById('proceso')
    const pf = document.getElementById('procFill')
    if (!procEl || !pf) return

    const upd = () => {
      const r = procEl.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / r.height))
      pf.style.transform = `scaleY(${p})`
    }

    window.addEventListener('scroll', upd, { passive: true })
    upd()
    return () => window.removeEventListener('scroll', upd)
  }, [])
}
