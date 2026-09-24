import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { bills } from "@/lib/data";
import { PageHeader, Panel, Chip, PrimaryBtn, GhostBtn } from "@/components/ui-kit";

export const Route = createFileRoute("/app/congreso")({
  head: () => ({ meta: [{ title: "Concejo Simulado — Liderazgo Valiente" }] }),
  component: Congreso,
});

const speakers = [
  { n: "Santiago Rojas", s: "A favor", t: "Los jóvenes necesitamos decidir sobre lo que nos afecta." },
  { n: "Laura Méndez", s: "En contra", t: "Debemos definir primero mecanismos de control del gasto." },
  { n: "Juan David Ramírez", s: "A favor", t: "Propongo una veeduría juvenil que audite los proyectos." },
];

function Congreso() {
  const bill = bills[0]!;
  const [votes, setVotes] = useState({ yes: bill.yes, no: bill.no, abstain: bill.abstain });
  const [voted, setVoted] = useState<string | null>(null);
  const total = votes.yes + votes.no + votes.abstain;
  const cast = (k: "yes" | "no" | "abstain", label: string) => {
    if (voted) return;
    setVotes((v) => ({ ...v, [k]: v[k] + 1 }));
    setVoted(label);
    toast.success(`Voto registrado: ${label} · +40 XP`);
  };
  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <div>
      <PageHeader eyebrow="Sesión en vivo" title="Concejo Simulado" desc="Debate, argumenta y vota proyectos de acuerdo como un concejal." action={<Chip tone="coral">● En vivo · 28 concejales</Chip>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <Chip tone="warning">{bill.status}</Chip>
          <h2 className="mt-4 text-2xl font-bold">{bill.title}</h2>
          <p className="mt-2 text-muted-foreground">{bill.summary}</p>
          <p className="mt-2 text-sm">Autor: <b>{bill.author}</b></p>
          <div className="mt-6 space-y-3">
            {[["A favor", votes.yes, "bg-success"], ["En contra", votes.no, "bg-coral"], ["Abstención", votes.abstain, "bg-muted-foreground"]].map(([l, n, c]) => (
              <div key={l as string}>
                <div className="flex justify-between text-sm"><span>{l}</span><span className="font-semibold">{n} · {pct(n as number)}%</span></div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-secondary"><div className={`h-full ${c} transition-all duration-500`} style={{ width: `${pct(n as number)}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {voted ? <p className="font-semibold text-primary">Tu voto: {voted}</p> : <>
              <PrimaryBtn onClick={() => cast("yes", "A favor")}>Votar a favor</PrimaryBtn>
              <GhostBtn onClick={() => cast("no", "En contra")}>En contra</GhostBtn>
              <GhostBtn onClick={() => cast("abstain", "Abstención")}>Abstenerme</GhostBtn>
            </>}
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold">Orden del día</h3>
          <ol className="mt-4 space-y-3 text-sm">
            {["Llamado a lista", "Lectura del proyecto 014", "Debate (3 min por intervención)", "Votación", "Proyecto 015 — primer debate"].map((s, i) => (
              <li key={s} className={`flex gap-3 ${i < 3 ? "text-muted-foreground line-through" : i === 3 ? "font-semibold text-primary" : ""}`}><span>{i + 1}.</span>{s}</li>
            ))}
          </ol>
        </Panel>
      </div>
      <Panel className="mt-6">
        <h3 className="font-bold">Intervenciones</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {speakers.map((s) => (
            <div key={s.n} className="rounded-xl bg-secondary p-4">
              <div className="flex items-center justify-between"><p className="font-semibold">{s.n}</p><Chip tone={s.s === "A favor" ? "success" : "coral"}>{s.s}</Chip></div>
              <p className="mt-2 text-sm text-muted-foreground">"{s.t}"</p>
            </div>
          ))}
        </div>
        <GhostBtn className="mt-5" onClick={() => toast("Solicitud de palabra enviada a la presidencia")}>✋ Pedir la palabra</GhostBtn>
      </Panel>
    </div>
  );
}
