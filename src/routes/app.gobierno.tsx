import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Panel, Bar, PrimaryBtn } from "@/components/ui-kit";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/app/gobierno")({
  head: () => ({ meta: [{ title: "Laboratorio de Gobierno — Liderazgo Valiente" }] }),
  component: Gobierno,
});

const sectors = [
  { k: "educacion", l: "Educación", w: { aprob: 0.5, empleo: 0.2, seguridad: 0.1 } },
  { k: "salud", l: "Salud", w: { aprob: 0.4, empleo: 0.1, seguridad: 0.1 } },
  { k: "empleo", l: "Empleo juvenil", w: { aprob: 0.3, empleo: 0.7, seguridad: 0.2 } },
  { k: "seguridad", l: "Seguridad", w: { aprob: 0.3, empleo: 0.1, seguridad: 0.8 } },
  { k: "infra", l: "Infraestructura", w: { aprob: 0.2, empleo: 0.4, seguridad: 0.2 } },
] as const;

function Gobierno() {
  const [b, setB] = useState<Record<string, number>>({ educacion: 25, salud: 20, empleo: 20, seguridad: 20, infra: 15 });
  const total = Object.values(b).reduce((a, c) => a + c, 0);
  const calc = (key: "aprob" | "empleo" | "seguridad") =>
    Math.min(100, Math.round(sectors.reduce((a, s) => a + (b[s.k] ?? 0) * s.w[key], 0) * 2.2));
  return (
    <div>
      <PageHeader eyebrow="Simulación" title="Laboratorio de Gobierno" desc="Eres alcalde/sa de Villa Esperanza. Distribuye el presupuesto de $100.000 millones y observa el impacto." />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <div className="flex justify-between"><h3 className="font-bold">Presupuesto</h3><span className={`text-sm font-bold ${total > 100 ? "text-destructive" : "text-primary"}`}>{total}% asignado</span></div>
          <div className="mt-6 space-y-6">
            {sectors.map((s) => (
              <div key={s.k}>
                <div className="mb-2 flex justify-between text-sm"><span className="font-medium">{s.l}</span><span className="font-semibold">{b[s.k]}%</span></div>
                <Slider value={[b[s.k] ?? 0]} max={60} step={1} onValueChange={([v]) => setB({ ...b, [s.k]: v ?? 0 })} />
              </div>
            ))}
          </div>
          <PrimaryBtn className="mt-8" onClick={() => total === 100 ? toast.success("Presupuesto aprobado por el Concejo · +120 XP") : toast.error("El presupuesto debe sumar exactamente 100%")}>Presentar al Concejo</PrimaryBtn>
        </Panel>
        <div className="space-y-4">
          {[["Aprobación ciudadana", calc("aprob")], ["Empleo", calc("empleo")], ["Seguridad", calc("seguridad")]].map(([l, v]) => (
            <Panel key={l as string}>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">{l}</span><span className="font-display text-2xl font-bold">{v}</span></div>
              <Bar value={v as number} className="mt-3" />
            </Panel>
          ))}
          <Panel className="bg-accent">
            <p className="text-sm font-semibold text-accent-foreground">📰 Evento</p>
            <p className="mt-1 text-sm">Una ola invernal afecta 3 barrios. ¿Reservarás recursos para atención de emergencias?</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
