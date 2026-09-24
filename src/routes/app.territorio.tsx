import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { territories } from "@/lib/data";
import { PageHeader, Panel } from "@/components/ui-kit";

export const Route = createFileRoute("/app/territorio")({
  head: () => ({ meta: [{ title: "Mapa territorial — Liderazgo Valiente" }] }),
  component: Territorio,
});

function Territorio() {
  const [sel, setSel] = useState(territories[0]);
  return (
    <div>
      <PageHeader eyebrow="Territorio" title="Mapa territorial" desc="Presencia del Centro en Norte de Santander y la zona de frontera." />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel className="relative aspect-[4/3] overflow-hidden bg-accent p-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute right-4 top-4 rounded-lg bg-background/80 px-2 py-1 text-xs font-semibold text-muted-foreground">Frontera con Venezuela →</div>
          {territories.map((t) => (
            <button key={t.name} onClick={() => setSel(t)} style={{ left: `${t.x}%`, top: `${t.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
              <span className={`block rounded-full bg-primary/25 ${sel.name === t.name ? "ring-4 ring-primary/30" : ""}`} style={{ width: 16 + t.youth / 40, height: 16 + t.youth / 40 }}>
                <span className="absolute inset-0 m-auto block h-3 w-3 rounded-full bg-primary" />
              </span>
              <span className="mt-1 block whitespace-nowrap text-xs font-semibold">{t.name}</span>
            </button>
          ))}
        </Panel>
        <div className="space-y-4">
          <Panel>
            <p className="text-sm text-muted-foreground">Municipio seleccionado</p>
            <h2 className="text-2xl font-bold">{sel.name}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary p-3"><p className="font-display text-2xl font-bold">{sel.youth}</p><p className="text-xs text-muted-foreground">jóvenes</p></div>
              <div className="rounded-xl bg-secondary p-3"><p className="font-display text-2xl font-bold">{sel.projects}</p><p className="text-xs text-muted-foreground">proyectos</p></div>
            </div>
          </Panel>
          <Panel>
            {territories.map((t) => (
              <button key={t.name} onClick={() => setSel(t)} className="flex w-full justify-between border-b py-2 text-sm last:border-0"><span>{t.name}</span><span className="font-semibold">{t.youth}</span></button>
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}
