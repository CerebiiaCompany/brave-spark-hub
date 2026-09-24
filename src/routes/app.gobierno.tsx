import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Panel, Bar, PrimaryBtn, Chip } from "@/components/ui-kit";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/app/gobierno")({
  head: () => ({
    meta: [
      { title: "Laboratorio de Gobierno — Liderazgo Valiente" },
      { name: "description", content: "Simulaciones de gobierno: presupuesto, crisis y plan de desarrollo con objetivos e impacto." },
    ],
  }),
  component: Gobierno,
});

type Item = { k: string; l: string; goal: string; min: number; impact: { aprob: number; empleo: number; seguridad: number; bienestar: number } };
type Activity = { id: string; title: string; role: string; budget: string; xp: number; context: string; event: string; items: Item[] };

const activities: Activity[] = [
  { id: "pres", title: "Presupuesto municipal", role: "Alcalde/sa de Villa Esperanza", budget: "$100.000 millones", xp: 120,
    context: "Distribuye el presupuesto anual cumpliendo el mínimo de cada sector.",
    event: "Una ola invernal afecta 3 barrios. ¿Reservarás recursos para emergencias?",
    items: [
      { k: "educacion", l: "Educación", goal: "Cobertura escolar del 95%", min: 15, impact: { aprob: 0.5, empleo: 0.2, seguridad: 0.1, bienestar: 0.6 } },
      { k: "salud", l: "Salud", goal: "Reducir tiempos de atención 30%", min: 12, impact: { aprob: 0.4, empleo: 0.1, seguridad: 0.1, bienestar: 0.7 } },
      { k: "empleo", l: "Empleo juvenil", goal: "2.000 empleos para jóvenes", min: 10, impact: { aprob: 0.3, empleo: 0.8, seguridad: 0.2, bienestar: 0.3 } },
      { k: "seguridad", l: "Seguridad", goal: "Bajar hurtos 20%", min: 10, impact: { aprob: 0.3, empleo: 0.1, seguridad: 0.9, bienestar: 0.2 } },
      { k: "infra", l: "Infraestructura", goal: "Pavimentar 40 km de vías", min: 8, impact: { aprob: 0.2, empleo: 0.5, seguridad: 0.2, bienestar: 0.3 } },
      { k: "emerg", l: "Gestión del riesgo", goal: "Atender 100% de emergencias", min: 3, impact: { aprob: 0.3, empleo: 0, seguridad: 0.4, bienestar: 0.5 } },
    ] },
  { id: "crisis", title: "Gestión de crisis migratoria", role: "Gobernador/a de frontera", budget: "$40.000 millones", xp: 150,
    context: "Llegan 5.000 personas migrantes en un mes. Prioriza la respuesta.",
    event: "Un medio publica que los albergues están saturados. La presión ciudadana aumenta.",
    items: [
      { k: "albergue", l: "Albergues temporales", goal: "3.000 cupos dignos", min: 15, impact: { aprob: 0.3, empleo: 0, seguridad: 0.3, bienestar: 0.8 } },
      { k: "salud", l: "Atención en salud", goal: "Vacunación del 90%", min: 15, impact: { aprob: 0.4, empleo: 0, seguridad: 0.1, bienestar: 0.8 } },
      { k: "integ", l: "Integración laboral", goal: "1.000 personas con empleo", min: 10, impact: { aprob: 0.2, empleo: 0.9, seguridad: 0.3, bienestar: 0.4 } },
      { k: "educ", l: "Cupos escolares", goal: "Todos los niños estudiando", min: 10, impact: { aprob: 0.4, empleo: 0.1, seguridad: 0.2, bienestar: 0.6 } },
      { k: "control", l: "Control y registro", goal: "Registro del 100%", min: 10, impact: { aprob: 0.3, empleo: 0.1, seguridad: 0.8, bienestar: 0.1 } },
    ] },
  { id: "plan", title: "Plan de desarrollo juvenil", role: "Secretario/a de Juventud", budget: "$15.000 millones", xp: 100,
    context: "Diseña el plan cuatrienal para la juventud del municipio.",
    event: "La Plataforma de Juventudes exige más participación en las decisiones.",
    items: [
      { k: "partic", l: "Participación", goal: "Consejo de juventud activo", min: 10, impact: { aprob: 0.7, empleo: 0.1, seguridad: 0.1, bienestar: 0.3 } },
      { k: "empre", l: "Emprendimiento", goal: "200 emprendimientos financiados", min: 10, impact: { aprob: 0.3, empleo: 0.8, seguridad: 0.1, bienestar: 0.3 } },
      { k: "cultura", l: "Cultura y deporte", goal: "10 escuelas deportivas", min: 10, impact: { aprob: 0.4, empleo: 0.2, seguridad: 0.4, bienestar: 0.6 } },
      { k: "mental", l: "Salud mental", goal: "Línea de atención 24/7", min: 5, impact: { aprob: 0.3, empleo: 0, seguridad: 0.2, bienestar: 0.9 } },
    ] },
];

