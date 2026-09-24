import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { courses, paths } from "@/lib/data";
import { PageHeader, Panel, Bar, Chip, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/formacion")({
  head: () => ({ meta: [{ title: "Mi formación — Liderazgo Valiente" }] }),
  component: Formacion,
});

function Formacion() {
  const [filter, setFilter] = useState("Todas");
  const list = filter === "Todas" ? courses : courses.filter((c) => c.path === filter);
  return (
    <div>
      <PageHeader eyebrow="Rutas y cursos" title="Mi formación" desc="Aprende a tu ritmo. Cada lección suma XP y fortalece tus habilidades." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {paths.map((p) => (
          <Panel key={p.id} className="card-hover">
            <div className="flex items-center gap-3"><span className="text-3xl">{p.emoji}</span><h3 className="text-lg font-bold">{p.title}</h3></div>
            <p className="mt-3 text-sm text-muted-foreground">{p.courses} cursos · {p.projects} proyectos</p>
          </Panel>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {["Todas", "Líder Público", "Líder Empresarial", "Líder de Impacto", "Transversal"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${filter === f ? "bg-primary text-primary-foreground" : "border bg-background hover:bg-accent"}`}>{f}</button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((c) => (
          <Panel key={c.id} className="card-hover flex flex-col">
            <div className="flex gap-2"><Chip>{c.path}</Chip><Chip tone="gold">{c.level}</Chip></div>
            <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.lessons} lecciones · {c.hours} horas</p>
            <div className="mt-5 flex items-center gap-3"><Bar value={c.progress} /><span className="text-sm font-semibold">{c.progress}%</span></div>
            <PrimaryBtn className="mt-5 self-start" onClick={() => toast.success(`+20 XP · Lección de "${c.title}" iniciada`)}>
              {c.progress === 0 ? "Empezar" : c.progress === 100 ? "Repasar" : "Continuar"}
            </PrimaryBtn>
          </Panel>
        ))}
      </div>
    </div>
  );
}
