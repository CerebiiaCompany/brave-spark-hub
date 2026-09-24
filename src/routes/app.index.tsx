import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Star, Award, Rocket, Clock, TrendingUp } from "lucide-react";
import { user, courses, challenges, activities, skills, badges, levels } from "@/lib/data";
import { Panel, Bar, Stat } from "@/components/ui-kit";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Inicio — Liderazgo Valiente" }] }),
  component: Dashboard,
});

function Dashboard() {
  const current = courses[0]!;
  return (
    <div className="space-y-6">
      <Panel className="relative overflow-hidden bg-navy p-8 text-navy-foreground">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-navy-foreground/70">Hola, {user.first} 👋</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">Tu liderazgo está avanzando.</h1>
            <p className="mt-4 text-sm text-navy-foreground/70">Nivel {user.level} · {user.levelName} → siguiente: {levels[user.level]}</p>
            <div className="mt-2 h-2.5 max-w-md overflow-hidden rounded-full bg-navy-foreground/15">
              <div className="h-full rounded-full bg-bright" style={{ width: `${user.levelProgress}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <Flame className="h-8 w-8 text-coral" />
            <div><p className="font-display text-2xl font-bold">{user.streak} días</p><p className="text-sm text-navy-foreground/70">de racha</p></div>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        <Stat label="Nivel" value={user.level} icon={<Star className="h-4 w-4" />} />
        <Stat label="XP" value={user.xp.toLocaleString("es-CO")} icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Racha" value={`🔥 ${user.streak}`} />
        <Stat label="Progreso" value={`${user.progress}%`} />
        <Stat label="Insignias" value={user.badges} icon={<Award className="h-4 w-4" />} />
        <Stat label="Proyectos" value={user.projects} icon={<Rocket className="h-4 w-4" />} />
        <Stat label="Horas" value={`${user.hours}h`} icon={<Clock className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Continúa</p>
          <h2 className="mt-2 text-2xl font-bold">{current.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Módulo 4 · Diseño de la agenda pública</p>
          <div className="mt-5 flex items-center gap-4"><Bar value={current.progress} /><span className="text-sm font-semibold">{current.progress}%</span></div>
          <Link to="/app/formacion" className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-bright">Continuar</Link>
        </Panel>
        <Panel>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Tu próxima sesión</p>
          <p className="mt-3 text-3xl">🏛️</p>
          <h3 className="mt-2 text-lg font-bold">Concejo Simulado</h3>
          <p className="text-sm text-muted-foreground">Hoy · 6:00 PM</p>
          <Link to="/app/congreso" className="mt-5 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-accent">Entrar a la sala</Link>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel>
          <div className="flex items-center justify-between"><h3 className="font-bold">Mis retos</h3><Link to="/app/retos" className="text-sm font-semibold text-primary">Ver todos</Link></div>
          <div className="mt-4 space-y-4">
            {challenges.slice(0, 3).map((c) => (
              <div key={c.id}>
                <p className="text-sm font-medium">{c.title}</p>
                <div className="mt-2 flex items-center gap-3"><Bar value={c.progress} /><span className="text-xs font-semibold text-primary">+{c.xp}</span></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between"><h3 className="font-bold">Habilidades</h3><Link to="/app/logros" className="text-sm font-semibold text-primary">Ver árbol</Link></div>
          <div className="mt-4 space-y-3">
            {skills.slice(0, 4).map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm"><span>{s.name}</span><span className="font-semibold">{s.value}</span></div>
                <Bar value={s.value} className="mt-1.5" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold">Próximas actividades</h3>
          <div className="mt-4 space-y-3">
            {activities.map((a) => (
              <div key={a.title} className="flex gap-3 rounded-xl bg-secondary p-3">
                <span className="text-xl">{a.type}</span>
                <div><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-muted-foreground">{a.when}</p></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <h3 className="font-bold">Logros recientes</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {badges.filter((b) => b.earned).slice(0, 5).map((b) => (
            <div key={b.name} className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-semibold">{b.emoji} {b.name}</div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
