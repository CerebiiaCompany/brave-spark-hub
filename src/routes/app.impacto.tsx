import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar as RBar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { impact, monthly } from "@/lib/data";
import { PageHeader, Panel, Stat } from "@/components/ui-kit";

export const Route = createFileRoute("/app/impacto")({
  head: () => ({ meta: [{ title: "Dashboard de impacto — Liderazgo Valiente" }] }),
  component: Impacto,
});

function Impacto() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Resultados" title="Dashboard de impacto" desc="Indicadores del Centro en tiempo real (datos de demostración)." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Jóvenes formados" value={impact.youth.toLocaleString("es-CO")} />
        <Stat label="Proyectos" value={impact.projects} />
        <Stat label="Horas de formación" value={impact.hours.toLocaleString("es-CO")} />
        <Stat label="Retos resueltos" value={impact.challenges} />
        <Stat label="Emprendimientos" value={impact.ventures} />
        <Stat label="Municipios" value={impact.towns} />
        <Stat label="Alianzas" value={impact.allies} />
        <Stat label="Satisfacción" value="94%" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="font-bold">Jóvenes formados (acumulado)</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer><AreaChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} /><YAxis stroke="var(--muted-foreground)" fontSize={12} /><Tooltip />
              <Area dataKey="jovenes" stroke="var(--primary)" fill="var(--accent)" strokeWidth={2} />
            </AreaChart></ResponsiveContainer>
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold">Proyectos creados</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer><BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} /><YAxis stroke="var(--muted-foreground)" fontSize={12} /><Tooltip />
              <RBar dataKey="proyectos" fill="var(--navy)" radius={[6, 6, 0, 0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}
