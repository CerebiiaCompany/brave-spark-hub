import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, CheckCircle2, ChevronLeft, Clock, LockKeyhole, PlayCircle, X } from "lucide-react";
import { courses, paths } from "@/lib/data";
import { PageHeader, Panel, Bar, Chip, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/formacion")({
  head: () => ({ meta: [
    { title: "Mi formación — Liderazgo Valiente" }, { name: "description", content: "Rutas, cursos y lecciones para fortalecer capacidades de liderazgo." },
    { property: "og:title", content: "Mi formación — Liderazgo Valiente" }, { property: "og:description", content: "Rutas, cursos y lecciones para fortalecer capacidades de liderazgo." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Formacion,
});

function Formacion() {
  const [filter, setFilter] = useState("Todas");
  const [selected, setSelected] = useState<(typeof courses)[number] | null>(null);
  const [lesson, setLesson] = useState(0);
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
      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {["Todas", "Líder Público", "Líder Empresarial", "Líder de Impacto", "Transversal"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`min-h-10 shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${filter === f ? "bg-primary text-primary-foreground" : "border bg-background hover:bg-accent"}`}>{f}</button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((c) => (
          <Panel key={c.id} className="card-hover flex flex-col">
            <div className="flex gap-2"><Chip>{c.path}</Chip><Chip tone="gold">{c.level}</Chip></div>
            <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.lessons} lecciones · {c.hours} horas</p>
            <div className="mt-5 flex items-center gap-3"><Bar value={c.progress} /><span className="text-sm font-semibold">{c.progress}%</span></div>
            <PrimaryBtn className="mt-5 w-full sm:w-auto sm:self-start" onClick={() => { setSelected(c); setLesson(Math.floor(c.progress / Math.max(1, 100 / c.lessons))); }}>
              {c.progress === 0 ? "Empezar" : c.progress === 100 ? "Repasar" : "Continuar"}
            </PrimaryBtn>
          </Panel>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-[60] flex items-end bg-navy/40 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Curso ${selected.title}`}>
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-background p-5 shadow-lift sm:max-w-3xl sm:rounded-2xl sm:p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
              <div className="min-w-0"><Chip>{selected.path}</Chip><h2 className="mt-3 text-2xl font-bold">{selected.title}</h2><p className="mt-2 text-sm text-muted-foreground">{selected.lessons} lecciones · {selected.hours} horas · +{selected.lessons * 20} XP</p></div>
              <button onClick={() => setSelected(null)} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg hover:bg-accent" aria-label="Cerrar curso"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <div className="flex items-center gap-3"><Bar value={Math.max(selected.progress, (lesson / selected.lessons) * 100)} /><span className="text-sm font-bold">{lesson}/{selected.lessons}</span></div>
                <h3 className="mt-6 font-bold">Contenido del curso</h3>
                <div className="mt-3 space-y-2">
                  {Array.from({ length: Math.min(selected.lessons, 6) }, (_, i) => {
                    const complete = i < lesson;
                    const active = i === lesson;
                    return <button key={i} disabled={i > lesson} onClick={() => setLesson(i)} className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 text-left ${active ? "border-primary bg-accent" : "bg-background"}`}>
                      {complete ? <CheckCircle2 className="h-5 w-5 text-success" /> : active ? <PlayCircle className="h-5 w-5 text-primary" /> : <LockKeyhole className="h-4 w-4 text-muted-foreground" />}
                      <span className="min-w-0 text-sm font-medium">{i + 1}. {i === 0 ? "Conceptos esenciales" : i === 1 ? "Caso del territorio" : i === 2 ? "Herramientas prácticas" : `Lección aplicada ${i + 1}`}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> 12 min</span>
                    </button>;
                  })}
                </div>
              </div>
              <div className="rounded-xl bg-secondary p-4">
                <BookOpen className="h-7 w-7 text-primary" /><h3 className="mt-3 font-bold">Tu próxima lección</h3>
                <p className="mt-1 text-sm text-muted-foreground">Completa la actividad y responde una pregunta para avanzar.</p>
                <PrimaryBtn className="mt-5 w-full" onClick={() => { setLesson((v) => Math.min(selected.lessons, v + 1)); toast.success("Lección completada · +20 XP"); }} disabled={lesson >= selected.lessons}>Completar lección</PrimaryBtn>
                <GhostBtn className="mt-2 w-full" onClick={() => setSelected(null)}><ChevronLeft className="h-4 w-4" /> Volver a cursos</GhostBtn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
