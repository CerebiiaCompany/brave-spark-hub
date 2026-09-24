import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Award, BookOpen, CheckCircle2, ChevronLeft, Clock, Download, FileText, Lightbulb, LockKeyhole, PlayCircle, X } from "lucide-react";
import { courses, paths } from "@/lib/data";
import { lessonsFor, downloadResourcePdf, type Course } from "@/lib/course-content";
import { CertificateModal } from "@/components/Certificate";
import { PageHeader, Panel, Bar, Chip, PrimaryBtn, GhostBtn } from "@/components/ui-kit";

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
      {selected && <CourseViewer course={selected} start={lesson} onClose={() => setSelected(null)} onCert={() => setCert(selected)} />}
      {cert && <CertificateModal course={cert} onClose={() => setCert(null)} />}
    </div>
  );
}

function CourseViewer({ course, start, onClose, onCert }: { course: Course; start: number; onClose: () => void; onCert: () => void }) {
  const lessons = useMemo(() => lessonsFor(course), [course]);
  const [done, setDone] = useState(Math.min(start, course.lessons));
  const [cur, setCur] = useState(Math.min(start, course.lessons - 1));
  const [tab, setTab] = useState<"notas" | "lectura" | "recursos">("notas");
  const [pick, setPick] = useState<number | null>(null);
  const l = lessons[cur]!;
  const finished = done >= course.lessons;
  const complete = () => {
    if (pick !== l.question.answer) { toast.error("Revisa la pregunta de comprensión"); return; }
    if (cur >= done) { setDone(cur + 1); toast.success("Lección completada · +20 XP"); }
    setPick(null);
    if (cur + 1 < course.lessons) setCur(cur + 1);
    else toast.success("¡Curso aprobado! Tu certificado está listo");
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-navy/40 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Curso ${course.title}`}>
      <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-background p-4 shadow-lift sm:max-w-6xl sm:rounded-2xl sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
          <div className="min-w-0"><Chip>{course.path}</Chip><h2 className="mt-2 text-xl font-bold sm:text-2xl">{course.title}</h2><p className="mt-1 text-sm text-muted-foreground">{course.lessons} lecciones · {course.hours} horas · +{course.lessons * 20} XP</p></div>
          <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-accent" aria-label="Cerrar curso"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-4 flex items-center gap-3"><Bar value={(done / course.lessons) * 100} /><span className="text-sm font-bold">{done}/{course.lessons}</span></div>
        {finished && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-success/40 bg-success/10 p-4 sm:flex-row sm:items-center">
            <Award className="h-7 w-7 text-success" /><p className="flex-1 text-sm font-semibold">Aprobaste el curso. Descarga tu certificado oficial con código de verificación.</p>
            <PrimaryBtn onClick={onCert}>Ver certificado</PrimaryBtn>
          </div>
        )}
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <video key={cur} src={l.video} controls playsInline className="aspect-video w-full rounded-xl bg-navy" aria-label={`Video: ${l.title}`} />
            <p className="mt-1 text-xs text-muted-foreground">Video de muestra — se reemplazará por la clase oficial.</p>
            <h3 className="mt-4 text-lg font-bold">{cur + 1}. {l.title}</h3>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {([["notas", "Notas clave", Lightbulb], ["lectura", "Lectura", BookOpen], ["recursos", "Recursos PDF", FileText]] as const).map(([k, label, Icon]) => (
                <button key={k} onClick={() => setTab(k)} className={`flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold ${tab === k ? "bg-primary text-primary-foreground" : "border hover:bg-accent"}`}><Icon className="h-4 w-4" />{label}</button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border p-4">
              {tab === "notas" && <ul className="space-y-2">{l.keyNotes.map((n) => <li key={n} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{n}</li>)}</ul>}
              {tab === "lectura" && <article className="space-y-4">{l.reading.map((s) => <section key={s.heading}><h4 className="font-bold">{s.heading}</h4><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p></section>)}</article>}
              {tab === "recursos" && <div className="space-y-2">{l.resources.map((r) => (
                <div key={r.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-secondary p-3">
                  <FileText className="h-5 w-5 text-coral" /><div className="min-w-0"><p className="truncate text-sm font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">PDF · {r.pages} págs.</p></div>
                  <GhostBtn onClick={() => downloadResourcePdf(course.title, l, r.name)} aria-label={`Descargar ${r.name}`}><Download className="h-4 w-4" /></GhostBtn>
                </div>))}</div>}
            </div>
            <div className="mt-4 rounded-xl bg-secondary p-4">
              <p className="text-sm font-bold">Pregunta de comprensión</p><p className="mt-1 text-sm">{l.question.q}</p>
              <div className="mt-3 space-y-2">{l.question.options.map((o, i) => <button key={o} onClick={() => setPick(i)} className={`w-full rounded-lg border p-3 text-left text-sm ${pick === i ? "border-primary bg-accent font-semibold" : "bg-background"}`}>{o}</button>)}</div>
              <PrimaryBtn className="mt-3 w-full sm:w-auto" onClick={complete} disabled={pick === null}>{cur < done ? "Siguiente lección" : "Completar lección"}</PrimaryBtn>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Contenido del curso</h3>
            <div className="mt-3 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {lessons.map((x, i) => (
                <button key={i} disabled={i > done} onClick={() => { setCur(i); setPick(null); }} className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 text-left disabled:opacity-60 ${i === cur ? "border-primary bg-accent" : "bg-background"}`}>
                  {i < done ? <CheckCircle2 className="h-5 w-5 text-success" /> : i === done ? <PlayCircle className="h-5 w-5 text-primary" /> : <LockKeyhole className="h-4 w-4 text-muted-foreground" />}
                  <span className="min-w-0 text-sm font-medium">{i + 1}. {x.title}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{x.minutes}m</span>
                </button>
              ))}
            </div>
            <GhostBtn className="mt-3 w-full" onClick={onClose}><ChevronLeft className="h-4 w-4" /> Volver a cursos</GhostBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
