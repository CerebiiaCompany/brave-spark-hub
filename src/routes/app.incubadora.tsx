import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Download, Plus, Trash2 } from "lucide-react";
import { incubatorStages } from "@/lib/data";
import { PageHeader, Panel, PrimaryBtn, GhostBtn, Chip, Bar } from "@/components/ui-kit";

export const Route = createFileRoute("/app/incubadora")({
  head: () => ({
    meta: [
      { title: "Incubadora Empresarial — Liderazgo Valiente" },
      { name: "description", content: "Crea y acompaña varios emprendimientos por etapas hasta el Demo Day." },
      { property: "og:title", content: "Incubadora Empresarial — Liderazgo Valiente" },
      { property: "og:description", content: "Crea y acompaña emprendimientos por etapas hasta el Demo Day." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Incubadora,
});

const canvas = ["Problema", "Cliente", "Propuesta de valor", "Canales", "Ingresos", "Costos"];
const categories = ["Emprendimiento", "Social", "Ambiental", "Tecnología", "Cultural"];
const mentors = [
  { n: "Andrés Silva", r: "Emprendedor · Retail", slot: "Mañana 4:00 PM" },
  { n: "Catalina Ortiz", r: "Finanzas · Banca", slot: "Jue 11:00 AM" },
  { n: "Felipe Duarte", r: "Marketing digital", slot: "Vie 3:00 PM" },
];

type Project = { id: string; name: string; category: string; pitch: string; stage: number; canvas: Record<string, string> };

function Incubadora() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "p1", name: "CaféBinacional", category: "Emprendimiento", pitch: "Café de origen de la frontera vendido en línea.", stage: 2, canvas: {} },
    { id: "p2", name: "Recicla Frontera", category: "Ambiental", pitch: "Puntos de reciclaje que pagan con bonos.", stage: 0, canvas: {} },
  ]);
  const [sel, setSel] = useState("p1");
  const [form, setForm] = useState<{ name: string; category: string; pitch: string } | null>(null);
  const p = projects.find((x) => x.id === sel) ?? projects[0];
  const update = (patch: Partial<Project>) => setProjects(projects.map((x) => (x.id === p!.id ? { ...x, ...patch } : x)));

  const create = () => {
    if (!form || form.name.trim().length < 3) { toast.error("Ponle un nombre de al menos 3 letras"); return; }
    const np: Project = { id: crypto.randomUUID(), name: form.name.trim(), category: form.category, pitch: form.pitch.trim(), stage: 0, canvas: {} };
    setProjects([...projects, np]); setSel(np.id); setForm(null); toast.success("Proyecto creado · +50 XP");
  };

  return (
    <div>
      <PageHeader eyebrow="Incubadora" title="Mis emprendimientos" desc="Crea varios proyectos y llévalos etapa por etapa hasta el Demo Day."
        action={<PrimaryBtn className="w-full sm:w-auto" onClick={() => setForm({ name: "", category: categories[0]!, pitch: "" })}><Plus className="h-4 w-4" />Nuevo proyecto</PrimaryBtn>} />

      {form && (
        <Panel className="mb-6 border-primary">
          <h3 className="font-bold">Nuevo proyecto</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre del proyecto" className="rounded-xl border bg-background px-3 py-2.5 text-sm" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-xl border bg-background px-3 py-2.5 text-sm">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <textarea value={form.pitch} onChange={(e) => setForm({ ...form, pitch: e.target.value })} placeholder="Describe tu idea en una frase" className="h-20 rounded-xl border bg-background px-3 py-2.5 text-sm sm:col-span-2" />
          </div>
          <div className="mt-4 flex gap-2"><PrimaryBtn onClick={create}>Crear</PrimaryBtn><GhostBtn onClick={() => setForm(null)}>Cancelar</GhostBtn></div>
        </Panel>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((x) => (
          <button key={x.id} onClick={() => setSel(x.id)} className={`rounded-2xl border p-4 text-left transition ${x.id === p?.id ? "border-primary bg-accent ring-2 ring-primary/30" : "bg-card hover:bg-accent/50"}`}>
            <div className="flex items-center justify-between gap-2"><Chip>{x.category}</Chip><span className="text-xs font-semibold text-muted-foreground">{incubatorStages[x.stage]}</span></div>
            <p className="mt-3 truncate font-bold">{x.name}</p>
            <p className="line-clamp-1 text-xs text-muted-foreground">{x.pitch || "Sin descripción"}</p>
            <Bar value={(x.stage / 5) * 100} className="mt-3" />
          </button>
        ))}
      </div>

      {p ? (<>
        <Panel className="mt-6">
          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="truncate text-xl font-bold">{p.name}</h2>
            <button onClick={() => { setProjects(projects.filter((x) => x.id !== p.id)); toast("Proyecto eliminado"); }} className="text-muted-foreground hover:text-destructive" aria-label="Eliminar"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 md:grid-cols-6">
            {incubatorStages.map((s, i) => (
              <div key={s} className="w-28 shrink-0 snap-start text-center sm:w-auto">
                <div className={`mx-auto grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${i < p.stage ? "bg-success text-primary-foreground" : i === p.stage ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < p.stage ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <p className={`mt-2 text-xs font-semibold ${i === p.stage ? "text-primary" : "text-muted-foreground"}`}>{s}</p>
              </div>
            ))}
          </div>
          <PrimaryBtn className="mt-6 w-full sm:w-auto" onClick={() => { if (p.stage < 5) { update({ stage: p.stage + 1 }); toast.success("Etapa completada · +200 XP"); } }}>
            {p.stage < 5 ? `Completar: ${incubatorStages[p.stage]}` : "¡Listo para Demo Day!"}
          </PrimaryBtn>
        </Panel>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Panel>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h3 className="font-bold">Modelo de negocio</h3><GhostBtn aria-label="Descargar modelo" title="Descargar modelo" onClick={() => window.print()}><Download className="h-4 w-4" /><span className="hidden sm:inline">Informe</span></GhostBtn></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {canvas.map((c) => (
                <div key={c} className="rounded-xl border border-dashed p-4">
                  <p className="text-xs font-semibold uppercase text-primary">{c}</p>
                  <textarea value={p.canvas[c] ?? ""} onChange={(e) => update({ canvas: { ...p.canvas, [c]: e.target.value } })} className="mt-2 h-16 w-full resize-none bg-transparent text-sm outline-none" placeholder="Escribe aquí..." />
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <h3 className="font-bold">Mentores disponibles</h3>
            <div className="mt-4 space-y-3">
              {mentors.map((m) => (
                <div key={m.n} className="flex items-center justify-between gap-2 rounded-xl bg-secondary p-3">
                  <div className="min-w-0"><p className="truncate text-sm font-semibold">{m.n}</p><p className="text-xs text-muted-foreground">{m.r} · {m.slot}</p></div>
                  <button onClick={() => toast.success(`Mentoría agendada con ${m.n} para ${p.name}`)} className="shrink-0 text-sm font-semibold text-primary">Agendar</button>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </>) : <Panel className="mt-6 text-center text-muted-foreground">Crea tu primer proyecto para empezar.</Panel>}
    </div>
  );
}
