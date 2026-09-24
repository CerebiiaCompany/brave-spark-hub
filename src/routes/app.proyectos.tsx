import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useMemo } from "react";
import { ArrowLeft, ArrowRight, HandHeart, Search, ThumbsUp, Users, X } from "lucide-react";
import { projects } from "@/lib/data";
import { PageHeader, Panel, Chip, PrimaryBtn, GhostBtn } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/proyectos")({
  head: () => ({ meta: [
    { title: "Proyectos de la comunidad — Liderazgo Valiente" }, { name: "description", content: "Explora, apoya y crea proyectos liderados por jóvenes del territorio." },
    { property: "og:title", content: "Proyectos de la comunidad — Liderazgo Valiente" }, { property: "og:description", content: "Explora, apoya y crea proyectos liderados por jóvenes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Proyectos,
});

function Proyectos() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [creating, setCreating] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({ title: "", problem: "", solution: "", category: "Público" });
  const list = useMemo(() => projects.filter((p) => (category === "Todos" || p.category === category) && `${p.title} ${p.desc}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return (
    <div>
      <PageHeader eyebrow="Laboratorio de Proyectos" title="Proyectos de la comunidad" desc="Descubre, apoya y súmate a proyectos creados por jóvenes del territorio."
        action={<PrimaryBtn className="w-full sm:w-auto" onClick={() => { setCreating(true); setStep(0); }}>+ Nuevo proyecto</PrimaryBtn>} />
      <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="relative"><span className="sr-only">Buscar proyectos</span><Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o propósito" className="h-11 pl-10" /></label>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">{["Todos", "Público", "Empresarial", "Impacto", "Información"].map((c) => <button key={c} onClick={() => setCategory(c)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold ${category === c ? "bg-primary text-primary-foreground" : "border bg-background"}`}>{c}</button>)}</div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Panel key={p.title} className="card-hover flex flex-col">
            <div className="flex gap-2"><Chip>{p.category}</Chip><Chip tone="success">{p.stage}</Chip></div>
            <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
            <button onClick={() => setSelected(p)} className="mt-4 text-left text-sm font-semibold text-primary">Ver ficha del proyecto →</button>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t pt-4">
              <span className="text-sm font-medium">{p.author}</span>
              <button onClick={() => setLiked({ ...liked, [p.title]: !liked[p.title] })} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${liked[p.title] ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                <ThumbsUp className="h-3.5 w-3.5" /> {p.votes + (liked[p.title] ? 1 : 0)}
              </button>
            </div>
          </Panel>
        ))}
      </div>
      {list.length === 0 && <Panel className="text-center"><p className="font-semibold">No encontramos proyectos con esos filtros.</p><GhostBtn className="mt-4" onClick={() => { setCategory("Todos"); setQuery(""); }}>Limpiar filtros</GhostBtn></Panel>}
      {selected && <div className="fixed inset-0 z-[60] flex items-end bg-navy/40 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true">
        <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-background p-5 sm:max-w-2xl sm:rounded-2xl sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4"><div className="min-w-0"><div className="flex flex-wrap gap-2"><Chip>{selected.category}</Chip><Chip tone="success">{selected.stage}</Chip></div><h2 className="mt-3 text-2xl font-bold">{selected.title}</h2></div><button onClick={() => setSelected(null)} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-accent" aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
          <p className="mt-4 text-muted-foreground">{selected.desc}</p>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-secondary p-4"><Users className="h-5 w-5 text-primary" /><p className="mt-2 font-bold">6 integrantes</p><p className="text-xs text-muted-foreground">Equipo abierto</p></div><div className="rounded-xl bg-secondary p-4"><ThumbsUp className="h-5 w-5 text-primary" /><p className="mt-2 font-bold">{selected.votes} apoyos</p><p className="text-xs text-muted-foreground">Comunidad</p></div></div>
          <h3 className="mt-6 font-bold">Necesitamos apoyo en</h3><div className="mt-3 flex flex-wrap gap-2"><Chip tone="violet">Comunicación</Chip><Chip tone="gold">Validación</Chip><Chip tone="success">Alianzas</Chip></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2"><PrimaryBtn onClick={() => toast.success("Solicitud enviada al equipo")}><HandHeart className="h-4 w-4" /> Quiero colaborar</PrimaryBtn><GhostBtn onClick={() => setLiked({ ...liked, [selected.title]: true })}><ThumbsUp className="h-4 w-4" /> Apoyar proyecto</GhostBtn></div>
        </div>
      </div>}
      {creating && <div className="fixed inset-0 z-[60] flex items-end bg-navy/40 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true">
        <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-background p-5 sm:max-w-2xl sm:rounded-2xl sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Paso {step + 1} de 3</p><h2 className="mt-1 text-2xl font-bold">Crea tu proyecto</h2></div><button onClick={() => setCreating(false)} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-accent" aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
          <Bar value={((step + 1) / 3) * 100} className="mt-5" />
          {step === 0 && <div className="mt-6 space-y-4"><label className="block text-sm font-semibold">Nombre del proyecto<Input className="mt-2" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Ej. Jóvenes por el agua" /></label><label className="block text-sm font-semibold">Problema que quieres resolver<Textarea className="mt-2" value={draft.problem} onChange={(e) => setDraft({ ...draft, problem: e.target.value })} placeholder="Describe a quién afecta y por qué importa" /></label></div>}
          {step === 1 && <div className="mt-6 space-y-4"><label className="block text-sm font-semibold">Tu solución<Textarea className="mt-2" value={draft.solution} onChange={(e) => setDraft({ ...draft, solution: e.target.value })} placeholder="¿Qué harás de manera diferente?" /></label><div><p className="text-sm font-semibold">Categoría</p><div className="mt-2 grid grid-cols-2 gap-2">{["Público", "Empresarial", "Impacto", "Información"].map((c) => <button key={c} onClick={() => setDraft({ ...draft, category: c })} className={`min-h-11 rounded-xl border text-sm font-semibold ${draft.category === c ? "border-primary bg-accent" : ""}`}>{c}</button>)}</div></div></div>}
          {step === 2 && <div className="mt-6 rounded-xl bg-secondary p-5"><Chip>{draft.category}</Chip><h3 className="mt-3 text-xl font-bold">{draft.title || "Proyecto sin nombre"}</h3><p className="mt-3 text-sm"><strong>Problema:</strong> {draft.problem || "Pendiente"}</p><p className="mt-2 text-sm"><strong>Solución:</strong> {draft.solution || "Pendiente"}</p></div>}
          <div className="mt-7 grid grid-cols-2 gap-3"><GhostBtn disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" /> Atrás</GhostBtn><PrimaryBtn disabled={step === 0 ? !draft.title || !draft.problem : step === 1 ? !draft.solution : false} onClick={() => { if (step < 2) setStep(step + 1); else { toast.success("Proyecto creado como borrador"); setCreating(false); setDraft({ title: "", problem: "", solution: "", category: "Público" }); } }}>{step === 2 ? "Crear borrador" : <>Siguiente <ArrowRight className="h-4 w-4" /></>}</PrimaryBtn></div>
        </div>
      </div>}
    </div>
  );
}
