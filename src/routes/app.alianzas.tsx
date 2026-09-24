import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Bookmark, CalendarDays, CheckCircle2 } from "lucide-react";
import { allies, opportunities } from "@/lib/data";
import { PageHeader, Panel, Chip, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/alianzas")({
  head: () => ({ meta: [
    { title: "Alianzas y oportunidades — Liderazgo Valiente" }, { name: "description", content: "Becas, prácticas, mentorías y financiación para jóvenes líderes." },
    { property: "og:title", content: "Alianzas y oportunidades — Liderazgo Valiente" }, { property: "og:description", content: "Becas, prácticas, mentorías y financiación para jóvenes líderes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Alianzas,
});

function Alianzas() {
  const [type, setType] = useState("Todas");
  const [saved, setSaved] = useState<string[]>([]);
  const [applied, setApplied] = useState<string[]>([]);
  const types = ["Todas", ...Array.from(new Set(opportunities.map((o) => o.type)))];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Red de aliados" title="Alianzas y oportunidades" desc="Becas, prácticas, mentorías y financiación para jóvenes del Centro." />
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">{types.map((t) => <button key={t} onClick={() => setType(t)} className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${type === t ? "bg-primary text-primary-foreground" : "border bg-background"}`}>{t}</button>)}</div>
      <div className="grid gap-5 md:grid-cols-2">
        {opportunities.filter((o) => type === "Todas" || o.type === type).map((o) => (
          <Panel key={o.title} className="card-hover">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"><Chip tone="violet">{o.type}</Chip><span className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{o.deadline}</span></div>
            <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
            <p className="text-sm text-muted-foreground">{o.org}</p>
            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-2"><PrimaryBtn onClick={() => { if (!applied.includes(o.title)) { setApplied([...applied, o.title]); toast.success("Postulación enviada"); } }}>{applied.includes(o.title) ? <><CheckCircle2 className="h-4 w-4" /> Postulación enviada</> : "Postularme"}</PrimaryBtn><button onClick={() => setSaved(saved.includes(o.title) ? saved.filter((x) => x !== o.title) : [...saved, o.title])} aria-label={saved.includes(o.title) ? "Quitar de guardadas" : "Guardar oportunidad"} className={`grid h-11 w-11 place-items-center rounded-xl border ${saved.includes(o.title) ? "bg-accent text-primary" : "bg-background"}`}><Bookmark className={`h-4 w-4 ${saved.includes(o.title) ? "fill-current" : ""}`} /></button></div>
          </Panel>
        ))}
      </div>
      <Panel>
        <h3 className="font-bold">Aliados</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allies.map((a) => (
            <div key={a.name} className="rounded-xl bg-secondary p-4"><p className="font-semibold">{a.name}</p><p className="text-xs text-muted-foreground">{a.type} · {a.offer}</p></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