const metrics = [["aprob", "Aprobación ciudadana"], ["empleo", "Empleo"], ["seguridad", "Seguridad"], ["bienestar", "Bienestar social"]] as const;

function initial(a: Activity) {
  const even = Math.floor(100 / a.items.length);
  const r: Record<string, number> = {};
  a.items.forEach((it, i) => (r[it.k] = i === 0 ? 100 - even * (a.items.length - 1) : even));
  return r;
}

function Gobierno() {
  const [actId, setActId] = useState(activities[0]!.id);
  const act = activities.find((a) => a.id === actId)!;
  const [alloc, setAlloc] = useState<Record<string, Record<string, number>>>(() => Object.fromEntries(activities.map((a) => [a.id, initial(a)])));
  const [done, setDone] = useState<Record<string, number>>({});
  const b = alloc[actId]!;
  const total = Object.values(b).reduce((a, c) => a + c, 0);
  const n = act.items.length;
  const calc = (key: (typeof metrics)[number][0]) => Math.min(100, Math.round(act.items.reduce((a, s) => a + (b[s.k] ?? 0) * s.impact[key], 0) * (n / 2.2)));
  const goalPct = (it: Item) => Math.min(100, Math.round(((b[it.k] ?? 0) / Math.max(it.min * 1.8, 1)) * 100));
  const submit = () => {
    if (total !== 100) return toast.error("El presupuesto debe sumar exactamente 100%");
    const under = act.items.filter((it) => (b[it.k] ?? 0) < it.min);
    if (under.length) return toast.error(`Bajo el mínimo: ${under.map((u) => u.l).join(", ")}`);
    const score = Math.round(metrics.reduce((a, [k]) => a + calc(k), 0) / metrics.length);
    setDone({ ...done, [actId]: score });
    toast.success(`Aprobado · Puntaje ${score}/100 · +${act.xp} XP`);
  };

  return (
    <div>
      <PageHeader eyebrow="Simulación" title="Laboratorio de Gobierno" desc="Asume distintos cargos públicos. Cada decisión tiene objetivos e impacto." />
      <div className="grid gap-3 sm:grid-cols-3">
        {activities.map((a) => (
          <button key={a.id} onClick={() => setActId(a.id)} className={`rounded-2xl border p-4 text-left transition ${a.id === actId ? "border-primary bg-accent ring-2 ring-primary/30" : "bg-card hover:bg-accent/50"}`}>
            <div className="flex items-center justify-between gap-2"><Chip tone={done[a.id] !== undefined ? "success" : "accent"}>{done[a.id] !== undefined ? `✓ ${done[a.id]}/100` : `+${a.xp} XP`}</Chip></div>
            <p className="mt-3 font-bold">{a.title}</p>
            <p className="text-xs text-muted-foreground">{a.role} · {a.budget}</p>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{act.context}</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <div className="flex justify-between gap-2"><h3 className="font-bold">Presupuesto · {act.budget}</h3><span className={`text-sm font-bold ${total !== 100 ? "text-destructive" : "text-success"}`}>{total}% asignado</span></div>
          <div className="mt-6 space-y-5">
            {act.items.map((s) => {
              const v = b[s.k] ?? 0; const under = v < s.min;
              return (
                <div key={s.k} className="rounded-xl border p-4">
                  <div className="mb-1 flex flex-wrap justify-between gap-2 text-sm"><span className="font-semibold">{s.l}</span><span className={`font-bold ${under ? "text-coral" : ""}`}>{v}% <span className="text-xs font-normal text-muted-foreground">(mín. {s.min}%)</span></span></div>
                  <p className="mb-3 text-xs text-muted-foreground">🎯 Objetivo: {s.goal}</p>
                  <Slider value={[v]} max={60} step={1} onValueChange={([x]) => setAlloc({ ...alloc, [actId]: { ...b, [s.k]: x ?? 0 } })} />
                  <div className="mt-3 flex items-center gap-2 text-xs"><span className="w-20 shrink-0 text-muted-foreground">Meta {goalPct(s)}%</span><Bar value={goalPct(s)} /></div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {metrics.filter(([k]) => s.impact[k] >= 0.4).map(([k, l]) => <Chip key={k} tone="success">↑ {l}</Chip>)}
                  </div>
                </div>
              );
            })}
          </div>
          <PrimaryBtn className="mt-6 w-full sm:w-auto" onClick={submit}>Presentar al Concejo</PrimaryBtn>
        </Panel>
        <div className="space-y-4">
          {metrics.map(([k, l]) => (
            <Panel key={k}>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">{l}</span><span className="font-display text-2xl font-bold">{calc(k)}</span></div>
              <Bar value={calc(k)} className="mt-3" />
            </Panel>
          ))}
          <Panel className="bg-accent">
            <p className="text-sm font-semibold text-accent-foreground">📰 Evento</p>
            <p className="mt-1 text-sm">{act.event}</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
