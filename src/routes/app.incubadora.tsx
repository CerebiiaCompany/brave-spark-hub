import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { incubatorStages } from "@/lib/data";
import { PageHeader, Panel, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/incubadora")({
  head: () => ({ meta: [{ title: "Incubadora Empresarial — Liderazgo Valiente" }] }),
  component: Incubadora,
});

const canvas = ["Problema", "Cliente", "Propuesta de valor", "Canales", "Ingresos", "Costos"];
const mentors = [
  { n: "Andrés Silva", r: "Emprendedor · Retail", slot: "Mañana 4:00 PM" },
  { n: "Catalina Ortiz", r: "Finanzas · Banca", slot: "Jue 11:00 AM" },
  { n: "Felipe Duarte", r: "Marketing digital", slot: "Vie 3:00 PM" },
];

function Incubadora() {
  const [stage, setStage] = useState(2);
  return (
    <div>
      <PageHeader eyebrow="Incubadora" title="CaféBinacional" desc="Tu emprendimiento avanza por etapas. Completa cada una para llegar al Demo Day." />
      <Panel>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {incubatorStages.map((s, i) => (
            <div key={s} className="text-center">
              <div className={`mx-auto grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${i < stage ? "bg-success text-primary-foreground" : i === stage ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < stage ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <p className={`mt-2 text-xs font-semibold ${i === stage ? "text-primary" : "text-muted-foreground"}`}>{s}</p>
            </div>
          ))}
        </div>
        <PrimaryBtn className="mt-6" onClick={() => { if (stage < 5) { setStage(stage + 1); toast.success("Etapa completada · +200 XP"); } }}>
          {stage < 5 ? `Completar: ${incubatorStages[stage]}` : "¡Listo para Demo Day!"}
        </PrimaryBtn>
      </Panel>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <h3 className="font-bold">Modelo de negocio</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {canvas.map((c) => (
              <div key={c} className="rounded-xl border border-dashed p-4">
                <p className="text-xs font-semibold uppercase text-primary">{c}</p>
                <textarea className="mt-2 h-16 w-full resize-none bg-transparent text-sm outline-none" placeholder="Escribe aquí..." />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold">Mentores disponibles</h3>
          <div className="mt-4 space-y-3">
            {mentors.map((m) => (
              <div key={m.n} className="flex items-center justify-between rounded-xl bg-secondary p-3">
                <div><p className="text-sm font-semibold">{m.n}</p><p className="text-xs text-muted-foreground">{m.r} · {m.slot}</p></div>
                <button onClick={() => toast.success(`Mentoría agendada con ${m.n}`)} className="text-sm font-semibold text-primary">Agendar</button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
