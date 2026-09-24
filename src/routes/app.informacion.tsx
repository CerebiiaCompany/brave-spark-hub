import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Paperclip, X } from "lucide-react";
import { PageHeader, Panel, Chip, GhostBtn, PrimaryBtn, Bar } from "@/components/ui-kit";

export const Route = createFileRoute("/app/informacion")({
  head: () => ({
    meta: [
      { title: "Laboratorio de Información — Liderazgo Valiente" },
      { name: "description", content: "Investiga afirmaciones, sube soportes y entrena tu criterio frente a la desinformación." },
    ],
  }),
  component: Info,
});

const verdicts = ["Verdadero", "Engañoso", "Falso"];
const questions = [
  ["verdad", "¿Es verdadero?"],
  ["fuente", "¿Qué fuente lo afirma?"],
  ["evidencia", "¿Qué evidencia existe?"],
  ["falta", "¿Qué información falta?"],
  ["otra", "¿Hay otra interpretación?"],
] as const;

type Case = { id: string; topic: string; claim: string; origin: string; verdict: string; explain: string; xp: number };
const cases: Case[] = [
  { id: "n1", topic: "Empleo", claim: "\"El 80% de los jóvenes de la frontera no tiene empleo formal.\"", origin: "Publicación viral en redes", verdict: "Engañoso", explain: "La informalidad juvenil ronda el 60–70%; el dato mezcla desempleo con informalidad.", xp: 60 },
  { id: "n2", topic: "Concejo", claim: "\"El Concejo aprobó eliminar el transporte estudiantil.\"", origin: "Cadena de WhatsApp", verdict: "Falso", explain: "No existe acta ni proyecto aprobado con ese contenido.", xp: 60 },
  { id: "n3", topic: "Instituciones", claim: "\"El Estado colombiano tiene tres ramas del poder público.\"", origin: "Libro de texto", verdict: "Verdadero", explain: "Ejecutiva, legislativa y judicial, más órganos autónomos.", xp: 40 },
  { id: "n4", topic: "Migración", claim: "\"Los migrantes causan la mayoría de los delitos en Cúcuta.\"", origin: "Video en TikTok", verdict: "Falso", explain: "Las cifras oficiales muestran que la gran mayoría de capturas corresponden a nacionales.", xp: 80 },
  { id: "n5", topic: "Educación", claim: "\"La matrícula universitaria gratuita ya aplica para todos.\"", origin: "Titular de portal web", verdict: "Engañoso", explain: "Aplica a instituciones públicas con condiciones; no a todas ni a todos los estudiantes.", xp: 60 },
  { id: "n6", topic: "Elecciones", claim: "\"Se puede votar por internet en las elecciones locales.\"", origin: "Mensaje reenviado", verdict: "Falso", explain: "El voto en Colombia es presencial; la Registraduría no habilita voto electrónico remoto.", xp: 60 },
];

type Work = { answers: Record<string, string>; files: string[]; pick: string | null };

