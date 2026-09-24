import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ThumbsUp } from "lucide-react";
import { projects } from "@/lib/data";
import { PageHeader, Panel, Chip, PrimaryBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/proyectos")({
  head: () => ({ meta: [{ title: "Proyectos — Liderazgo Valiente" }] }),
  component: Proyectos,
});

function Proyectos() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  return (
    <div>
      <PageHeader eyebrow="Laboratorio de Proyectos" title="Proyectos de la comunidad" desc="Descubre, apoya y súmate a proyectos creados por jóvenes del territorio."
        action={<PrimaryBtn onClick={() => toast.success("Borrador de proyecto creado")}>+ Nuevo proyecto</PrimaryBtn>} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Panel key={p.title} className="card-hover flex flex-col">
            <div className="flex gap-2"><Chip>{p.category}</Chip><Chip tone="success">{p.stage}</Chip></div>
            <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium">{p.author}</span>
              <button onClick={() => setLiked({ ...liked, [p.title]: !liked[p.title] })} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${liked[p.title] ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                <ThumbsUp className="h-3.5 w-3.5" /> {p.votes + (liked[p.title] ? 1 : 0)}
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
