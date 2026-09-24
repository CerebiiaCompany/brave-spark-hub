// Mock data — ready to be replaced by a real backend later.
export const user = {
  name: "María González",
  first: "María",
  role: "Líder Público",
  city: "Cúcuta, Norte de Santander",
  level: 6,
  levelName: "Agente de Cambio",
  levelProgress: 78,
  xp: 2450,
  streak: 8,
  progress: 68,
  badges: 14,
  projects: 3,
  hours: 42,
};

export const demoUsers = [
  { name: "María González", role: "Líder Público", xp: 2450, city: "Cúcuta" },
  { name: "Juan David Ramírez", role: "Líder Empresarial", xp: 2310, city: "Bogotá" },
  { name: "Valentina Pérez", role: "Líder de Impacto", xp: 2180, city: "Pamplona" },
  { name: "Santiago Rojas", role: "Líder Público", xp: 1940, city: "Villa del Rosario" },
  { name: "Laura Méndez", role: "Líder de Impacto", xp: 1820, city: "Ocaña" },
];

export const levels = [
  "Explorador", "Aprendiz", "Ciudadano Activo", "Constructor", "Estratega",
  "Agente de Cambio", "Líder Emergente", "Líder Territorial", "Líder Valiente",
];

export const paths = [
  {
    id: "publico", emoji: "🏛️", title: "Líder Público",
    desc: "Comprende el Estado, diseña políticas públicas y aprende a gobernar con ética y datos.",
    skills: ["Políticas públicas", "Oratoria", "Negociación", "Ética"], courses: 12, projects: 18,
  },
  {
    id: "empresarial", emoji: "🚀", title: "Líder Empresarial",
    desc: "Crea empresas, dirige equipos y convierte ideas en modelos de negocio sostenibles.",
    skills: ["Emprendimiento", "Finanzas", "Innovación", "Ventas"], courses: 10, projects: 24,
  },
  {
    id: "impacto", emoji: "🌎", title: "Líder de Impacto",
    desc: "Moviliza comunidades y construye soluciones sociales con impacto medible.",
    skills: ["Liderazgo social", "Gestión comunitaria", "Medición de impacto", "Comunicación"], courses: 9, projects: 21,
  },
];

export const courses = [
  { id: "politicas", title: "Introducción a las Políticas Públicas", path: "Líder Público", progress: 68, lessons: 14, hours: 8, level: "Básico" },
  { id: "estado", title: "Cómo funciona el Estado colombiano", path: "Líder Público", progress: 100, lessons: 10, hours: 6, level: "Básico" },
  { id: "oratoria", title: "Oratoria y debate público", path: "Líder Público", progress: 35, lessons: 12, hours: 7, level: "Intermedio" },
  { id: "modelo", title: "Modelo de negocio en 30 días", path: "Líder Empresarial", progress: 0, lessons: 16, hours: 10, level: "Intermedio" },
  { id: "finanzas", title: "Finanzas para emprendedores", path: "Líder Empresarial", progress: 12, lessons: 9, hours: 5, level: "Básico" },
  { id: "comunidad", title: "Gestión comunitaria efectiva", path: "Líder de Impacto", progress: 0, lessons: 11, hours: 6, level: "Básico" },
  { id: "datos", title: "Pensamiento crítico y datos", path: "Transversal", progress: 54, lessons: 8, hours: 4, level: "Intermedio" },
  { id: "etica", title: "Ética y liderazgo valiente", path: "Transversal", progress: 20, lessons: 6, hours: 3, level: "Básico" },
];

export const skills = [
  { name: "Comunicación", value: 81 },
  { name: "Trabajo en equipo", value: 88 },
  { name: "Gestión", value: 59 },
  { name: "Pensamiento crítico", value: 72 },
  { name: "Negociación", value: 46 },
  { name: "Innovación", value: 64 },
  { name: "Ética pública", value: 90 },
  { name: "Análisis de datos", value: 52 },
];

export const badges = [
  { emoji: "🏆", name: "Gran Orador", desc: "Ganaste 3 debates", earned: true, tone: "gold" },
  { emoji: "💡", name: "Innovador", desc: "Propusiste una idea destacada", earned: true, tone: "warning" },
  { emoji: "🌎", name: "Líder Territorial", desc: "Resolviste un reto de frontera", earned: true, tone: "success" },
  { emoji: "🏛️", name: "Legislador", desc: "Aprobaste un proyecto de ley", earned: true, tone: "primary" },
  { emoji: "🔥", name: "Constancia", desc: "7 días de racha", earned: true, tone: "coral" },
  { emoji: "🔎", name: "Verificador", desc: "Detectaste 10 noticias falsas", earned: true, tone: "violet" },
  { emoji: "🤝", name: "Colaborador", desc: "Trabajaste en 3 equipos", earned: true, tone: "primary" },
  { emoji: "📊", name: "Analista", desc: "Completa 5 laboratorios", earned: false, tone: "muted" },
  { emoji: "🚀", name: "Fundador", desc: "Lanza tu emprendimiento", earned: false, tone: "muted" },
  { emoji: "🎓", name: "Graduado", desc: "Completa una ruta", earned: false, tone: "muted" },
  { emoji: "🗳️", name: "Demócrata", desc: "Vota en 20 sesiones", earned: false, tone: "muted" },
  { emoji: "🦁", name: "Líder Valiente", desc: "Alcanza el nivel 9", earned: false, tone: "muted" },
];

