import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { paths } from "@/lib/data";
import { PageHeader, Panel, Bar, GhostBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/diagnostico")({
  head: () => ({ meta: [{ title: "Diagnóstico de liderazgo — Liderazgo Valiente" }] }),
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
  const [score, setScore] = useState([0, 0, 0]);
  const done = step >= qs.length;
  const answer = (i: number) => { const s = [...score]; s[i]++; setScore(s); setStep(step + 1); };
  const best = score.indexOf(Math.max(...score));
  return (
    <div>
      <PageHeader eyebrow="Diagnóstico de liderazgo" title="Descubre tu perfil de líder" desc="Responde 5 preguntas y te recomendaremos la ruta ideal para ti." />
      <Panel className="mx-auto max-w-2xl">
        {!done ? (
          <>
            <Bar value={(step / qs.length) * 100} />
            <p className="mt-6 text-xs font-semibold text-muted-foreground">Pregunta {step + 1} de {qs.length}</p>
            <h2 className="mt-2 text-2xl font-bold">{qs[step].q}</h2>
            <div className="mt-6 space-y-3">
              {qs[step].a.map(([t, i]) => (
                <button key={t} onClick={() => answer(i)} className="w-full rounded-xl border p-4 text-left font-medium transition hover:border-primary hover:bg-accent">{t}</button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-6xl">{paths[best].emoji}</p>
            <p className="mt-4 text-sm font-semibold text-primary">Tu perfil predominante</p>
            <h2 className="mt-1 text-3xl font-bold">{paths[best].title}</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">{paths[best].desc}</p>
            <div className="mx-auto mt-6 max-w-sm space-y-3 text-left">
              {paths.map((p, i) => (
                <div key={p.id}><div className="flex justify-between text-sm"><span>{p.title}</span><span className="font-semibold">{Math.round((score[i] / qs.length) * 100)}%</span></div><Bar value={(score[i] / qs.length) * 100} className="mt-1" /></div>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/app/formacion" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-bright">Ver mi ruta</Link>
              <GhostBtn onClick={() => { setStep(0); setScore([0, 0, 0]); }}>Repetir</GhostBtn>
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
