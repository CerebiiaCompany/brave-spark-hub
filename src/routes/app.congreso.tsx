import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Play, Pause, RotateCcw, Hand, Users, Clock, Trophy, Gavel, FileText } from "lucide-react";
import { PageHeader, Panel, Chip, PrimaryBtn, GhostBtn, Bar } from "@/components/ui-kit";

export const Route = createFileRoute("/app/congreso")({
  head: () => ({
    meta: [
      { title: "Concejo Simulado — Liderazgo Valiente" },
      { name: "description", content: "Salas de debate, roles, cronómetro y votación en el Concejo Simulado." },
    ],
  }),
  component: Congreso,
});

type Room = {
  id: string; name: string; type: string; live: boolean; members: number; xp: number;
  bill: { title: string; summary: string; author: string; objective: string; duration: string; rules: string[]; yes: number; no: number; abstain: number };
  agenda: string[];
};

const rooms: Room[] = [
  { id: "c1", name: "Sala Plenaria Cúcuta", type: "Concejo municipal", live: true, members: 28, xp: 150,
    bill: { title: "Proyecto de Acuerdo 014 — Presupuesto participativo juvenil", summary: "Destina el 5% del presupuesto de inversión a proyectos elegidos por jóvenes.", author: "Bancada Juvenil Norte", objective: "Aprobar o negar en segundo debate con argumentos fiscales y sociales.", duration: "45 min", rules: ["3 min por intervención", "1 réplica por bancada", "Votación nominal"], yes: 14, no: 6, abstain: 2 },
    agenda: ["Llamado a lista", "Lectura del proyecto", "Debate", "Votación", "Cierre"] },
  { id: "c2", name: "Comisión Primera", type: "Comisión de gobierno", live: true, members: 12, xp: 100,
    bill: { title: "Proyecto 015 — Veeduría juvenil de obras", summary: "Crea una veeduría juvenil que audita contratos de infraestructura.", author: "Laura Méndez", objective: "Primer debate: ajustar articulado.", duration: "30 min", rules: ["2 min por intervención", "Proposiciones por escrito"], yes: 5, no: 3, abstain: 1 },
    agenda: ["Instalación", "Ponencia", "Debate del articulado", "Votación", "Cierre"] },
  { id: "c3", name: "Cámara Binacional", type: "Congreso simulado", live: false, members: 40, xp: 200,
    bill: { title: "Proyecto de Ley 22 — Empleo juvenil en frontera", summary: "Incentivos tributarios a empresas que contraten jóvenes de zonas de frontera.", author: "Bancada Frontera", objective: "Debate de control y votación en plenaria.", duration: "60 min", rules: ["4 min por intervención", "Moción de orden permitida"], yes: 0, no: 0, abstain: 0 },
    agenda: ["Llamado a lista", "Ponencia", "Debate", "Votación", "Cierre"] },
];

const roles = [
  { k: "Concejal", d: "Debate y vota", icon: "🗳️" },
  { k: "Presidente/a", d: "Modera y da la palabra", icon: "🔨" },
  { k: "Secretario/a", d: "Lleva el acta y conteo", icon: "📜" },
  { k: "Ponente", d: "Presenta y defiende el proyecto", icon: "🎤" },
  { k: "Veedor/a ciudadano", d: "Observa y evalúa", icon: "👁️" },
];

const seed = [
  { n: "Santiago Rojas", s: "A favor", t: "Los jóvenes necesitamos decidir sobre lo que nos afecta.", likes: 12 },
  { n: "Laura Méndez", s: "En contra", t: "Primero definamos mecanismos de control del gasto.", likes: 8 },
];

function fmt(s: number) { return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }

