import { ChevronDown, ChevronUp } from "lucide-react";

/** Texto del botón «Ver más» según cuántos elementos quedan ocultos (UI-SPEC §4.4, D14). */
export function etiquetaVerMas(ocultos: number, singular: string, plural: string) {
  return `Ver ${ocultos} ${ocultos === 1 ? singular : plural} más`;
}

/**
 * Botón «Ver más» / «Ver menos». Solo se ve por debajo de 768 px: desde ahí se muestran todas las tarjetas.
 * Las tarjetas ocultas llevan `max-md:hidden`, así que salen del árbol de accesibilidad y sus miniaturas no se descargan.
 */
export function VerMas({
  expandido,
  onToggle,
  etiqueta,
  controla,
}: {
  expandido: boolean;
  onToggle: () => void;
  etiqueta: string;
  controla: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expandido}
      aria-controls={controla}
      className="mt-8 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-[1.5px] border-foreground bg-background text-base font-semibold text-foreground transition-[background-color,color,transform] duration-[160ms] ease-out hover:bg-accent hover:text-accent-foreground active:scale-[0.98] active:duration-100 motion-reduce:active:scale-100 md:hidden"
    >
      {expandido ? "Ver menos" : etiqueta}
      {expandido ? <ChevronUp className="size-[18px]" aria-hidden="true" /> : <ChevronDown className="size-[18px]" aria-hidden="true" />}
    </button>
  );
}
