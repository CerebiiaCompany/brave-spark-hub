import { createFileRoute } from "@tanstack/react-router";
import { badges, skills, levels, user, demoUsers } from "@/lib/data";
import { PageHeader, Panel, Bar } from "@/components/ui-kit";

export const Route = createFileRoute("/app/logros")({
  head: () => ({ meta: [{ title: "Mis logros — Liderazgo Valiente" }] }),
  component: Logros,
});

const tone: Record<string, string> = {
  gold: "bg-gold/20", warning: "bg-warning/15", success: "bg-success/15", primary: "bg-accent", coral: "bg-coral/15", violet: "bg-violet/15", muted: "bg-secondary grayscale opacity-50",
};

function Logros() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Gamificación" title="Mis logros" desc={`${user.badges} insignias · Nivel ${user.level} · ${user.xp.toLocaleString("es-CO")} XP`} />
      <Panel>
        <h3 className="font-bold">Niveles</h3>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {levels.map((l, i) => (
            <div key={l} className={`min-w-[120px] rounded-xl border p-3 text-center ${i + 1 === user.level ? "border-primary bg-accent" : i + 1 < user.level ? "bg-secondary" : "opacity-50"}`}>
              <p className="font-display text-lg font-bold">{i + 1}</p><p className="text-xs font-medium">{l}</p>
            </div>
          ))}
        </div>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <h3 className="font-bold">Insignias</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {badges.map((b) => (
              <div key={b.name} className={`card-hover rounded-2xl p-4 text-center ${tone[b.tone]}`}>
                <p className="text-3xl">{b.emoji}</p>
                <p className="mt-2 text-sm font-bold">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold">Ranking semanal</h3>
          <ol className="mt-4 space-y-2">
            {demoUsers.map((u, i) => (
              <li key={u.name} className={`flex items-center gap-3 rounded-xl p-3 ${i === 0 ? "bg-accent" : ""}`}>
                <span className="w-6 font-display font-bold">{["🥇", "🥈", "🥉"][i] ?? i + 1}</span>
                <div className="flex-1"><p className="text-sm font-semibold">{u.name}</p><p className="text-xs text-muted-foreground">{u.role} · {u.city}</p></div>
                <span className="text-sm font-bold text-primary">{u.xp}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <Panel>
        <h3 className="font-bold">Árbol de habilidades</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm"><span className="font-medium">{s.name}</span><span className="font-bold">{s.value}/100</span></div>
              <Bar value={s.value} className="mt-2" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
