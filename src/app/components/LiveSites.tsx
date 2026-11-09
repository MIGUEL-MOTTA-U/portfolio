import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, ImageOff } from "lucide-react";
import type { Project } from "../data/profileData";

type EstadoMiniatura = "cargando" | "listo" | "error";

/** Miniatura 16:10 con esqueleto mientras carga y mensaje si falla (A2). */
function Miniatura({ project }: { project: Project }) {
  const preview = project.demo?.preview;
  const [estado, setEstado] = useState<EstadoMiniatura>(preview ? "cargando" : "error");

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-secondary/50">
      {preview && estado !== "error" && (
        <picture>
          <source type="image/avif" srcSet={preview.avif} />
          <img
            ref={(el) => {
              if (el && el.complete && el.naturalWidth > 0 && estado === "cargando") setEstado("listo");
            }}
            src={preview.webp}
            alt={preview.alt}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            onLoad={() => setEstado("listo")}
            onError={() => setEstado("error")}
            className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              estado === "listo" ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      )}

      {estado === "cargando" && <div className="absolute inset-0 animate-pulse bg-secondary/50 motion-reduce:animate-none" aria-hidden="true" />}

      {estado === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-secondary/30 text-muted-foreground">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm">Vista previa no disponible</span>
        </div>
      )}

      {estado === "listo" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
      )}

      {project.demo?.exampleBadge && estado !== "error" && (
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/25 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
          Sitio de ejemplo
        </span>
      )}
    </div>
  );
}

function SiteCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducido = useReducedMotion();
  const demo = project.demo!;
  const chips = (demo.chips ?? project.stack).slice(0, 3);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: reducido ? 0 : 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-foreground/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" />

      <Miniatura project={project} />

      <div className="relative flex flex-1 flex-col p-7">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{project.type}</span>
        <h3 className="text-lg font-bold leading-snug text-foreground">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{demo.summary ?? project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
          {chips.map((tech) => (
            <li key={tech} className="rounded-lg border border-border bg-secondary/50 px-3 py-1 font-mono text-[10px] font-bold text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir sitio: «${project.title}» (se abre en una pestaña nueva)`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-transform duration-100 hover:bg-indigo-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:active:scale-100"
          >
            Abrir sitio
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/** Bloque «Sitios en vivo» (A1): demos desplegadas que se pueden abrir. No se dibuja si no hay ninguna. */
export function LiveSites({ sites }: { sites: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  if (sites.length === 0) return null;

  const rejilla =
    sites.length >= 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : sites.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "mx-auto max-w-xl grid-cols-1";

  return (
    <div className="mt-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <span
          id="sitios-en-vivo"
          className="mb-5 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400"
        >
          Sitios en vivo
        </span>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">Demos publicadas que puedes abrir y probar tú mismo.</p>
      </motion.div>

      <ul aria-labelledby="sitios-en-vivo" className={`grid items-stretch gap-6 ${rejilla}`}>
        {sites.map((site, i) => (
          <li key={site.title} className="flex">
            <SiteCard project={site} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
