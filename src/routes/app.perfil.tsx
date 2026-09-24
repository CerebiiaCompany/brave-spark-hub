import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Award, BookOpen, CalendarDays, Edit3, FileCheck2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { user, badges, skills, projects, courses, activities } from "@/lib/data";
import { Panel, Bar, Chip, GhostBtn } from "@/components/ui-kit";
import { CertificateModal, certData } from "@/components/Certificate";
import type { Course } from "@/lib/course-content";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({ meta: [
    { title: "Mi perfil de liderazgo — Liderazgo Valiente" }, { name: "description", content: "Trayectoria, habilidades, proyectos y evidencias del perfil de liderazgo." },
    { property: "og:title", content: "Mi perfil de liderazgo — Liderazgo Valiente" }, { property: "og:description", content: "Trayectoria, habilidades, proyectos y evidencias de liderazgo." },
    { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Perfil,
});

function Perfil() {
  const [cert, setCert] = useState<Course | null>(null);
  return (
    <div className="space-y-6">
      <Panel className="overflow-hidden p-0">
        <div className="h-28 bg-navy bg-grid" />
        <div className="-mt-10 grid grid-cols-[auto_minmax(0,1fr)] gap-4 px-4 pb-6 sm:px-6 md:flex md:items-end">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-card bg-primary font-display text-2xl font-bold text-primary-foreground">MG</div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" /> <span className="truncate">{user.role} · {user.city}</span></p>
          </div>
          <div className="col-span-2 flex flex-wrap gap-2 md:ml-auto"><Chip>Nivel {user.level} · {user.levelName}</Chip><Chip tone="gold">{user.xp} XP</Chip><GhostBtn className="w-full sm:w-auto" onClick={() => toast.info("Edición de perfil habilitada en modo demostración")}><Edit3 className="h-4 w-4" /> Editar perfil</GhostBtn></div>
        </div>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <h3 className="font-bold">Sobre mí</h3>
          <p className="mt-2 text-sm text-muted-foreground">Estudiante de Ciencia Política. Me interesa el empleo juvenil y la integración en la frontera. Concejal simulada con 6 sesiones y autora de EmpleaJoven Cúcuta.</p>
          <h3 className="mt-6 font-bold">Proyectos</h3>
          <div className="mt-3 space-y-2">
            {projects.filter((p) => p.author === user.name).map((p) => <div key={p.title} className="rounded-xl bg-secondary p-3 text-sm font-semibold">{p.title} · <span className="font-normal text-muted-foreground">{p.stage}</span></div>)}
          </div>
          <h3 className="mt-6 flex items-center gap-2 font-bold"><FileCheck2 className="h-5 w-5 text-primary" /> Certificados</h3>
          <div className="mt-3 space-y-2">
            {courses.filter((c) => c.progress === 100).map((c) => { const d = certData(c); return (
              <div key={c.id} className="grid gap-3 rounded-xl border p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0"><p className="text-sm font-semibold">🎓 {c.title}</p><p className="text-xs text-muted-foreground">{c.hours} h · {d.date} · <span className="font-mono">{d.code}</span></p></div>
                <GhostBtn onClick={() => setCert(c)}>Ver, descargar o compartir</GhostBtn>
              </div>); })}
          </div>
          {cert && <CertificateModal course={cert} onClose={() => setCert(null)} />}
        </Panel>
        <Panel>
          <h3 className="font-bold">Habilidades principales</h3>
          <div className="mt-4 space-y-3">
            {[...skills].sort((a, b) => b.value - a.value).slice(0, 5).map((s) => (
              <div key={s.name}><div className="flex justify-between text-sm"><span>{s.name}</span><span className="font-semibold">{s.value}</span></div><Bar value={s.value} className="mt-1" /></div>
            ))}
          </div>
          <h3 className="mt-6 font-bold">Insignias</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-2xl">{badges.filter((b) => b.earned).map((b) => <span key={b.name} title={b.name}>{b.emoji}</span>)}</div>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel><h3 className="flex items-center gap-2 font-bold"><CalendarDays className="h-5 w-5 text-primary" /> Actividad reciente</h3><div className="mt-4 space-y-3">{activities.slice(0,3).map((a) => <div key={a.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl bg-secondary p-3"><span className="text-xl">{a.type}</span><div><p className="text-sm font-semibold">{a.title}</p><p className="text-xs text-muted-foreground">{a.when}</p></div></div>)}</div></Panel>
        <Panel><h3 className="flex items-center gap-2 font-bold"><Award className="h-5 w-5 text-primary" /> Evidencias de liderazgo</h3><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-secondary p-4"><BookOpen className="h-5 w-5 text-primary" /><p className="mt-2 text-2xl font-bold">7</p><p className="text-xs text-muted-foreground">entregas verificadas</p></div><div className="rounded-xl bg-secondary p-4"><FileCheck2 className="h-5 w-5 text-primary" /><p className="mt-2 text-2xl font-bold">3</p><p className="text-xs text-muted-foreground">certificados</p></div></div><GhostBtn className="mt-4 w-full" onClick={() => toast.info("Portafolio preparado para compartir")}>Compartir portafolio</GhostBtn></Panel>
      </div>
    </div>
  );
}
