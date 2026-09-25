import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Landmark, Building2, Rocket, MapPin, Search, FlaskConical, Trophy, Flame, Award, Star, GitBranch, Target, Medal } from "lucide-react";
import { Logo, PortraitPlaceholder } from "@/components/Brand";
import { paths, projects, impact, allies } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Centro para el Liderazgo Valiente Miguel Uribe Turbay" },
      { name: "description", content: "Formamos jóvenes para comprender, transformar y liderar su territorio: rutas, simulaciones, incubadora y retos." },
      { property: "og:title", content: "Centro para el Liderazgo Valiente Miguel Uribe Turbay" },
      { property: "og:description", content: "Formamos jóvenes para comprender, transformar y liderar su territorio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const steps = ["Aprender", "Simular", "Crear", "Debatir", "Resolver", "Impactar"];
const experiences = [
  { icon: Landmark, title: "Congreso / Concejo Simulado", desc: "Debate, vota y aprueba proyectos como un concejal real." },
  { icon: Building2, title: "Laboratorio de Gobierno", desc: "Administra un municipio y toma decisiones con presupuesto limitado." },
  { icon: Rocket, title: "Incubadora Empresarial", desc: "De la idea al Demo Day con mentores y aliados." },
  { icon: MapPin, title: "Retos de Zona de Frontera", desc: "Soluciones reales para los desafíos binacionales." },
  { icon: Search, title: "Laboratorio de Información", desc: "Verifica datos, detecta desinformación y piensa crítico." },
  { icon: FlaskConical, title: "Laboratorio de Proyectos", desc: "Construye en equipo proyectos con impacto medible." },
];
const game = [
  { icon: Star, t: "Niveles", d: "De Explorador a Líder Valiente" },
  { icon: Flame, t: "XP y rachas", d: "Suma puntos cada día" },
  { icon: Award, t: "Insignias", d: "Más de 40 logros" },
  { icon: GitBranch, t: "Árbol de habilidades", d: "Visualiza tu crecimiento" },
  { icon: Target, t: "Retos", d: "Semanales y territoriales" },
  { icon: Trophy, t: "Ranking", d: "Competencia sana" },
  { icon: Medal, t: "Certificados", d: "Verificables y compartibles" },
];

function Landing() {
  return (
    <div className="bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#rutas" className="hover:text-foreground">Rutas</a>
            <a href="#experiencias" className="hover:text-foreground">Experiencias</a>
            <a href="#impacto" className="hover:text-foreground">Impacto</a>
          </nav>
          <Link to="/app" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-bright">Entrar</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Miguel Uribe Turbay
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.02] text-navy md:text-7xl">
              Centro para el <span className="text-primary">Liderazgo Valiente</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Formamos jóvenes para comprender, transformar y liderar su territorio.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app/diagnostico" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lift hover:bg-bright">
                Comenzar mi formación <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/app" className="rounded-xl border bg-background px-6 py-3.5 font-semibold text-foreground hover:bg-accent">
                Explorar el Centro
              </Link>
            </div>
            <a href="#rutas" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Conocer los programas <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <PortraitPlaceholder className="aspect-[4/5] w-full" />
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">¿Qué es el Centro?</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">No venimos solamente a enseñar liderazgo. Venimos a ponerlo en práctica.</h2>
          </div>
          <div>
            <p className="text-muted-foreground">Un espacio para formar jóvenes capaces de comprender el Estado, crear empresas, dirigir organizaciones, debatir ideas, analizar información y participar responsablemente en la sociedad.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Liderazgo público", "Liderazgo empresarial", "Liderazgo social", "Innovación", "Pensamiento crítico", "Emprendimiento", "Participación ciudadana"].map((t) => (
                <span key={t} className="rounded-full border bg-background px-3 py-1.5 text-sm font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rutas */}
      <section id="rutas" className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Elige tu camino</p>
        <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Tres rutas, un mismo propósito</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {paths.map((p) => (
            <div key={p.id} className="card-hover flex flex-col rounded-3xl border bg-card p-7 shadow-soft">
              <span className="text-4xl">{p.emoji}</span>
              <h3 className="mt-5 text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.skills.map((s) => <span key={s} className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">{s}</span>)}
              </div>
              <div className="mt-6 flex gap-6 border-t pt-5 text-sm">
                <div><p className="font-display text-xl font-bold">{p.courses}</p><p className="text-muted-foreground">cursos</p></div>
                <div><p className="font-display text-xl font-bold">{p.projects}</p><p className="text-muted-foreground">proyectos</p></div>
              </div>
              <Link to="/app/formacion" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">Explorar ruta <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Aprende haciendo */}
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Aprende haciendo</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
            {steps.map((s, i) => (
              <div key={s} className="group relative rounded-2xl border border-navy-foreground/15 p-5 transition hover:bg-navy-foreground/10">
                <p className="font-display text-sm text-navy-foreground/50">0{i + 1}</p>
                <p className="mt-2 font-display text-lg font-bold">{s}</p>
                {i < steps.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-bright md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencias */}
      <section id="experiencias" className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Experiencias</p>
        <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Simula, crea y decide</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e) => (
            <div key={e.title} className="card-hover rounded-2xl border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><e.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-lg font-bold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gamificación */}
      <section className="border-y bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="text-3xl font-bold text-navy md:text-4xl">Tu progreso, visible en cada paso</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {game.map((g) => (
              <div key={g.t} className="rounded-2xl border bg-card p-5 text-center shadow-soft">
                <g.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 font-display font-bold">{g.t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-bold text-navy md:text-4xl">Proyectos creados por jóvenes</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-6 shadow-soft">
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">{p.category} · {p.stage}</span>
              <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-5 text-sm font-medium">{p.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alianzas */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Alianzas</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {allies.map((a) => (
            <div key={a.name} className="grid h-20 place-items-center rounded-xl border bg-secondary px-3 text-center text-sm font-semibold text-muted-foreground">{a.type}</div>
          ))}
        </div>
      </section>

      {/* Impacto */}
      <section id="impacto" className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Impacto en el territorio</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
            {[
              [impact.youth.toLocaleString("es-CO"), "jóvenes formados"],
              [impact.projects, "proyectos creados"],
              [impact.hours.toLocaleString("es-CO"), "horas de formación"],
              [impact.challenges, "retos solucionados"],
              [impact.ventures, "emprendimientos"],
              [impact.towns, "municipios"],
              [impact.allies, "alianzas"],
            ].map(([v, l]) => (
              <div key={l as string}>
                <p className="font-display text-3xl font-bold">{v}</p>
                <p className="mt-1 text-sm text-navy-foreground/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 className="text-4xl font-extrabold text-navy md:text-5xl">Tu liderazgo comienza con una decisión.</h2>
        <Link to="/app/diagnostico" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lift hover:bg-bright">
          Comenzar ahora <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <p>© 2026 Centro para el Liderazgo Valiente Miguel Uribe Turbay</p>
        </div>
      </footer>
    </div>
  );
}
