import { useEffect, useRef } from 'react'

/* ============================================================
   Cosmos — motor background Tecnosfera v5 (fieles al monolito)
   Canvas: partículas + esfera 3D + shards SVG + glow + dust
   Scroll progreso: vidrio → esfera completa
   ============================================================ */

interface Part { x: number; y: number; z: number; vx: number; vy: number; size: number; color: number[]; tw: number }
interface Shard { el: SVGGElement; px: number; py: number; depth: number; dx: number; dy: number; rotationAmount: number; baseSize: number }

const PART_COLORS = [[79,140,255],[154,108,255],[213,154,69],[201,210,220],[95,240,192]]
const SPHERE_COLORS = {
  violet: [167,139,250],
  cyan: [94,242,212],
  magenta: [255,61,154],
  amber: [255,179,92],
}

const WORLD_STAGES = [
  { state: { glass: 1.00, sphere: 0.10, particles: 0.22, light: 0.14 } },
  { state: { glass: 0.88, sphere: 0.22, particles: 0.32, light: 0.24 } },
  { state: { glass: 0.70, sphere: 0.38, particles: 0.46, light: 0.38 } },
  { state: { glass: 0.50, sphere: 0.52, particles: 0.60, light: 0.52 } },
  { state: { glass: 0.32, sphere: 0.64, particles: 0.72, light: 0.64 } },
  { state: { glass: 0.16, sphere: 0.76, particles: 0.84, light: 0.76 } },
  { state: { glass: 0.06, sphere: 0.86, particles: 0.92, light: 0.86 } },
  { state: { glass: 0.01, sphere: 0.94, particles: 0.98, light: 0.94 } },
  { state: { glass: 0.00, sphere: 1.00, particles: 1.00, light: 1.00 } },
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function Cosmos() {
  const cvRef = useRef<HTMLCanvasElement>(null)
  const shardRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const cx = cv.getContext('2d')!
    if (!cx) return

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0, H = 0, CX = 0, CY = 0
    let progress = 0, smoothProgress = 0
    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0

    let parts: Part[] = []
    let sph: number[][] = []
    let pairs: number[][] = []
    let origSph: number[][] = []
    let shards: Shard[] = []
    let sphereRx = 0, sphereRy = 0

    const curState = { glass: 1.00, sphere: 0.10, particles: 0.22, light: 0.14 }

    function initParts() {
      parts = []
      const PN = Math.min(500, Math.floor(W * H / 2800))
      const count = W < 768 ? Math.floor(PN * 0.35) : PN
      for (let i = 0; i < count; i++) {
        const c = PART_COLORS[Math.floor(Math.random() * PART_COLORS.length)]
        parts.push({
          x: Math.random() * W, y: Math.random() * H,
          z: Math.random() * 0.75 + 0.25,
          vx: (Math.random() - 0.5) * 0.26, vy: (Math.random() - 0.5) * 0.26,
          size: Math.random() * 1.6 + 0.35, color: c, tw: Math.random() * Math.PI * 2,
        })
      }
    }

    function initSphere() {
      sph = []; origSph = []; pairs = []
      const phi = Math.PI * (3 - Math.sqrt(5))
      const count = RM ? 80 : (W < 768 ? 260 : 520)
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2
        const r = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = phi * i
        const pt = [Math.cos(theta) * r, y, Math.sin(theta) * r]
        sph.push(pt.slice())
        origSph.push(pt.slice())
      }
      const thr = W < 768 ? 0.36 : 0.30
      for (let a = 0; a < sph.length; a++) {
        for (let b = a + 1; b < sph.length; b++) {
          const dx = sph[a][0] - sph[b][0], dy = sph[a][1] - sph[b][1], dz = sph[a][2] - sph[b][2]
          if (dx * dx + dy * dy + dz * dz < thr * thr) pairs.push([a, b])
        }
      }
    }

    function initShards() {
      const svg = shardRef.current
      if (!svg) return
      svg.innerHTML = ''
      shards = []
      const count = W < 768 ? 26 : 44
      for (let i = 0; i < count; i++) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        g.setAttribute('class', 'shard')
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const px = Math.random() * 100
        const py = Math.random() * 100
        const edges = 3 + Math.floor(Math.random() * 4)
        const baseSize = 2.2 + Math.random() * 8.5
        const pts: string[] = []
        for (let e = 0; e < edges; e++) {
          const ang = (e / edges) * Math.PI * 2 + Math.random() * 0.95
          const rad = baseSize * (0.3 + Math.random() * 1.0)
          pts.push((Math.cos(ang) * rad).toFixed(1) + ',' + (Math.sin(ang) * rad).toFixed(1))
        }
        path.setAttribute('d', 'M' + pts.join(' L') + ' Z')
        path.setAttribute('fill', 'rgba(255,255,255,0.015)')
        path.setAttribute('stroke', 'rgba(167,139,250,0.11)')
        path.setAttribute('stroke-width', '0.3')
        g.appendChild(path)
        svg.appendChild(g)
        shards.push({
          el: g, px, py,
          depth: Math.random() * 0.6 + 0.1,
          dx: (Math.random() - 0.5) * 420,
          dy: (Math.random() - 0.5) * 420,
          rotationAmount: (Math.random() - 0.5) * 340,
          baseSize,
        })
      }
    }

    function sizeBg() {
      W = innerWidth; H = innerHeight; CX = W / 2; CY = H / 2
      cv!.width = W * dpr; cv!.height = H * dpr
      cv!.style.width = '100%'; cv!.style.height = '100%'
      cx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParts(); initSphere(); initShards()
    }

    function applyShards() {
      if (!shards.length) return
      const p = curState.glass
      for (const s of shards) {
        const bx = (s.px / 100) * W
        const by = (s.py / 100) * H
        const tx = targetMouseX * s.depth * 0.48 + s.dx * (1 - p) * 0.72
        const ty = targetMouseY * s.depth * 0.48 + s.dy * (1 - p) * 0.72
        const rot = (1 - p) * s.rotationAmount
        const op = clamp(p * (0.5 + s.depth * 0.5), 0, 1)
        s.el.style.transform = `translate(${bx + tx}px,${by + ty}px) rotate(${rot}deg) scale(${0.55 + 0.45 * p})`
        s.el.style.opacity = String(op)
      }
    }

    function updateState() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
      progress = clamp(window.scrollY / maxScroll, 0, 1)
      // Asymmetric lerp: faster when scrolling up (progress decreasing), slower when down
      const isScrollingUp = progress < smoothProgress
      const lerpFactor = isScrollingUp ? 0.25 : 0.08
      smoothProgress = lerp(smoothProgress, progress, lerpFactor)
      const secCount = WORLD_STAGES.length
      const idx = smoothProgress * (secCount - 1)
      const i0 = Math.floor(idx), i1 = Math.min(i0 + 1, secCount - 1), t = idx - i0
      const s0 = WORLD_STAGES[i0].state, s1 = WORLD_STAGES[i1].state
      curState.glass = lerp(s0.glass, s1.glass, t)
      curState.sphere = lerp(s0.sphere, s1.sphere, t)
      curState.particles = lerp(s0.particles, s1.particles, t)
      curState.light = lerp(s0.light, s1.light, t)
    }

    function drawParts(t: number) {
      const inten = curState.particles
      if (inten < 0.02) return
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        if (!RM) { p.x += p.vx * p.z; p.y += p.vy * p.z }
        if (p.x < -14) p.x = W + 14; if (p.x > W + 14) p.x = -14
        if (p.y < -14) p.y = H + 14; if (p.y > H + 14) p.y = -14
        const px = p.x - targetMouseX * p.z * 0.52
        const py = p.y - targetMouseY * p.z * 0.52
        const tw = 0.72 + 0.28 * Math.sin(t * 0.0010 + p.tw)
        const al = tw * p.z * inten
        cx.globalAlpha = al
        cx.fillStyle = `rgb(${p.color[0]},${p.color[1]},${p.color[2]})`
        const sz = p.size * (0.65 + 0.35 * inten)
        cx.beginPath(); cx.arc(px, py, sz, 0, 7); cx.fill()
        if (i % 5 === 0 && inten > 0.20) {
          cx.globalAlpha = al * 0.08
          cx.beginPath(); cx.arc(px, py, sz * 5 * inten, 0, 7); cx.fill()
        }
      }
      cx.globalAlpha = 1
    }

    function drawSphere(t: number) {
      const inten = curState.sphere
      if (inten < 0.02) return

      const baseRad = Math.min(W, H)
      const rad = baseRad * (0.20 + 0.75 * inten)
      const dispersion = 1.0 + 3.5 * inten
      const cx_ = CX + targetMouseX * 0.07
      const cy_ = CY + targetMouseY * 0.07

      if (!RM) { sphereRy += 0.0025 * inten; sphereRx += 0.0012 * inten }
      const ry = sphereRy + targetMouseX * 0.003
      const rx = sphereRx + targetMouseY * 0.002
      const cyr = Math.cos(ry), syr = Math.sin(ry)
      const cxr = Math.cos(rx), sxr = Math.sin(rx)

      const px = new Array(origSph.length)
      const py = new Array(origSph.length)
      const pz = new Array(origSph.length)
      const proj: { x: number; y: number; z: number; sc: number }[] = []

      for (let i = 0; i < origSph.length; i++) {
        const ox = origSph[i][0] * dispersion
        const oy = origSph[i][1] * dispersion
        const oz = origSph[i][2] * dispersion
        const x1 = ox * cyr + oz * syr
        const z1 = -ox * syr + oz * cyr
        const y2 = oy * cxr - z1 * sxr
        const z2 = oy * sxr + z1 * cxr
        const sc = rad / (1.6 - z2 * 0.28)
        px[i] = cx_ + x1 * sc
        py[i] = cy_ + y2 * sc
        pz[i] = z2
        proj.push({ x: px[i], y: py[i], z: z2, sc })
      }

      const baseOpacity = 0.30 + 0.70 * inten

      const paths: number[][] = [[], [], []]
      for (const pr of pairs) {
        const mz = (pz[pr[0]] + pz[pr[1]]) / 2
        paths[mz < -0.3 ? 0 : (mz < 0.3 ? 1 : 2)].push(pr[0], pr[1])
      }
      const als = [0.04, 0.09, 0.16]
      const edgePal = ['rgba(167,139,250,', 'rgba(94,242,212,', 'rgba(255,179,92,']

      cx.lineWidth = 0.6 * baseOpacity
      for (let bk = 0; bk < 3; bk++) {
        if (!paths[bk].length) continue
        cx.strokeStyle = edgePal[bk] + (als[bk] * baseOpacity) + ')'
        cx.beginPath()
        for (let m2 = 0; m2 < paths[bk].length; m2 += 2) {
          cx.moveTo(px[paths[bk][m2]], py[paths[bk][m2]])
          cx.lineTo(px[paths[bk][m2 + 1]], py[paths[bk][m2 + 1]])
        }
        cx.stroke()
      }

      for (let i = 0; i < proj.length; i++) {
        const p = proj[i]
        const depthAlpha = (0.35 + 0.65 * (p.z + 1) / 2)
        const na = depthAlpha * baseOpacity
        const ns = (1.5 + (p.z + 1) * 1.2) * (0.5 + 0.5 * inten)
        cx.globalAlpha = na
        if (p.z > 0) {
          cx.fillStyle = `rgb(${SPHERE_COLORS.cyan.join(',')})`
          cx.fillRect(p.x - ns / 2, p.y - ns / 2, ns, ns)
        } else {
          cx.fillStyle = `rgb(${SPHERE_COLORS.violet.join(',')})`
          cx.beginPath(); cx.arc(p.x, p.y, ns * 0.8, 0, 7); cx.fill()
        }
        if (p.z > 0.3 && inten > 0.35) {
          cx.globalAlpha = na * 0.35
          cx.fillStyle = 'rgb(220,210,255)'
          cx.beginPath(); cx.arc(p.x, p.y, ns * 0.4, 0, 7); cx.fill()
        }
      }

      if (inten > 0.20) {
        cx.save()
        cx.translate(cx_, cy_)
        cx.rotate(-0.42)
        cx.strokeStyle = `rgba(167,139,250,${0.15 * baseOpacity})`
        cx.lineWidth = 1.2
        cx.beginPath()
        cx.ellipse(0, 0, rad * 1.45, rad * 0.55, 0, 0, Math.PI * 2)
        cx.stroke()
        cx.strokeStyle = `rgba(94,242,212,${0.08 * baseOpacity})`
        cx.lineWidth = 0.8
        cx.beginPath()
        cx.ellipse(0, 0, rad * 1.55, rad * 0.62, 0.3, 0, Math.PI * 2)
        cx.stroke()
        const ang = t * 0.00030
        const sx2 = Math.cos(ang) * rad * 1.45
        const sy2 = Math.sin(ang) * rad * 0.55
        cx.fillStyle = `rgba(94,242,212,${0.25 * baseOpacity})`
        cx.beginPath(); cx.arc(sx2, sy2, 9, 0, Math.PI * 2); cx.fill()
        cx.fillStyle = `rgba(94,242,212,${0.95 * baseOpacity})`
        cx.beginPath(); cx.arc(sx2, sy2, 3.2, 0, Math.PI * 2); cx.fill()
        cx.strokeStyle = `rgba(94,242,212,${0.15 * baseOpacity})`
        cx.lineWidth = 1
        cx.beginPath()
        for (let tr = 0; tr < 8; tr++) {
          const tra = ang - tr * 0.08
          const trx = Math.cos(tra) * rad * 1.45
          const try_ = Math.sin(tra) * rad * 0.55
          if (tr === 0) cx.moveTo(trx, try_); else cx.lineTo(trx, try_)
        }
        cx.stroke()
        cx.restore()
      }

      if (inten > 0.06) {
        const gl = cx.createRadialGradient(cx_, cy_, rad * 0.1, cx_, cy_, rad * 2.5)
        gl.addColorStop(0, `rgba(167,139,250,${0.12 * baseOpacity})`)
        gl.addColorStop(0.35, `rgba(94,242,212,${0.06 * baseOpacity})`)
        gl.addColorStop(0.7, `rgba(154,108,255,${0.03 * baseOpacity})`)
        gl.addColorStop(1, 'rgba(167,139,250,0)')
        cx.globalAlpha = 1; cx.fillStyle = gl
        cx.fillRect(cx_ - rad * 2.8, cy_ - rad * 2.8, rad * 5.6, rad * 5.6)
      }
      cx.globalAlpha = 1
    }

    function drawCosmicDust(t: number) {
      const inten = curState.light
      if (inten < 0.05) return
      cx.save()
      cx.globalCompositeOperation = 'lighter'
      for (let b = 0; b < 3; b++) {
        const yy = H * (0.28 + b * 0.20)
        cx.beginPath()
        for (let q = 0; q <= 70; q++) {
          const xx = (q / 70) * W
          const wave = Math.sin(q * 0.16 + t * 0.00016 + b * 1.7) * H * (0.025 + b * 0.008)
          if (q === 0) cx.moveTo(xx, yy + wave); else cx.lineTo(xx, yy + wave)
        }
        cx.strokeStyle = [
          `rgba(167,139,250,${0.040 * inten})`,
          `rgba(94,242,212,${0.032 * inten})`,
          `rgba(255,61,154,${0.026 * inten})`,
        ][b]
        cx.lineWidth = 1.2 + b * 0.5
        cx.stroke()
      }
      cx.restore()
      cx.save()
      cx.globalCompositeOperation = 'lighter'
      const nebX = W * 0.62, nebY = H * 0.52
      cx.fillStyle = `rgba(167,139,250,${0.035 * inten})`
      cx.beginPath(); cx.arc(nebX - W * 0.16, nebY - H * 0.05, Math.min(W, H) * 0.34, 0, Math.PI * 2); cx.fill()
      cx.fillStyle = `rgba(94,242,212,${0.028 * inten})`
      cx.beginPath(); cx.arc(nebX + W * 0.10, nebY - H * 0.10, Math.min(W, H) * 0.29, 0, Math.PI * 2); cx.fill()
      cx.fillStyle = `rgba(255,61,154,${0.022 * inten})`
      cx.beginPath(); cx.arc(nebX + W * 0.18, nebY + H * 0.12, Math.min(W, H) * 0.25, 0, Math.PI * 2); cx.fill()
      cx.restore()
    }

    function drawLight() {
      const inten = curState.light
      if (inten < 0.05) return
      const g = cx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.82)
      g.addColorStop(0, `rgba(79,140,255,${0.032 * inten})`)
      g.addColorStop(0.45, `rgba(154,108,255,${0.024 * inten})`)
      g.addColorStop(1, 'transparent')
      cx.globalAlpha = 1; cx.fillStyle = g; cx.fillRect(0, 0, W, H)
    }

    function loop(t: number) {
      cx.clearRect(0, 0, W, H)
      targetMouseX += (mouseX - targetMouseX) * 0.05
      targetMouseY += (mouseY - targetMouseY) * 0.05
      updateState()
      drawLight()
      drawCosmicDust(t)
      drawParts(t)
      drawSphere(t)
      applyShards()
      if (!RM) requestAnimationFrame(loop)
    }

    const onResize = () => sizeBg()
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX - CX) / CX * 90
      mouseY = (e.clientY - CY) / CY * 90
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    sizeBg(); initShards()
    if (RM) loop(0); else requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div className="cosmos" aria-hidden="true">
      <div className="neb neb-a"></div>
      <div className="neb neb-b"></div>
      <div className="neb neb-c"></div>
      <div className="neb neb-d"></div>
      <canvas ref={cvRef} id="stars"></canvas>
      <svg ref={shardRef} id="shardSvg" aria-hidden="true"></svg>
      <div className="vignette"></div>
    </div>
  )
}

/* ---- Cursor personalizado ---- */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (window.matchMedia('(pointer: coarse)').matches || RM) return
    const cur = ref.current
    if (!cur) return
    let mx = innerWidth / 2, my = innerHeight / 2, px = mx, py = my
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      cur.classList.toggle('big', !!(t.closest && t.closest('a,button,.rec-h,input,textarea,select,label')))
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    let raf = 0;
    (function loop() {
      px += (mx - px) * .18; py += (my - py) * .18
      cur.style.transform = `translate(${px}px,${py}px)`
      raf = requestAnimationFrame(loop)
    })()
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} id="cur" aria-hidden="true"><i className="r"></i><i className="d"></i></div>
}