function Congreso() {
  const [roomId, setRoomId] = useState(rooms[0]!.id);
  const room = rooms.find((r) => r.id === roomId)!;
  const [role, setRole] = useState("Concejal");
  const [step, setStep] = useState(2);
  const [votes, setVotes] = useState({ yes: room.bill.yes, no: room.bill.no, abstain: room.bill.abstain });
  const [voted, setVoted] = useState<string | null>(null);
  const [queue, setQueue] = useState<string[]>(["Juan D. Ramírez", "Valentina Cruz"]);
  const [speeches, setSpeeches] = useState(seed);
  const [text, setText] = useState("");
  const [stance, setStance] = useState("A favor");
  const [time, setTime] = useState(180);
  const [running, setRunning] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    setVotes({ yes: room.bill.yes, no: room.bill.no, abstain: room.bill.abstain });
    setVoted(null); setStep(room.live ? 2 : 0); setTime(180); setRunning(false);
  }, [roomId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTime((s) => {
      if (s <= 1) { setRunning(false); toast.warning("⏰ Tiempo agotado"); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [running]);

  const gain = (n: number, msg: string) => { setXp((x) => x + n); toast.success(`${msg} · +${n} XP`); };
  const total = Math.max(1, votes.yes + votes.no + votes.abstain);
  const pct = (n: number) => Math.round((n / total) * 100);
  const cast = (k: "yes" | "no" | "abstain", label: string) => {
    if (voted) return;
    setVotes((v) => ({ ...v, [k]: v[k] + 1 })); setVoted(label); gain(40, `Voto: ${label}`);
  };
  const speak = () => {
    if (text.trim().length < 15) return toast.error("Tu argumento debe tener al menos 15 caracteres");
    setSpeeches([{ n: "Tú", s: stance, t: text, likes: 0 }, ...speeches]); setText(""); gain(60, "Intervención registrada");
  };
  const tone = time < 30 ? "text-coral" : time < 60 ? "text-warning" : "text-primary";

  return (
    <div>
      <PageHeader eyebrow="Democracia en acción" title="Concejo Simulado" desc="Elige una sala, asume un rol, debate con tiempo y vota."
        action={<div className="flex flex-wrap gap-2"><Chip tone="gold">🏆 {xp} XP en sesión</Chip><Chip tone="violet">Rol: {role}</Chip></div>} />

      {/* Salas */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <button key={r.id} onClick={() => setRoomId(r.id)}
            className={`rounded-2xl border p-4 text-left transition ${r.id === roomId ? "border-primary bg-accent ring-2 ring-primary/30" : "bg-card hover:bg-accent/50"}`}>
            <div className="flex items-center justify-between gap-2">
              <Chip tone={r.live ? "coral" : "warning"}>{r.live ? "● En vivo" : "Programada"}</Chip>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" />{r.members}</span>
            </div>
            <p className="mt-3 font-bold">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.type} · +{r.xp} XP</p>
          </button>
        ))}
      </div>

      {/* Roles */}
      <Panel className="mt-6">
        <h3 className="font-bold">Elige tu rol</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {roles.map((r) => (
            <button key={r.k} onClick={() => { setRole(r.k); toast(`Ahora eres ${r.k}`); }}
              className={`rounded-xl border p-3 text-left transition ${role === r.k ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
              <span className="text-2xl">{r.icon}</span>
              <p className="mt-1 text-sm font-semibold">{r.k}</p>
              <p className={`text-xs ${role === r.k ? "opacity-80" : "text-muted-foreground"}`}>{r.d}</p>
            </button>
          ))}
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Ficha */}
        <Panel className="lg:col-span-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary"><FileText className="h-4 w-4" />Ficha de la actividad</div>
          <h2 className="mt-3 text-xl font-bold sm:text-2xl">{room.bill.title}</h2>
          <p className="mt-2 text-muted-foreground">{room.bill.summary}</p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Autor</p><p className="font-semibold">{room.bill.author}</p></div>
            <div className="rounded-xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Duración</p><p className="font-semibold">{room.bill.duration}</p></div>
            <div className="rounded-xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Recompensa</p><p className="font-semibold">+{room.xp} XP</p></div>
          </div>
          <p className="mt-4 text-sm"><b>Objetivo:</b> {room.bill.objective}</p>
          <div className="mt-2 flex flex-wrap gap-2">{room.bill.rules.map((r) => <Chip key={r}>{r}</Chip>)}</div>

          <div className="mt-6 space-y-3">
            {([["A favor", votes.yes, "bg-success"], ["En contra", votes.no, "bg-coral"], ["Abstención", votes.abstain, "bg-muted-foreground"]] as const).map(([l, n, c]) => (
              <div key={l}>
                <div className="flex justify-between text-sm"><span>{l}</span><span className="font-semibold">{n} · {pct(n)}%</span></div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-secondary"><div className={`h-full ${c} transition-all duration-500`} style={{ width: `${pct(n)}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {!room.live ? <p className="text-sm text-muted-foreground">La votación se habilitará cuando inicie la sesión.</p>
              : voted ? <p className="font-semibold text-primary">Tu voto: {voted}</p> : <>
                <PrimaryBtn onClick={() => cast("yes", "A favor")}>Votar a favor</PrimaryBtn>
                <GhostBtn onClick={() => cast("no", "En contra")}>En contra</GhostBtn>
                <GhostBtn onClick={() => cast("abstain", "Abstención")}>Abstenerme</GhostBtn>
              </>}
          </div>
        </Panel>

        <div className="space-y-6">
          {/* Cronómetro */}
          <Panel className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground"><Clock className="h-4 w-4" />Uso de la palabra</div>
            <p className={`mt-3 font-display text-5xl font-bold tabular-nums ${tone}`}>{fmt(time)}</p>
            <Bar value={(time / 180) * 100} className="mt-4" />
            <div className="mt-4 flex justify-center gap-2">
              <PrimaryBtn onClick={() => setRunning(!running)}>{running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{running ? "Pausar" : "Iniciar"}</PrimaryBtn>
              <GhostBtn onClick={() => { setRunning(false); setTime(180); }}><RotateCcw className="h-4 w-4" /></GhostBtn>
            </div>
            {role === "Presidente/a" && queue.length > 0 && (
              <GhostBtn className="mt-3 w-full" onClick={() => { toast(`Palabra a ${queue[0]}`); setQueue(queue.slice(1)); setTime(180); setRunning(true); }}>
                <Gavel className="h-4 w-4" />Dar la palabra a {queue[0]}
              </GhostBtn>
            )}
          </Panel>

          {/* Orden del día */}
          <Panel>
            <h3 className="font-bold">Orden del día</h3>
            <ol className="mt-4 space-y-2 text-sm">
              {room.agenda.map((s, i) => (
                <li key={s} className={`flex gap-3 rounded-lg px-2 py-1.5 ${i < step ? "text-muted-foreground line-through" : i === step ? "bg-accent font-semibold text-primary" : ""}`}><span>{i + 1}.</span>{s}</li>
              ))}
            </ol>
            {(role === "Presidente/a" || role === "Secretario/a") && step < room.agenda.length && (
              <GhostBtn className="mt-4 w-full" onClick={() => { setStep(step + 1); gain(20, "Punto evacuado"); }}>Avanzar orden del día</GhostBtn>
            )}
          </Panel>

          {/* Turnos */}
          <Panel>
            <h3 className="font-bold">Turno de palabra</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {queue.length === 0 ? <li className="text-muted-foreground">Sin solicitudes</li> : queue.map((q, i) => <li key={q + i} className="flex gap-2"><span className="font-bold text-primary">{i + 1}</span>{q}</li>)}
            </ul>
            <GhostBtn className="mt-4 w-full" onClick={() => { if (!queue.includes("Tú")) { setQueue([...queue, "Tú"]); toast("Solicitud enviada a la presidencia"); } }}><Hand className="h-4 w-4" />Pedir la palabra</GhostBtn>
          </Panel>
        </div>
      </div>

      {/* Intervenciones */}
      <Panel className="mt-6">
        <h3 className="font-bold">Intervenciones</h3>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <select value={stance} onChange={(e) => setStance(e.target.value)} className="rounded-xl border bg-background px-3 py-2.5 text-sm">
            <option>A favor</option><option>En contra</option><option>Propuesta</option>
          </select>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu argumento..." className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-2.5 text-sm" />
          <PrimaryBtn onClick={speak}>Intervenir</PrimaryBtn>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {speeches.map((s, i) => (
            <div key={i} className="rounded-xl bg-secondary p-4">
              <div className="flex items-center justify-between gap-2"><p className="truncate font-semibold">{s.n}</p><Chip tone={s.s === "A favor" ? "success" : s.s === "En contra" ? "coral" : "violet"}>{s.s}</Chip></div>
              <p className="mt-2 text-sm text-muted-foreground">"{s.t}"</p>
              <button onClick={() => setSpeeches(speeches.map((x, j) => j === i ? { ...x, likes: x.likes + 1 } : x))} className="mt-3 text-xs font-semibold text-primary">👏 {s.likes} buen argumento</button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="mt-6">
        <div className="flex items-center gap-2 font-bold"><Trophy className="h-4 w-4 text-gold" />Ranking de la sesión</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[["Santiago Rojas", 320], ["Laura Méndez", 280], ["Tú", xp]].sort((a, b) => (b[1] as number) - (a[1] as number)).map(([n, p], i) => (
            <div key={n as string} className="flex items-center justify-between rounded-xl bg-secondary p-3 text-sm"><span>{["🥇", "🥈", "🥉"][i]} {n}</span><b>{p} XP</b></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
