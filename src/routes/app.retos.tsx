import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { challenges } from "@/lib/data";
import { PageHeader, Panel, Chip, Bar, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/retos")({
  head: () => ({ meta: [
    { title: "Retos territoriales — Liderazgo Valiente" }, { name: "description", content: "Retos colaborativos para proponer soluciones a desafíos de la zona de frontera." },
    { property: "og:title", content: "Retos territoriales — Liderazgo Valiente" }, { property: "og:description", content: "Soluciones colaborativas para desafíos de la zona de frontera." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Retos,
});

function Retos() {
  const [joined, setJoined] = useState<number[]>(challenges.filter((c) => c.progress > 0).map((c) => c.id));
  const [filter, setFilter] = useState("Todos");
  const zones = ["Todos", ...Array.from(new Set(challenges.map((c) => c.zone)))];
  return (
    <div>
      <PageHeader eyebrow="Retos territoriales" title="Retos de Zona de Frontera" desc="Problemas reales del territorio binacional. Forma un equipo, propone y gana XP." />
      <Panel className="mb-6 bg-navy text-navy-foreground">
        <p className="text-sm text-navy-foreground/70">Reto de la semana</p>
        <h2 className="mt-1 text-2xl font-bold">{challenges[0]!.title}</h2>
        <p className="mt-2 text-sm text-navy-foreground/70">{challenges[0]!.teams} equipos participando · cierra {challenges[0]!.deadline} · +{challenges[0]!.xp} XP</p>
      </Panel>
      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">{zones.map((z) => <button key={z} onClick={() => setFilter(z)} className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${filter === z ? "bg-primary text-primary-foreground" : "border bg-background"}`}>{z}</button>)}</div>
      <div className="grid gap-5 md:grid-cols-2">
        {challenges.filter((c) => filter === "Todos" || c.zone === filter).map((c) => (
          <Panel key={c.id} className="card-hover">
            <div className="flex justify-between"><Chip tone={c.zone === "Frontera" ? "coral" : c.zone === "Social" ? "violet" : "success"}>{c.zone}</Chip><span className="text-sm font-bold text-primary">+{c.xp} XP</span></div>
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.teams} equipos</span><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Cierra {c.deadline}</span></div>
            {c.progress > 0 && <div className="mt-4 flex items-center gap-3"><Bar value={c.progress} /><span className="text-xs font-semibold">{c.progress}%</span></div>}
            <PrimaryBtn className="mt-5 w-full sm:w-auto" onClick={() => { if (!joined.includes(c.id)) { setJoined([...joined, c.id]); toast.success("Te uniste al reto · +20 XP"); } else toast.info("Abriendo el espacio de trabajo del equipo"); }}>{joined.includes(c.id) ? <><CheckCircle2 className="h-4 w-4" /> Continuar reto</> : "Unirme al reto"}</PrimaryBtn>
          </Panel>
        ))}
      </div>
    </div>
  );
}
