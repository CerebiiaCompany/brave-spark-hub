import { Link } from "@tanstack/react-router";
import miguelPortrait from "@/assets/miguel-uribe.png.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-navy-foreground font-display text-sm font-bold">
        LV
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-sm font-bold text-foreground">Liderazgo Valiente</span>
          <span className="block text-[11px] text-muted-foreground">Centro Miguel Uribe Turbay</span>
        </span>
      )}
    </Link>
  );
}

/** Placeholder until the official authorized portrait is provided. */
export function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-b from-accent to-background ${className}`}
      aria-label="Espacio para el retrato oficial autorizado de Miguel Uribe Turbay"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <svg viewBox="0 0 200 240" className="absolute bottom-0 left-1/2 h-[88%] -translate-x-1/2 text-primary/25" fill="currentColor">
        <circle cx="100" cy="78" r="44" />
        <path d="M20 240c0-56 36-92 80-92s80 36 80 92z" />
      </svg>
      <div className="absolute inset-x-4 bottom-4 rounded-xl bg-background/85 p-3 text-center backdrop-blur">
        <p className="font-display text-sm font-semibold text-navy">Miguel Uribe Turbay</p>
        <p className="text-[11px] text-muted-foreground">Espacio para imagen oficial autorizada</p>
      </div>
    </div>
  );
}
