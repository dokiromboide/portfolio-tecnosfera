// Catálogo de servicios de Tecnosfera.
// Cada servicio tiene precio base (COP) y un set de "add-ons" para el cotizador.

export type ServiceId =
  | 'auditoria'
  | 'web'
  | 'seo'
  | 'ecommerce'
  | 'transformacion'
  | 'soporte'

export interface AddOn {
  id: string
  label: { es: string; en: string }
  price: number // COP adicional
}

export interface Service {
  id: ServiceId
  icon: string // emoji o inicial
  category: 'web' | 'marketing' | 'consultoria'
  // textos por idioma
  name: { es: string; en: string }
  tagline: { es: string; en: string }
  description: { es: string; en: string }
  features: { es: string[]; en: string[] }
  basePrice: number // COP
  priceLabel: { es: string; en: string }
  addOns: AddOn[]
}

export const SERVICES: Service[] = [
  {
    id: 'auditoria',
    icon: '🔍',
    category: 'consultoria',
    name: { es: 'Auditoría Web Gratuita', en: 'Free Web Audit' },
    tagline: {
      es: 'Saber dónde está parado tu negocio en internet, sin costo.',
      en: 'Know where your business stands online, free of charge.',
    },
    description: {
      es: 'Revisamos tu presencia digital actual: velocidad, SEO básico, experiencia móvil y oportunidades de conversión. Entregamos un informe claro con pasos siguientes.',
      en: 'We review your current digital presence: speed, basic SEO, mobile experience and conversion opportunities. We deliver a clear report with next steps.',
    },
    features: {
      es: ['Informe PDF descargable', 'Hallazgos priorizados', 'Sin compromiso'],
      en: ['Downloadable PDF report', 'Prioritized findings', 'No commitment'],
    },
    basePrice: 0,
    priceLabel: { es: 'Gratis', en: 'Free' },
    addOns: [],
  },
  {
    id: 'web',
    icon: '🌐',
    category: 'web',
    name: { es: 'Página Web Autocontenida', en: 'Self-Contained Website' },
    tagline: {
      es: 'Una web rápida y profesional que no depende de terceros.',
      en: 'A fast, professional site that does not depend on third parties.',
    },
    description: {
      es: 'Sitio web a tu medida (landing o institucional) construido con React + Vite, optimizado para móviles y listo para desplegar. Incluye dominio y hosting básico por 1 año.',
      en: 'Custom website (landing or institutional) built with React + Vite, mobile-optimized and ready to deploy. Includes domain and basic hosting for 1 year.',
    },
    features: {
      es: ['Diseño responsive', 'Hasta 5 secciones', 'Formulario de contacto', 'SSL + dominio 1 año'],
      en: ['Responsive design', 'Up to 5 sections', 'Contact form', 'SSL + domain 1 year'],
    },
    basePrice: 900000,
    priceLabel: { es: 'desde', en: 'from' },
    addOns: [
      { id: 'extra-section', label: { es: 'Sección adicional (+3)', en: 'Extra section (+3)' }, price: 150000 },
      { id: 'blog', label: { es: 'Blog / noticias', en: 'Blog / news' }, price: 300000 },
      { id: 'multilang', label: { es: 'Versión bilingüe ES/EN', en: 'Bilingual ES/EN version' }, price: 250000 },
      { id: 'cms', label: { es: 'Panel de edición (CMS)', en: 'Editing panel (CMS)' }, price: 400000 },
    ],
  },
  {
    id: 'seo',
    icon: '📈',
    category: 'marketing',
    name: { es: 'SEO Local y Google Maps', en: 'Local SEO & Google Maps' },
    tagline: {
      es: 'Para que te encuentren cuando buscan en tu ciudad.',
      en: 'So they find you when they search in your city.',
    },
    description: {
      es: 'Optimizamos tu ficha de Google Business Profile, palabras clave locales y estructura on-page para aparecer en búsquedas y en el mapa. Reporte mensual de posiciones.',
      en: 'We optimize your Google Business Profile, local keywords and on-page structure to show up in search and on the map. Monthly ranking report.',
    },
    features: {
      es: ['Ficha GBP optimizada', 'Palabras clave locales', 'Reporte mensual'],
      en: ['Optimized GBP', 'Local keywords', 'Monthly report'],
    },
    basePrice: 500000,
    priceLabel: { es: 'desde / mes', en: 'from / mo' },
    addOns: [
      { id: 'gmb-posts', label: { es: 'Publicaciones GBP semanales', en: 'Weekly GBP posts' }, price: 200000 },
      { id: 'citations', label: { es: 'Citas en directorios locales', en: 'Local directory citations' }, price: 180000 },
      { id: 'content', label: { es: '2 artículos SEO/mes', en: '2 SEO articles/mo' }, price: 350000 },
    ],
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    category: 'web',
    name: { es: 'Tienda Online', en: 'Online Store' },
    tagline: {
      es: 'Vende tus productos sin comisiones de marketplace.',
      en: 'Sell your products without marketplace fees.',
    },
    description: {
      es: 'Catálogo de productos, carrito y pasarela de pago (Stripe/Mercado Pago). Autocontenido y conectado a tu inventario. Hasta 50 productos en el plan base.',
      en: 'Product catalog, cart and payment gateway (Stripe/Mercado Pago). Self-contained and linked to your inventory. Up to 50 products on base plan.',
    },
    features: {
      es: ['Catálogo 50 productos', 'Pasarela de pago', 'Panel de pedidos'],
      en: ['50-product catalog', 'Payment gateway', 'Orders panel'],
    },
    basePrice: 1800000,
    priceLabel: { es: 'desde', en: 'from' },
    addOns: [
      { id: 'extra-products', label: { es: 'Bloque +50 productos', en: '+50 products block' }, price: 400000 },
      { id: 'shipping', label: { es: 'Cálculo de envíos', en: 'Shipping calculator' }, price: 250000 },
      { id: 'coupons', label: { es: 'Cupones y descuentos', en: 'Coupons & discounts' }, price: 200000 },
    ],
  },
  {
    id: 'transformacion',
    icon: '⚙️',
    category: 'consultoria',
    name: { es: 'Transformación Digital PYME', en: 'SME Digital Transformation' },
    tagline: {
      es: 'Lleva tu negocio al mundo digital sin perder el rumbo.',
      en: 'Take your business digital without losing your way.',
    },
    description: {
      es: 'Acompañamiento de 4 a 8 semanas: diagnóstico, hoja de ruta, herramientas (CRM/ERP ligero) y capacitación de tu equipo. Metodología ágil (Scrum/Kanban).',
      en: '4 to 8 week engagement: diagnosis, roadmap, tools (light CRM/ERP) and team training. Agile methodology (Scrum/Kanban).',
    },
    features: {
      es: ['Diagnóstico inicial', 'Hoja de ruta', 'Capacitación equipo', 'Seguimiento quincenal'],
      en: ['Initial diagnosis', 'Roadmap', 'Team training', 'Biweekly follow-up'],
    },
    basePrice: 2500000,
    priceLabel: { es: 'desde / proyecto', en: 'from / project' },
    addOns: [
      { id: 'crm', label: { es: 'Implementación CRM', en: 'CRM implementation' }, price: 800000 },
      { id: 'automation', label: { es: 'Automatización de procesos', en: 'Process automation' }, price: 600000 },
      { id: 'dashboard', label: { es: 'Dashboard de métricas', en: 'Metrics dashboard' }, price: 500000 },
    ],
  },
  {
    id: 'soporte',
    icon: '🛠️',
    category: 'web',
    name: { es: 'Soporte y Mantenimiento', en: 'Support & Maintenance' },
    tagline: {
      es: 'Tu web siempre encendida y actualizada.',
      en: 'Your site always up and updated.',
    },
    description: {
      es: 'Plan mensual de respaldo, actualizaciones de seguridad, pequeñas mejoras y soporte por WhatsApp. Ideal después de lanzar tu proyecto.',
      en: 'Monthly plan with backups, security updates, small improvements and WhatsApp support. Ideal after launching your project.',
    },
    features: {
      es: ['Respaldo semanal', 'Actualizaciones', 'Soporte WhatsApp'],
      en: ['Weekly backup', 'Updates', 'WhatsApp support'],
    },
    basePrice: 250000,
    priceLabel: { es: 'desde / mes', en: 'from / mo' },
    addOns: [
      { id: 'priority', label: { es: 'Soporte prioritario 24/7', en: '24/7 priority support' }, price: 300000 },
      { id: 'hours', label: { es: 'Bloque 5 hrs mejoras', en: '5h improvements block' }, price: 400000 },
    ],
  },
]

export const CATEGORIES = [
  { id: 'all', label: { es: 'Todos', en: 'All' } },
  { id: 'web', label: { es: 'Web', en: 'Web' } },
  { id: 'marketing', label: { es: 'Marketing', en: 'Marketing' } },
  { id: 'consultoria', label: { es: 'Consultoría', en: 'Consulting' } },
] as const
