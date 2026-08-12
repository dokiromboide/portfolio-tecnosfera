/* ============================================================
   Logo Tecnosfera — globo grid verde + anillo naranja
   Reemplaza la "O" en header y footer
   ============================================================ */

interface LogoProps {
  size?: number
  className?: string
  spin?: boolean
}

export function Logo({ size = 20, className = '', spin = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', animation: spin ? 'spin 12s linear infinite' : 'none' }}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      {/* Anillo naranja exterior */}
      <circle cx="24" cy="24" r="22" stroke="#ffb35c" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Globo grid verde */}
      <circle cx="24" cy="24" r="16" stroke="#5ef2d4" strokeWidth="1.2" fill="none" opacity="0.8" />
      {/* Líneas del grid (meridianos) */}
      <ellipse cx="24" cy="24" rx="16" ry="6" stroke="#5ef2d4" strokeWidth="0.8" fill="none" opacity="0.5" />
      <ellipse cx="24" cy="24" rx="16" ry="11" stroke="#5ef2d4" strokeWidth="0.8" fill="none" opacity="0.4" />
      <ellipse cx="24" cy="24" rx="6" ry="16" stroke="#5ef2d4" strokeWidth="0.8" fill="none" opacity="0.5" />
      <ellipse cx="24" cy="24" rx="11" ry="16" stroke="#5ef2d4" strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Líneas ecuatoriales */}
      <line x1="8" y1="24" x2="40" y2="24" stroke="#5ef2d4" strokeWidth="0.6" opacity="0.3" />
      <line x1="24" y1="8" x2="24" y2="40" stroke="#5ef2d4" strokeWidth="0.6" opacity="0.3" />
      {/* Nodo central */}
      <circle cx="24" cy="24" r="2" fill="#5ef2d4" />
      {/* Nodos en intersecciones */}
      <circle cx="24" cy="8" r="1.2" fill="#5ef2d4" opacity="0.8" />
      <circle cx="24" cy="40" r="1.2" fill="#5ef2d4" opacity="0.8" />
      <circle cx="8" cy="24" r="1.2" fill="#5ef2d4" opacity="0.8" />
      <circle cx="40" cy="24" r="1.2" fill="#5ef2d4" opacity="0.8" />
    </svg>
  )
}
