import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { newsItems } from "@/lib/data";
import { PageHeader, Panel, Chip, GhostBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/informacion")({
  head: () => ({ meta: [{ title: "Laboratorio de Información — Liderazgo Valiente" }] }),
  component: Info,
});

const options = ["Verdadero", "Engañoso", "Falso"];

function Info() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const item = newsItems[Math.min(i, newsItems.length - 1)]!;
  const done = i >= newsItems.length;
  const choose = (o: string) => {
    if (pick) return;
    setPick(o);
    if (o === item.verdict) { setScore(score + 1); toast.success("¡Correcto! +30 XP"); }
  };
  return (
    <div>
      <PageHeader eyebrow="Pensamiento crítico" title="Laboratorio de Información" desc="¿Verdadero, engañoso o falso? Entrena tu criterio frente a la desinformación." />
      <Panel className="mx-auto max-w-2xl">
        {done ? (
          <div className="py-8 text-center">
            <p className="text-5xl">🔎</p>
            <h2 className="mt-4 text-2xl font-bold">Acertaste {score} de {newsItems.length}</h2>
            <GhostBtn className="mt-6" onClick={() => { setI(0); setScore(0); setPick(null); }}>Intentar de nuevo</GhostBtn>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold text-muted-foreground">Afirmación {i + 1} de {newsItems.length}</p>
            <p className="mt-4 font-display text-2xl font-bold">{item.claim}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {options.map((o) => (
                <button key={o} onClick={() => choose(o)}
                  className={`rounded-xl border p-4 font-semibold transition ${pick ? (o === item.verdict ? "border-success bg-success/15" : o === pick ? "border-coral bg-coral/15" : "opacity-50") : "hover:bg-accent"}`}>{o}</button>
              ))}
            </div>
            {pick && (
              <div className="mt-6 rounded-xl bg-secondary p-4">
                <Chip tone={item.verdict === "Verdadero" ? "success" : item.verdict === "Falso" ? "coral" : "warning"}>{item.verdict}</Chip>
                <p className="mt-2 text-sm">{item.explain}</p>
                <GhostBtn className="mt-4" onClick={() => { setI(i + 1); setPick(null); }}>Siguiente</GhostBtn>
              </div>
            )}
          </>
        )}
      </Panel>
    </div>
  );
}
