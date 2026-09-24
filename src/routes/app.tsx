import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home, BookOpen, Landmark, Building2, Rocket, Lightbulb, Trophy, Brain, Handshake, Target, Search, Map, User, BarChart3, Menu, X, Bell, Flame,
} from "lucide-react";
import { Logo } from "@/components/Brand";
import { user } from "@/lib/data";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Mi Centro — Liderazgo Valiente" }, { name: "robots", content: "noindex" }] }),
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "Inicio", icon: Home },
  { to: "/app/formacion", label: "Mi formación", icon: BookOpen },
  { to: "/app/congreso", label: "Congreso / Concejo", icon: Landmark },
  { to: "/app/gobierno", label: "Laboratorio de Gobierno", icon: Building2 },
  { to: "/app/proyectos", label: "Proyectos", icon: Rocket },
  { to: "/app/incubadora", label: "Incubadora", icon: Lightbulb },
  { to: "/app/retos", label: "Retos", icon: Target },
  { to: "/app/informacion", label: "Lab. de Información", icon: Search },
  { to: "/app/logros", label: "Mis logros", icon: Trophy },
  { to: "/app/diagnostico", label: "Diagnóstico IA", icon: Brain },
  { to: "/app/alianzas", label: "Alianzas", icon: Handshake },
  { to: "/app/territorio", label: "Territorio", icon: Map },
  { to: "/app/impacto", label: "Impacto", icon: BarChart3 },
  { to: "/app/perfil", label: "Mi perfil", icon: User },
] as const;

function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-secondary/50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X className="h-5 w-5" /></button>
        </div>
        <nav className="h-[calc(100vh-4rem)] space-y-0.5 overflow-y-auto px-3 pb-6">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/app" }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" }}
            >
              <n.icon className="h-[18px] w-[18px]" /> {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-navy/30 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-5 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu className="h-5 w-5" /></button>
          <div className="hidden text-sm text-muted-foreground lg:block">Centro para el Liderazgo Valiente Miguel Uribe Turbay</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm font-semibold"><Flame className="h-4 w-4 text-coral" />{user.streak}</span>
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">{user.xp.toLocaleString("es-CO")} XP</span>
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Link to="/app/perfil" className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">MG</Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
