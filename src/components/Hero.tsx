/* ============================================================
   Hero — "Cuando la realidad no alcanza, creamos lo que sigue"
   + tick marquee + scrollcue
   ============================================================ */

export function Hero() {
  return (
    <section className="hero" id="realidad">
      <div className="orbit" aria-hidden="true"></div>
      <div className="wrap">
        <p className="meta rv">TECNOSFERA — ESTUDIO TECNOLÓGICO <b>// CO-2026</b></p>
        <h1 className="h1">
          <span className="lm"><span>Cuando la</span></span>
          <span className="lm"><span><em>realidad</em> no alcanza,</span></span>
          <span className="lm"><span className="cy">creamos lo que sigue.</span></span>
        </h1>
        <p className="lead rv" style={{ ['--d' as any]: '.15s' }}>
          La realidad tiene límites. Software, automatización y sistemas a medida para problemas que ya no pueden seguir igual. <span className="mg">Atraviesa el espejo.</span>
        </p>
        <div className="cta rv" style={{ ['--d' as any]: '.25s' }}>
          <a className="btn btn-a" href="#cotizador">INICIAR PROYECTO <span>→</span></a>
          <a className="btn btn-b" href="#soluciones">EXPLORAR EL SISTEMA</a>
        </div>
        <div className="hstat rv" style={{ ['--d' as any]: '.35s' }}>
          <span>SEÑAL: <b className="ok2t">ESTABLE</b></span>
          <span>SCANNING<i className="blink">▮</i></span>
          <span>RESPUESTA: 24–72 H</span>
        </div>
      </div>
      <div className="hero-side" aria-hidden="true">
        <span>01 REALIDAD</span><span>02 FRACTURA</span><span>03 TECNOSFERA</span>
      </div>
      <div className="scrollcue" aria-hidden="true">DESLIZA — ATRAVIESA EL ESPEJO<i></i></div>
      <div className="tick" aria-hidden="true">
        <div className="tick-in">
          <span>SOFTWARE A MEDIDA</span><span><b>✳</b></span><span>AUTOMATIZACIÓN</span><span><b>✳</b></span><span>SISTEMAS PARA PYMES</span><span><b>✳</b></span><span>LA REALIDAD TIENE LÍMITES</span><span><b>✳</b></span><span>DESPLAZA PARA ENTRAR</span><span><b>✳</b></span>
        </div>
      </div>
    </section>
  )
}

/* ---- Fracture strip ---- */
export function FractureStrip() {
  return (
    <div className="fract" aria-hidden="true">
      <div className="fract-in">
        <span>▓ FRACTURA DETECTADA</span><span>— ENTRADA ABIERTA —</span><span>LA REALIDAD TIENE LÍMITES</span><span>— LA TECNOSFERA NO —</span><span>▓▓ FRACTURA DETECTADA</span><span>— ENTRADA ABIERTA —</span>
      </div>
    </div>
  )
}

/* ---- Problem section ---- */
const SYMPTOMS = [
  { n: 'S/01', title: 'Procesos manuales repetitivos', desc: 'Horas humanas quemadas en tareas que una máquina haría sin parpadear.' },
  { n: 'S/02', title: 'Datos dispersos', desc: 'La información existe, pero vive rota entre hojas, chats y cabezas.' },
  { n: 'S/03', title: 'Sistemas obsoletos', desc: 'Software que sostiene el negocio por costumbre, no por capacidad.' },
  { n: 'S/04', title: 'Decisiones a ciegas', desc: 'Sin datos completos, toda estrategia es una apuesta.' },
]

export function Problem() {
  return (
    <section id="problema">
      <div className="wrap">
        <div className="sec-h rv"><span className="sec-n">( 02 )</span><span className="scr">EL PROBLEMA</span><span className="sec-m">DIAGNÓSTICO INICIAL · SÍNTOMAS / 04</span></div>
        <h2 className="h2 rv">El mundo real<br/>es <em>complejo.</em></h2>
        <p className="sec-p rv">Procesos manuales, datos dispersos, sistemas que nadie entiende y decisiones a ciegas. La fricción diaria de un negocio no es mala suerte: <span className="cy">es falta de sistema.</span></p>
        <div className="syms">
          {SYMPTOMS.map((s, i) => (
            <article key={s.n} className="sym rv" style={{ ['--d' as any]: `${i * 0.1}s` }}>
              <span className="sym-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
