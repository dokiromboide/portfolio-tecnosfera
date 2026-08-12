/* ============================================================
   Projects — tarjetas apiladas sticky (caso 1 real + 2 locked)
   ============================================================ */

export function Projects() {
  return (
    <section id="proyectos">
      <div className="wrap">
        <div className="sec-h rv"><span className="sec-n">( 04 )</span><span className="scr">PROYECTOS</span><span className="sec-m">CASOS DE ESTUDIO · SIN RESULTADOS INVENTADOS</span></div>
        <h2 className="h2 rv">Lo que ya existe.</h2>
        <p className="sec-p rv">Cada proyecto sigue la misma estructura: problema, solución, tecnología, resultado. Publicamos evidencia — no promesas.</p>

        <div className="casos">
          {/* Caso 01 */}
          <article className="caso" style={{ ['--i' as any]: 0 }}>
            <div className="caso-top">
              <span className="ok2t">CASO 01 / OPERATIVO</span>
              <i className="dot"></i>
              <span className="caso-tag">HERRAMIENTA INTERNA DE ESTIMACIÓN — ESTE MISMO SITIO</span>
            </div>
            <h3>Cotizador Tecnosfera</h3>
            <div className="caso-grid">
              <div className="mock" aria-hidden="true">
                <div className="mock-bar"><i></i><i></i><i></i><span>COTIZADOR · UI POR PASOS</span></div>
                <div className="mock-bd">
                  <div className="mock-steps"><b className="on">01</b><i></i><b>02</b><i></i><b>03</b></div>
                  <div className="mock-line"><span>SERVICIO</span><span>PÁGINA WEB AUTOCONTENIDA</span></div>
                  <div className="mock-line"><span>COMPLEMENTOS</span><span>BLOG · CMS</span></div>
                  <div className="mock-line"><span>COMPLEJIDAD</span><span>MEDIA</span></div>
                  <div className="mock-total"><span>TOTAL ESTIMADO</span><b>$ 1.550.000<i className="blink">▮</i></b></div>
                </div>
              </div>
              <div>
                <div className="cblk"><span>EL PROBLEMA</span><p>Estimar un proyecto por chat era lento, ambiguo y dependía de la memoria de cada conversación.</p></div>
                <div className="cblk"><span>LA SOLUCIÓN</span><p>Un configurador en vivo: servicio, complementos y total estimado al instante.</p></div>
                <div className="cblk"><span>TECNOLOGÍA</span><div className="chips"><span className="chip">JAVASCRIPT</span><span className="chip">LÓGICA DE ESTIMACIÓN</span><span className="chip">UI EN VIVO</span></div></div>
                <div className="cblk"><span>RESULTADO</span><p className="hl">[MÉTRICAS POR DOCUMENTAR]</p></div>
              </div>
            </div>
            <p className="caso-note">NOTA: LAS MÉTRICAS SE PUBLICARÁN CUANDO EXISTAN DATOS REALES VERIFICADOS.</p>
          </article>

          {/* Caso 02 locked */}
          <article className="caso locked" style={{ ['--i' as any]: 1 }}>
            <span className="stamp">EN DOCUMENTACIÓN</span>
            <div className="caso-top"><span>CASO 02 / EN DOCUMENTACIÓN</span></div>
            <div className="lock-big">[REGISTRO EN DOCUMENTACIÓN] — PRÓXIMO CASO DE ESTUDIO</div>
            <div className="cblk"><span>EL PROBLEMA</span><p>[POR CONFIRMAR]</p></div>
            <div className="cblk"><span>LA SOLUCIÓN</span><p>[POR CONFIRMAR]</p></div>
            <div className="cblk"><span>TECNOLOGÍA</span><p>[POR CONFIRMAR]</p></div>
            <div className="cblk"><span>RESULTADO</span><p>[POR CONFIRMAR]</p></div>
            <p className="caso-note">ESTE CASO SE PUBLICARÁ CON DATOS REALES. NO INVENTAMOS CLIENTES NI RESULTADOS.</p>
          </article>

          {/* Caso 03 locked */}
          <article className="caso locked" style={{ ['--i' as any]: 2 }}>
            <span className="stamp">EN DOCUMENTACIÓN</span>
            <div className="caso-top"><span>CASO 03 / EN DOCUMENTACIÓN</span></div>
            <div className="lock-big">[REGISTRO EN DOCUMENTACIÓN] — PRÓXIMO CASO DE ESTUDIO</div>
            <div className="cblk"><span>EL PROBLEMA</span><p>[POR CONFIRMAR]</p></div>
            <div className="cblk"><span>LA SOLUCIÓN</span><p>[POR CONFIRMAR]</p></div>
            <div className="cblk"><span>TECNOLOGÍA</span><p>[POR CONFIRMAR]</p></div>
            <div className="cblk"><span>RESULTADO</span><p>[POR CONFIRMAR]</p></div>
            <p className="caso-note">LA EVIDENCIA SE PUBLICA CUANDO EXISTE. ANTES, NO.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ---- Process ---- */
const PHASES = [
  { n: '00', t: 'Señal', d: 'Nos escribes. Escuchamos el problema completo antes de proponer una solución.' },
  { n: '01', t: 'Diagnóstico', d: 'Entendemos el problema real antes de escribir una sola línea de código.' },
  { n: '02', t: 'Diseño', d: 'Definimos alcance, arquitectura y experiencia. Sin sorpresas después.' },
  { n: '03', t: 'Construcción', d: 'Iteramos con entregas visibles. Ves el sistema crecer, no promesas.' },
  { n: '04', t: 'Despliegue', d: 'El sistema sale a producción medido, documentado y estable.' },
  { n: '05', t: 'Evolución', d: 'Monitoreamos, mejoramos y escalamos. El lanzamiento es el inicio.' },
]

export function Process() {
  return (
    <section id="proceso">
      <div className="wrap proc-grid">
        <div className="proc-left">
          <div className="sec-h rv"><span className="sec-n">( 05 )</span><span className="scr">PROCESO</span></div>
          <h2 className="h2 rv">De la idea<br/>al sistema.</h2>
          <p className="sec-p rv">Seis fases. Cero humo. Entendemos el problema antes de decidir qué construir.</p>
          <p className="mono rv" style={{ marginTop: '26px', fontSize: '11px', letterSpacing: '.2em', color: 'var(--dim)' }}>METODOLOGÍA PROPIA · SEIS FASES / CERO HUMO</p>
        </div>
        <div className="proc-right">
          <i id="procFill" aria-hidden="true"></i>
          <ol className="phases">
            {PHASES.map(p => (
              <li key={p.n} className="ph rv"><span className="ph-n">{p.n}</span><div><h3>{p.t}</h3><p>{p.d}</p></div></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---- Technology ---- */
const TECH = [
  { n: '01', t: 'WEB', d: 'HTML, CSS y JavaScript. Interfaces rápidas, propias y mantenibles.', d2: '.08s' },
  { n: '02', t: 'DATOS', d: 'APIs, bases de datos y estructuras que convierten información en decisiones.', d2: '.16s' },
  { n: '03', t: 'AUTOMATIZACIÓN', d: 'Flujos, formularios, integraciones y procesos internos que reducen trabajo repetitivo.', d2: '.24s' },
  { n: '04', t: 'VISIBILIDAD', d: 'SEO on-page, presencia local y Google Maps para que te encuentren cuando te buscan.', d2: '.32s' },
]

export function Technology() {
  return (
    <section id="tecnologia">
      <div className="wrap">
        <div className="sec-h rv"><span className="sec-n">( 06 )</span><span className="scr">TECNOLOGÍA</span><span className="sec-m">STACK EN EVOLUCIÓN · CO / 2026</span></div>
        <h2 className="h2 rv">Las herramientas <em>detrás.</em></h2>
        <div className="tech-grid">
          {TECH.map(t => (
            <article key={t.n} className="tch rv" style={{ ['--d' as any]: t.d2 }}>
              <span className="tch-n">{t.n}</span>
              <h3 className="tch-t">{t.t}</h3>
              <p>{t.d}</p>
            </article>
          ))}
        </div>
        <p className="tech-note rv">// LAS HERRAMIENTAS SE ELIGEN POR PROYECTO — NO AL REVÉS.</p>
      </div>
      <div className="tick2" aria-hidden="true">
        <div className="tick-in">
          <span>STACK EN EVOLUCIÓN</span><span><b>·</b></span><span>CO / 2026</span><span><b>·</b></span><span>HTML</span><span><b>·</b></span><span>CSS</span><span><b>·</b></span><span>JAVASCRIPT</span><span><b>·</b></span><span>APIS</span><span><b>·</b></span><span>SEO</span><span><b>·</b></span><span>GOOGLE MAPS</span><span><b>·</b></span><span>AUTOMATIZACIÓN</span><span><b>·</b></span>
        </div>
      </div>
    </section>
  )
}

/* ---- About ---- */
const PRINCIPLES = [
  { n: 'P/01', t: 'Diagnóstico antes de código', d: 'Entender el problema vale más que apresurar la solución.', d2: '0s' },
  { n: 'P/02', t: 'Rendimiento es diseño', d: 'Lo lento no está terminado. Lo inaccesible tampoco.', d2: '.08s' },
  { n: 'P/03', t: 'Nada de humo', d: 'Sin métricas inventadas, sin promesas infladas, sin jerga vacía.', d2: '.16s' },
  { n: 'P/04', t: 'Evolución continua', d: 'Un sistema vivo se mejora después del lanzamiento, no se abandona.', d2: '.24s' },
]

export function About() {
  return (
    <section id="nosotros">
      <div className="wrap">
        <div className="nos-grid">
          <div className="nos-left">
            <div className="sec-h rv"><span className="sec-n">( 07 )</span><span className="scr">NOSOTROS</span></div>
            <h2 className="h2 rv">El laboratorio.</h2>
            <span className="badge rv"><i className="dot"></i>ESTUDIO INDEPENDIENTE · ESTADO: ACTIVO</span>
          <p className="sec-p rv">Tecnosfera existe porque la tecnología también debe estar al alcance de las pymes. Diseñamos y construimos sistemas para negocios que necesitan dejar de parchar y empezar a evolucionar.</p>
          <p className="sec-p rv" style={{ marginTop: '16px' }}>No vendemos horas: vendemos problemas resueltos. Cada decisión técnica pasa por una pregunta simple — <span className="cy">¿esto acerca el sistema a resolver el problema real?</span></p>
          </div>
          <div className="nos-right">
            {PRINCIPLES.map(p => (
              <div key={p.n} className="prin rv" style={{ ['--d' as any]: p.d2 }}>
                <b>{p.n}</b>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="team-note">[PERFILES DEL EQUIPO POR PUBLICAR] — LA INFORMACIÓN DEL EQUIPO SE COMPLETARÁ EN LA FASE DE CONTENIDO.</p>
      </div>
    </section>
  )
}
