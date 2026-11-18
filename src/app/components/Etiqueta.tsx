import type { ReactNode } from "react";

/** Etiqueta de sección: píldora en mayúsculas con tracking amplio (UI-SPEC §3 y §4). */
export function Etiqueta({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <span
      id={id}
      className={`inline-flex rounded-full border border-primary/20 bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent-soft-text ${className}`}
    >
      {children}
    </span>
  );
}
