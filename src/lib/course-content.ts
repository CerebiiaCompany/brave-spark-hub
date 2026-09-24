// Contenido de muestra por curso. Reemplazar por material pedagógico oficial.
import { courses } from "@/lib/data";
import leadershipVideo from "@/assets/liderazgo-participacion.mp4.asset.json";

export type Course = (typeof courses)[number];
export type Lesson = {
  title: string;
  minutes: number;
  video: string;
  keyNotes: string[];
  reading: { heading: string; body: string }[];
  resources: { name: string; pages: number }[];
  question: { q: string; options: string[]; answer: number };
};

const VIDEO = leadershipVideo.url;

const stages = [
  "Conceptos esenciales",
  "Contexto y marco legal",
  "Caso del territorio",
  "Herramientas prácticas",
  "Diseño de una propuesta",
  "Comunicación y participación",
  "Evaluación y aprendizajes",
  "Proyecto aplicado",
];

export function lessonsFor(c: Course): Lesson[] {
  return Array.from({ length: c.lessons }, (_, i) => {
    const stage = stages[i % stages.length]!;
    const title = i < stages.length ? stage : `${stage} — parte ${Math.floor(i / stages.length) + 1}`;
    return {
      title,
      minutes: 10 + ((i * 7) % 12),
      video: VIDEO,
      keyNotes: [
        `${stage} es la base para entender "${c.title}".`,
        "Todo liderazgo valiente parte de escuchar a la comunidad y reconocer datos verificables.",
        "Una decisión pública debe tener objetivo, responsable, presupuesto e indicador.",
        "Documenta tus aprendizajes: se convierten en evidencia de tu perfil.",
      ],
      reading: [
        { heading: "Propósito de la lección", body: `En esta lección de la ruta ${c.path} trabajarás "${title}". El objetivo es que puedas explicar la idea central con tus propias palabras, relacionarla con un problema real de tu municipio y proponer una acción concreta. La lectura se organiza en tres momentos: comprender, analizar y aplicar.` },
        { heading: "Comprender", body: "Todo proceso de liderazgo comienza con una pregunta clara: ¿qué problema queremos resolver y a quién afecta? Antes de proponer soluciones, un líder identifica actores, recursos disponibles, normas que aplican y posibles riesgos. Este mapa inicial evita decisiones improvisadas y permite construir confianza con la comunidad." },
        { heading: "Analizar", body: "Con el problema definido, compara al menos dos alternativas. Para cada una, estima costo, tiempo, población beneficiada y efectos no deseados. Pregúntate qué evidencia respalda cada opción y qué información falta. El análisis honesto de ventajas y desventajas es una muestra de ética y responsabilidad pública." },
        { heading: "Aplicar", body: "Redacta en un párrafo una propuesta para tu territorio: problema, alternativa elegida, responsables, primer paso y cómo medirás el avance. Compártela con un compañero y pide retroalimentación. Recuerda: el liderazgo valiente se demuestra en la acción sostenida, no solo en el discurso." },
      ],
      resources: [
        { name: `Guía de lectura — ${title}`, pages: 3 },
        { name: "Ficha de trabajo para el territorio", pages: 2 },
      ],
      question: {
        q: "¿Qué elemento debe tener toda decisión pública según la lección?",
        options: ["Solo un buen discurso", "Objetivo, responsable, presupuesto e indicador", "La aprobación de redes sociales"],
        answer: 1,
      },
    };
  });
}

export function certCode(courseId: string, name: string) {
  let h = 0;
  for (const ch of courseId + name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `CLV-${courseId.slice(0, 3).toUpperCase()}-${h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7)}`;
}

export async function downloadResourcePdf(courseTitle: string, lesson: Lesson, resourceName: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  doc.setFillColor(20, 36, 84); doc.rect(0, 0, W, 28, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(14);
  doc.text("Centro para el Liderazgo Valiente Miguel Uribe Turbay", 15, 13);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.text(courseTitle, 15, 21);
  doc.setTextColor(20, 20, 30); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
  let y = 42;
  for (const l of doc.splitTextToSize(resourceName, 180)) { doc.text(l, 15, y); y += 7; }
  y += 3;
  doc.setFontSize(12); doc.text("Notas clave", 15, y); y += 7;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
  for (const n of lesson.keyNotes) for (const [i, l] of doc.splitTextToSize(n, 172).entries()) { doc.text(i === 0 ? "•" : "", 15, y); doc.text(l, 20, y); y += 5.5; }
  y += 4;
  for (const s of lesson.reading) {
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.text(s.heading, 15, y); y += 6.5;
    doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
    for (const l of doc.splitTextToSize(s.body, 180)) { if (y > 280) { doc.addPage(); y = 20; } doc.text(l, 15, y); y += 5.5; }
    y += 4;
  }
  doc.setFontSize(8); doc.setTextColor(120, 120, 130); doc.text("Material educativo de muestra — liderazgovaliente", 15, 290);
  doc.save(`${resourceName.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").toLowerCase()}.pdf`);
}

export async function downloadCertificatePdf(p: { name: string; course: string; hours: number; code: string; date: string; path: string }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297, H = 210;
  doc.setDrawColor(20, 36, 84); doc.setLineWidth(2); doc.rect(10, 10, W - 20, H - 20);
  doc.setDrawColor(196, 160, 60); doc.setLineWidth(0.6); doc.rect(14, 14, W - 28, H - 28);
  doc.setTextColor(20, 36, 84); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("CENTRO PARA EL LIDERAZGO VALIENTE MIGUEL URIBE TURBAY", W / 2, 34, { align: "center" });
  doc.setFontSize(30); doc.text("Certificado de aprobación", W / 2, 58, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.setTextColor(60, 60, 70);
  doc.text("Se certifica que", W / 2, 76, { align: "center" });
  doc.setFont("helvetica", "bold"); doc.setFontSize(26); doc.setTextColor(20, 20, 30);
  doc.text(p.name, W / 2, 92, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.setTextColor(60, 60, 70);
  doc.text("completó satisfactoriamente el curso", W / 2, 106, { align: "center" });
  doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(30, 80, 200);
  doc.text(p.course, W / 2, 120, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.setTextColor(60, 60, 70);
  doc.text(`Ruta ${p.path} · Intensidad horaria: ${p.hours} horas`, W / 2, 132, { align: "center" });
  doc.text(`Fecha de expedición: ${p.date}`, W / 2, 140, { align: "center" });
  doc.setDrawColor(60, 60, 70); doc.setLineWidth(0.3); doc.line(W / 2 - 40, 165, W / 2 + 40, 165);
  doc.setFontSize(10); doc.text("Dirección académica", W / 2, 171, { align: "center" });
  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(20, 36, 84);
  doc.text(`Código de verificación: ${p.code}`, 24, 186);
  doc.save(`certificado-${p.code}.pdf`);
}
