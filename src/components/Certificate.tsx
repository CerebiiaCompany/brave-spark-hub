import { Download, Printer, Share2, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { user } from "@/lib/data";
import { certCode, downloadCertificatePdf, type Course } from "@/lib/course-content";
import { Logo } from "@/components/Brand";
import { GhostBtn, PrimaryBtn } from "@/components/ui-kit";

export function certData(c: Course, date = new Date()) {
  return {
    name: user.name,
    course: c.title,
    hours: c.hours,
    path: c.path,
    code: certCode(c.id, user.name),
    date: date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }),
  };
}

export function CertificateModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const d = certData(course);
  const share = async () => {
    const text = `Obtuve el certificado "${d.course}" (${d.hours} h) del Centro para el Liderazgo Valiente. Código: ${d.code}`;
    try {
      if (navigator.share) await navigator.share({ title: "Mi certificado", text });
      else { await navigator.clipboard.writeText(text); toast.success("Texto del certificado copiado"); }
    } catch { /* cancelado */ }
  };
  return (
    <div className="cert-print-root fixed inset-0 z-[70] flex items-end bg-navy/50 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-label="Certificado">
      <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-background p-4 shadow-lift sm:max-w-4xl sm:rounded-2xl sm:p-6">
        <div className="no-print mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Certificado oficial</h2>
          <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-accent" aria-label="Cerrar certificado"><X className="h-5 w-5" /></button>
        </div>
        <div className="cert-sheet relative rounded-xl border-4 border-navy bg-card p-2">
          <div className="rounded-lg border border-gold px-5 py-8 text-center sm:px-12 sm:py-12">
            <div className="flex justify-center"><Logo /></div>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Certificado de aprobación</p>
            <p className="mt-5 text-sm text-muted-foreground">Se certifica que</p>
            <p className="mt-2 font-display text-3xl font-bold sm:text-4xl">{d.name}</p>
            <p className="mt-4 text-sm text-muted-foreground">completó satisfactoriamente el curso</p>
            <p className="mt-2 text-xl font-bold text-primary sm:text-2xl">{d.course}</p>
            <div className="mx-auto mt-6 grid max-w-xl gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-lg bg-secondary p-3"><p className="text-xs text-muted-foreground">Intensidad horaria</p><p className="font-bold">{d.hours} horas</p></div>
              <div className="rounded-lg bg-secondary p-3"><p className="text-xs text-muted-foreground">Fecha</p><p className="font-bold">{d.date}</p></div>
              <div className="rounded-lg bg-secondary p-3"><p className="text-xs text-muted-foreground">Ruta</p><p className="font-bold">{d.path}</p></div>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-navy"><ShieldCheck className="h-4 w-4 text-success" /> Código de verificación: <span className="font-mono">{d.code}</span></p>
          </div>
        </div>
        <div className="no-print mt-4 grid gap-2 sm:grid-cols-3">
          <PrimaryBtn onClick={() => downloadCertificatePdf(d)}><Download className="h-4 w-4" /> Descargar PDF</PrimaryBtn>
          <GhostBtn onClick={() => window.print()}><Printer className="h-4 w-4" /> Imprimir</GhostBtn>
          <GhostBtn onClick={share}><Share2 className="h-4 w-4" /> Compartir</GhostBtn>
        </div>
      </div>
    </div>
  );
}
