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

/** Retrato oficial autorizado de Miguel Uribe Turbay. */
export function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-b from-accent to-background ${className}`}
      aria-label="Retrato oficial de Miguel Uribe Turbay"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <img
        src={miguelPortrait.url}
        alt="Miguel Uribe Turbay"
        className="absolute inset-0 m-auto h-full w-full object-contain object-bottom px-3 pb-0 pt-6 drop-shadow-[0_24px_40px_oklch(0.24_0.08_264/0.35)]"
      />
    </div>
  );
}