function Info() {
  const [sel, setSel] = useState<string | null>(null);
  const [work, setWork] = useState<Record<string, Work>>({});
  const [filter, setFilter] = useState("Todos");
  const topics = ["Todos", ...Array.from(new Set(cases.map((c) => c.topic)))];
  const solved = cases.filter((c) => work[c.id]?.pick);
  const correct = solved.filter((c) => work[c.id]?.pick === c.verdict).length;

  if (sel) {
    const c = cases.find((x) => x.id === sel)!;
    const w = work[sel] ?? { answers: {}, files: [], pick: null };
    const set = (patch: Partial<Work>) => setWork({ ...work, [sel]: { ...w, ...patch } });
    const filled = questions.filter(([k]) => (w.answers[k] ?? "").trim().length >= 10).length;
    const submit = (v: string) => {
      if (filled < 5) return toast.error("Responde las 5 preguntas de investigación (mín. 10 caracteres)");
      if (w.files.length === 0) return toast.error("Sube al menos un soporte");
      set({ pick: v });
      v === c.verdict ? toast.success(`¡Correcto! +${c.xp} XP`) : toast.error("No es el veredicto correcto. Revisa la explicación.");
    };
    return (
      <div>
        <GhostBtn onClick={() => setSel(null)} className="mb-4">← Volver a los casos</GhostBtn>
        <Panel>
          <div className="flex flex-wrap gap-2"><Chip>{c.topic}</Chip><Chip tone="violet">Origen: {c.origin}</Chip><Chip tone="gold">+{c.xp} XP</Chip></div>
          <p className="mt-4 font-display text-xl font-bold sm:text-2xl">{c.claim}</p>
          <div className="mt-4 flex items-center gap-3 text-sm"><span className="shrink-0 text-muted-foreground">Investigación {filled}/5</span><Bar value={(filled / 5) * 100} /></div>
        </Panel>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Panel>
            <h3 className="font-bold">Preguntas de investigación</h3>
            <div className="mt-4 space-y-4">
              {questions.map(([k, q], i) => (
                <label key={k} className="block">
                  <span className="text-sm font-semibold">{i + 1}. {q}</span>
                  <textarea disabled={!!w.pick} value={w.answers[k] ?? ""} onChange={(e) => set({ answers: { ...w.answers, [k]: e.target.value } })}
                    className="mt-1.5 h-20 w-full rounded-xl border bg-background p-3 text-sm" placeholder="Escribe tu hallazgo..." />
                </label>
              ))}
            </div>
          </Panel>
          <div className="space-y-6">
            <Panel>
              <h3 className="font-bold">Soportes</h3>
              <p className="mt-1 text-xs text-muted-foreground">Capturas, PDF o enlaces que respalden tu investigación.</p>
              <label className="mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed p-5 text-sm text-muted-foreground hover:bg-accent">
                <Upload className="h-5 w-5" />Subir archivo
                <input type="file" multiple className="hidden" disabled={!!w.pick} onChange={(e) => { const f = Array.from(e.target.files ?? []).map((x) => x.name); if (f.length) { set({ files: [...w.files, ...f] }); toast.success(`${f.length} soporte(s) agregado(s)`); } e.target.value = ""; }} />
              </label>
              <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); const i = e.currentTarget.elements.namedItem("url") as HTMLInputElement; if (i.value.startsWith("http")) { set({ files: [...w.files, i.value] }); i.value = ""; } else toast.error("Enlace no válido"); }}>
                <input name="url" placeholder="https://fuente..." className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-2 text-sm" />
                <GhostBtn>Añadir</GhostBtn>
              </form>
              <ul className="mt-3 space-y-2">
                {w.files.map((f, i) => (
                  <li key={f + i} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs">
                    <Paperclip className="h-3.5 w-3.5 shrink-0" /><span className="min-w-0 flex-1 truncate">{f}</span>
                    {!w.pick && <button onClick={() => set({ files: w.files.filter((_, j) => j !== i) })} aria-label="Quitar"><X className="h-3.5 w-3.5" /></button>}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <h3 className="font-bold">Tu veredicto</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {verdicts.map((o) => (
                  <button key={o} onClick={() => !w.pick && submit(o)}
                    className={`rounded-xl border p-3 text-sm font-semibold transition ${w.pick ? (o === c.verdict ? "border-success bg-success/15" : o === w.pick ? "border-coral bg-coral/15" : "opacity-50") : "hover:bg-accent"}`}>{o}</button>
                ))}
              </div>
              {w.pick && <div className="mt-4 rounded-xl bg-secondary p-4"><Chip tone={c.verdict === "Verdadero" ? "success" : c.verdict === "Falso" ? "coral" : "warning"}>{c.verdict}</Chip><p className="mt-2 text-sm">{c.explain}</p></div>}
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Pensamiento crítico" title="Laboratorio de Información" desc="Investiga cada afirmación con 5 preguntas, sube soportes y emite tu veredicto."
        action={<Chip tone="gold">🔎 {correct}/{solved.length} aciertos</Chip>} />
      <div className="mb-5 flex flex-wrap gap-2">
        {topics.map((t) => <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${filter === t ? "bg-primary text-primary-foreground" : "bg-card border"}`}>{t}</button>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cases.filter((c) => filter === "Todos" || c.topic === filter).map((c) => {
          const w = work[c.id];
          return (
            <Panel key={c.id} className="card-hover flex flex-col">
              <div className="flex flex-wrap gap-2"><Chip>{c.topic}</Chip>{w?.pick ? <Chip tone={w.pick === c.verdict ? "success" : "coral"}>{w.pick === c.verdict ? "✓ Resuelto" : "✗ Revisar"}</Chip> : <Chip tone="gold">+{c.xp} XP</Chip>}</div>
              <p className="mt-3 flex-1 font-semibold">{c.claim}</p>
              <p className="mt-2 text-xs text-muted-foreground">Origen: {c.origin}</p>
              <PrimaryBtn className="mt-4" onClick={() => setSel(c.id)}>{w ? "Continuar" : "Investigar"}</PrimaryBtn>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
