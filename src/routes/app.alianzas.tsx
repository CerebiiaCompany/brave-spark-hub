import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { allies, opportunities } from "@/lib/data";
import { PageHeader, Panel, Chip, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/alianzas")({
  head: () => ({ meta: [{ title: "Alianzas y oportunidades — Liderazgo Valiente" }] }),
  component: Alianzas,
});

function Alianzas() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Red de aliados" title="Alianzas y oportunidades" desc="Becas, prácticas, mentorías y financiación para jóvenes del Centro." />
      <div className="grid gap-5 md:grid-cols-2">
        {opportunities.map((o) => (
          <Panel key={o.title} className="card-hover">
            <div className="flex justify-between"><Chip tone="violet">{o.type}</Chip><span className="text-xs text-muted-foreground">Cierra: {o.deadline}</span></div>
            <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
            <p className="text-sm text-muted-foreground">{o.org}</p>
            <PrimaryBtn className="mt-5" onClick={() => toast.success("Postulación enviada")}>Postularme</PrimaryBtn>
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
