import { createFileRoute } from "@tanstack/react-router";
import { user, badges, skills, projects, courses } from "@/lib/data";
import { Panel, Bar, Chip } from "@/components/ui-kit";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({ meta: [{ title: "Mi perfil — Liderazgo Valiente" }] }),
  component: Perfil,
});

function Perfil() {
  return (
    <div className="space-y-6">
      <Panel className="overflow-hidden p-0">
        <div className="h-28 bg-navy bg-grid" />
        <div className="-mt-10 flex flex-col gap-4 px-6 pb-6 md:flex-row md:items-end">
          <div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-card bg-primary font-display text-2xl font-bold text-primary-foreground">MG</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.role} · {user.city}</p>
          </div>
          <div className="flex gap-2"><Chip>Nivel {user.level} · {user.levelName}</Chip><Chip tone="gold">{user.xp} XP</Chip></div>
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
          <h3 className="mt-6 font-bold">Certificados</h3>
          <div className="mt-3 space-y-2">
            {courses.filter((c) => c.progress === 100).map((c) => <div key={c.id} className="rounded-xl border p-3 text-sm">🎓 {c.title}</div>)}
          </div>
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
    </div>
  );
}