export const challenges = [
  { id: 1, title: "¿Cómo aumentar el empleo juvenil en Cúcuta?", zone: "Frontera", xp: 300, deadline: "12 oct", teams: 14, progress: 40 },
  { id: 2, title: "Movilidad segura en el puente Simón Bolívar", zone: "Frontera", xp: 250, deadline: "20 oct", teams: 9, progress: 0 },
  { id: 3, title: "Integración de población migrante en colegios", zone: "Social", xp: 280, deadline: "28 oct", teams: 11, progress: 15 },
  { id: 4, title: "Comercio formal en zona binacional", zone: "Económico", xp: 320, deadline: "5 nov", teams: 7, progress: 0 },
];

export const activities = [
  { title: "Concejo Simulado: Presupuesto juvenil", when: "Hoy · 6:00 PM", type: "🏛️" },
  { title: "Mentoría empresarial con Andrés Silva", when: "Mañana · 4:00 PM", type: "🚀" },
  { title: "Evaluación: Políticas Públicas módulo 4", when: "Vie · 10:00 AM", type: "📝" },
  { title: "Presentación de proyecto — Demo Day", when: "Sáb · 9:00 AM", type: "🎤" },
];

export const projects = [
  { title: "Huertas Urbanas Frontera", author: "Valentina Pérez", stage: "Piloto", category: "Impacto", votes: 128, desc: "Red de huertas comunitarias en barrios de Villa del Rosario." },
  { title: "EmpleaJoven Cúcuta", author: "María González", stage: "Validación", category: "Público", votes: 96, desc: "Plataforma que conecta jóvenes con primer empleo local." },
  { title: "CaféBinacional", author: "Juan David Ramírez", stage: "Incubación", category: "Empresarial", votes: 143, desc: "Marca de café de pequeños productores de la frontera." },
  { title: "Verifica.co", author: "Laura Méndez", stage: "Idea", category: "Información", votes: 74, desc: "Bot comunitario para verificar noticias en WhatsApp." },
  { title: "Rutas Seguras", author: "Santiago Rojas", stage: "Validación", category: "Público", votes: 88, desc: "Mapa colaborativo de rutas seguras para estudiantes." },
  { title: "Taller Digital Norte", author: "Equipo Ocaña", stage: "Piloto", category: "Empresarial", votes: 61, desc: "Formación en habilidades digitales para comerciantes." },
];

export const incubatorStages = ["Idea", "Validación", "Prototipo", "Modelo de negocio", "Piloto", "Demo Day"];

export const bills = [
  {
    id: 1, title: "Proyecto de Acuerdo 014: Presupuesto participativo juvenil",
    summary: "Destinar el 5% del presupuesto de inversión municipal a proyectos propuestos por jóvenes.",
    author: "Bancada Futuro", status: "En votación", yes: 18, no: 7, abstain: 3,
  },
  {
    id: 2, title: "Proyecto de Acuerdo 015: Transporte estudiantil gratuito",
    summary: "Subsidio total del transporte público para estudiantes de colegios públicos.",
    author: "Bancada Territorio", status: "En debate", yes: 0, no: 0, abstain: 0,
  },
];

export const impact = {
  youth: 3240, projects: 186, hours: 48200, challenges: 92, ventures: 37, towns: 24, allies: 41,
};

export const monthly = [
  { m: "Abr", jovenes: 420, proyectos: 12 },
  { m: "May", jovenes: 780, proyectos: 25 },
  { m: "Jun", jovenes: 1150, proyectos: 48 },
  { m: "Jul", jovenes: 1720, proyectos: 81 },
  { m: "Ago", jovenes: 2460, proyectos: 132 },
  { m: "Sep", jovenes: 3240, proyectos: 186 },
];

export const territories = [
  { name: "Cúcuta", youth: 1420, projects: 78, x: 52, y: 48 },
  { name: "Villa del Rosario", youth: 510, projects: 31, x: 60, y: 58 },
  { name: "Los Patios", youth: 320, projects: 17, x: 44, y: 60 },
  { name: "Pamplona", youth: 390, projects: 22, x: 40, y: 78 },
  { name: "Ocaña", youth: 360, projects: 20, x: 24, y: 22 },
  { name: "Tibú", youth: 240, projects: 18, x: 58, y: 18 },
];

export const allies = [
  { name: "Universidad aliada", type: "Universidad", offer: "Becas y créditos académicos" },
  { name: "Cámara de Comercio", type: "Empresa", offer: "Mentorías y ruedas de negocio" },
  { name: "Alcaldía municipal", type: "Entidad pública", offer: "Prácticas en gobierno" },
  { name: "Fundación social", type: "Organización social", offer: "Voluntariado y financiación" },
  { name: "Red de mentores", type: "Mentores", offer: "Acompañamiento 1:1" },
  { name: "Aceleradora regional", type: "Empresa", offer: "Capital semilla" },
];

export const opportunities = [
  { title: "Beca de liderazgo público 2027", org: "Universidad aliada", type: "Beca", deadline: "15 nov" },
  { title: "Práctica en Secretaría de Juventud", org: "Alcaldía municipal", type: "Práctica", deadline: "30 oct" },
  { title: "Convocatoria capital semilla", org: "Aceleradora regional", type: "Financiación", deadline: "10 nov" },
  { title: "Programa de mentoría empresarial", org: "Cámara de Comercio", type: "Mentoría", deadline: "Abierta" },
];

export const newsItems = [
  { claim: "\"El 80% de los jóvenes de la frontera no tiene empleo formal.\"", verdict: "Engañoso", explain: "La cifra real de informalidad juvenil ronda el 60–70%; el dato mezcla desempleo con informalidad." },
  { claim: "\"El Concejo aprobó eliminar el transporte estudiantil.\"", verdict: "Falso", explain: "No existe acta ni proyecto aprobado con ese contenido." },
  { claim: "\"El Estado colombiano tiene tres ramas del poder público.\"", verdict: "Verdadero", explain: "Ejecutiva, legislativa y judicial, más órganos autónomos e independientes." },
];
