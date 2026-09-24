import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Download, MapPin, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, Bar as RBar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { impact, monthly } from "@/lib/data";
import { PageHeader, Panel, Stat, PrimaryBtn, Chip } from "@/components/ui-kit";

export const Route = createFileRoute("/app/impacto")({
  head: () => ({ meta: [
    { title: "Impacto territorial — Liderazgo Valiente" }, { name: "description", content: "Indicadores de formación, proyectos y alcance territorial del Centro." },
    { property: "og:title", content: "Impacto territorial — Liderazgo Valiente" }, { property: "og:description", content: "Indicadores de formación, proyectos y alcance territorial." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Impacto,
});

function Impacto() {
  const [period, setPeriod] = useState("6 meses");
  const multiplier = period === "Este mes" ? 0.22 : period === "Este año" ? 1.45 : 1;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Resultados" title="Dashboard de impacto" desc="Indicadores del Centro en tiempo real (datos de demostración)." action={<PrimaryBtn className="w-full sm:w-auto" onClick={() => window.print()}><Download className="h-4 w-4" /> Descargar informe</PrimaryBtn>} />
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">{["Este mes", "6 meses", "Este año"].map((p) => <button key={p} onClick={() => setPeriod(p)} className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${period === p ? "bg-primary text-primary-foreground" : "border bg-background"}`}>{p}</button>)}</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Jóvenes formados" value={Math.round(impact.youth * multiplier).toLocaleString("es-CO")} icon={<Users className="h-4 w-4" />} />
        <Stat label="Proyectos" value={Math.round(impact.projects * multiplier)} icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Horas de formación" value={Math.round(impact.hours * multiplier).toLocaleString("es-CO")} icon={<Activity className="h-4 w-4" />} />
        <Stat label="Retos resueltos" value={Math.round(impact.challenges * multiplier)} icon={<MapPin className="h-4 w-4" />} />
        <Stat label="Emprendimientos" value={impact.ventures} />
        <Stat label="Municipios" value={impact.towns} />
        <Stat label="Alianzas" value={impact.allies} />
        <Stat label="Satisfacción" value="94%" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="font-bold">Jóvenes formados (acumulado)</h3>
          <div className="mt-4 h-64 min-w-0 overflow-hidden">
            <ResponsiveContainer><AreaChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} /><YAxis stroke="var(--muted-foreground)" fontSize={12} /><Tooltip />
              <Area dataKey="jovenes" stroke="var(--primary)" fill="var(--accent)" strokeWidth={2} />
            </AreaChart></ResponsiveContainer>
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold">Proyectos creados</h3>
          <div className="mt-4 h-64 min-w-0 overflow-hidden">
            <ResponsiveContainer><BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} /><YAxis stroke="var(--muted-foreground)" fontSize={12} /><Tooltip />
              <RBar dataKey="proyectos" fill="var(--navy)" radius={[6, 6, 0, 0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <Panel>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><h3 className="font-bold">Avance frente a la meta anual</h3><p className="mt-1 text-sm text-muted-foreground">La cobertura juvenil alcanza el 81% de la meta y los proyectos el 74%.</p></div><Chip tone="success">En ruta</Chip></div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{[["Cobertura juvenil",81],["Proyectos activos",74],["Participación territorial",68]].map(([label,value]) => <div key={String(label)} className="rounded-xl bg-secondary p-4"><div className="flex justify-between text-sm"><span>{label}</span><strong>{value}%</strong></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-background"><div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} /></div></div>)}</div>
      </Panel>
    </div>
  );
}
