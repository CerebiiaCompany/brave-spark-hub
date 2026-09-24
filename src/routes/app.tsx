import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Home, BookOpen, Landmark, Building2, Rocket, Lightbulb, Trophy, Brain, Handshake, Target, Search, Map, User, BarChart3, Menu, X, Bell, Flame,
} from "lucide-react";
import { Logo } from "@/components/Brand";
import { user } from "@/lib/data";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [
    { title: "Mi Centro — Liderazgo Valiente" },
    { name: "description", content: "Espacio personal de formación, proyectos y simulaciones de liderazgo." },
    { property: "og:title", content: "Mi Centro — Liderazgo Valiente" },
    { property: "og:description", content: "Espacio personal de formación, proyectos y simulaciones de liderazgo." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
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
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <div className="flex min-h-screen bg-secondary/50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <button className="grid h-11 w-11 place-items-center rounded-lg hover:bg-sidebar-accent lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X className="h-5 w-5" /></button>
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
        <header className="sticky top-0 z-30 grid h-16 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 border-b bg-background/85 px-2 backdrop-blur sm:px-5 lg:flex lg:justify-between">
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-lg hover:bg-accent lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu className="h-5 w-5" /></button>
          <div className="hidden text-sm text-muted-foreground lg:block">Centro para el Liderazgo Valiente Miguel Uribe Turbay</div>
          <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-4">
            <span className="flex items-center gap-1 text-sm font-semibold"><Flame className="h-4 w-4 text-coral" />{user.streak}</span>
            <span className="truncate rounded-full bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">{user.xp.toLocaleString("es-CO")} XP</span>
            <button className="grid h-10 w-10 shrink-0 place-items-center rounded-lg hover:bg-accent" aria-label="Notificaciones"><Bell className="h-5 w-5 text-muted-foreground" /></button>
            <Link to="/app/perfil" aria-label="Abrir mi perfil" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-navy-foreground">MG</Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl overflow-x-hidden px-4 py-5 sm:px-5 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
