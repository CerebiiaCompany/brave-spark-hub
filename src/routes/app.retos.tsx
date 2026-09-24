import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { challenges } from "@/lib/data";
import { PageHeader, Panel, Chip, Bar, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/retos")({
  head: () => ({ meta: [{ title: "Retos de Zona de Frontera — Liderazgo Valiente" }] }),
  component: Retos,
});

function Retos() {
  return (
    <div>
      <PageHeader eyebrow="Retos territoriales" title="Retos de Zona de Frontera" desc="Problemas reales del territorio binacional. Forma un equipo, propone y gana XP." />
      <Panel className="mb-6 bg-navy text-navy-foreground">
        <p className="text-sm text-navy-foreground/70">Reto de la semana</p>
        <h2 className="mt-1 text-2xl font-bold">{challenges[0].title}</h2>
        <p className="mt-2 text-sm text-navy-foreground/70">{challenges[0].teams} equipos participando · cierra {challenges[0].deadline} · +{challenges[0].xp} XP</p>
      </Panel>
      <div className="grid gap-5 md:grid-cols-2">
        {challenges.map((c) => (
          <Panel key={c.id} className="card-hover">
            <div className="flex justify-between"><Chip tone={c.zone === "Frontera" ? "coral" : c.zone === "Social" ? "violet" : "success"}>{c.zone}</Chip><span className="text-sm font-bold text-primary">+{c.xp} XP</span></div>
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.teams} equipos · cierra {c.deadline}</p>
            {c.progress > 0 && <div className="mt-4 flex items-center gap-3"><Bar value={c.progress} /><span className="text-xs font-semibold">{c.progress}%</span></div>}
            <PrimaryBtn className="mt-5" onClick={() => toast.success("Te uniste al reto")}>{c.progress > 0 ? "Continuar" : "Unirme al reto"}</PrimaryBtn>
          </Panel>
        ))}
      </div>
    </div>
  );
}
