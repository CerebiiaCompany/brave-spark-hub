import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { paths } from "@/lib/data";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { PageHeader, Panel, Bar, GhostBtn, PrimaryBtn, Chip } from "@/components/ui-kit";

export const Route = createFileRoute("/app/diagnostico")({
  head: () => ({ meta: [
    { title: "Diagnóstico de liderazgo — Liderazgo Valiente" }, { name: "description", content: "Diagnóstico interactivo para descubrir fortalezas y una ruta de liderazgo recomendada." },
    { property: "og:title", content: "Diagnóstico de liderazgo — Liderazgo Valiente" }, { property: "og:description", content: "Descubre fortalezas y una ruta de aprendizaje recomendada." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Diagnostico,
});

const qs = [
  { q: "Cuando ves un problema en tu barrio, ¿qué haces primero?", a: [["Busco a la autoridad responsable y propongo una solución", 0], ["Pienso si puedo crear un servicio que lo resuelva", 1], ["Reúno a vecinos para actuar juntos", 2]] },
  { q: "¿Qué te gustaría lograr en 10 años?", a: [["Ocupar un cargo público", 0], ["Tener mi propia empresa", 1], ["Dirigir una organización social", 2]] },
  { q: "En un equipo, normalmente tú...", a: [["Negocias acuerdos entre posiciones", 0], ["Propones ideas nuevas y riesgosas", 1], ["Cuidas que todos participen", 2]] },
  { q: "¿Qué tema te apasiona más?", a: [["Leyes y políticas públicas", 0], ["Innovación y negocios", 1], ["Comunidades y medio ambiente", 2]] },
  { q: "¿Cómo prefieres aprender?", a: [["Debatiendo", 0], ["Construyendo prototipos", 1], ["Trabajando en campo", 2]] },
] as const;

function Diagnostico() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const score = [0, 1, 2].map((i) => answers.filter((a) => a === i).length);
  const done = step >= qs.length;
  const next = () => { if (selected === null) return; setAnswers([...answers.slice(0, step), selected]); setStep(step + 1); setSelected(answers[step + 1] ?? null); };
  const best = score.indexOf(Math.max(...score));
  const bp = paths[best]!;
  const q = qs[Math.min(step, qs.length - 1)]!;
  return (
    <div>
      <PageHeader eyebrow="Diagnóstico de liderazgo" title="Descubre tu perfil de líder" desc="Responde 5 preguntas y te recomendaremos la ruta ideal para ti." />
      <Panel className="mx-auto max-w-2xl">
        {!done ? (
          <>
            <div className="flex items-center gap-3"><Bar value={(step / qs.length) * 100} /><span className="text-xs font-bold">{Math.round((step / qs.length) * 100)}%</span></div>
            <p className="mt-6 text-xs font-semibold text-muted-foreground">Pregunta {step + 1} de {qs.length}</p>
            <h2 className="mt-2 text-2xl font-bold">{q.q}</h2>
            <div className="mt-6 space-y-3">
              {q.a.map(([t, i]) => (
                <button key={t} onClick={() => setSelected(i)} className={`grid min-h-14 w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border p-4 text-left font-medium transition hover:border-primary hover:bg-accent ${selected === i ? "border-primary bg-accent" : ""}`}><span className={`grid h-6 w-6 place-items-center rounded-full border ${selected === i ? "border-primary bg-primary text-primary-foreground" : ""}`}>{selected === i ? <CheckCircle2 className="h-4 w-4" /> : String.fromCharCode(65 + i)}</span>{t}</button>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <GhostBtn disabled={step === 0} onClick={() => { const prev = step - 1; setStep(prev); setSelected(answers[prev] ?? null); }}><ArrowLeft className="h-4 w-4" /> Atrás</GhostBtn>
              <PrimaryBtn disabled={selected === null} onClick={next}>Siguiente <ArrowRight className="h-4 w-4" /></PrimaryBtn>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-6xl">{bp.emoji}</p>
            <p className="mt-4 text-sm font-semibold text-primary">Tu perfil predominante</p>
            <h2 className="mt-1 text-3xl font-bold">{bp.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">{bp.desc}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">{bp.skills.map((skill) => <Chip key={skill} tone="success">{skill}</Chip>)}</div>
            <div className="mx-auto mt-6 max-w-sm space-y-3 text-left">
              {paths.map((p, i) => (
                <div key={p.id}><div className="flex justify-between text-sm"><span>{p.title}</span><span className="font-semibold">{Math.round(((score[i] ?? 0) / qs.length) * 100)}%</span></div><Bar value={((score[i] ?? 0) / qs.length) * 100} className="mt-1" /></div>
              ))}
            </div>
            <div className="mt-7 rounded-xl bg-secondary p-4 text-left"><p className="text-sm font-bold">Tu siguiente paso</p><p className="mt-1 text-sm text-muted-foreground">Comienza una lección de tu ruta recomendada y gana tus primeros 20 XP.</p></div>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/app/formacion" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-bright">Ver mi ruta</Link>
              <GhostBtn onClick={() => { setStep(0); setAnswers([]); setSelected(null); }}><RotateCcw className="h-4 w-4" /> Repetir</GhostBtn>
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
