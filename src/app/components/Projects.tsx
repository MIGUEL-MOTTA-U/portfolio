import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { profileData } from "../data/profileData";
import type { Project } from "../data/profileData";
import { LiveSites } from "./LiveSites";
import { Etiqueta } from "./Etiqueta";
import { VerMas, etiquetaVerMas } from "./VerMas";

/** En móvil (menos de 768 px) se ven los 2 primeros proyectos y el resto queda tras «Ver más» (UI-SPEC D14). */
const VISIBLES_MOVIL = 2;

function ProjectCard({ project, index, oculto }: { project: Project; index: number; oculto: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const chips = (project.chips ?? project.stack).slice(0, 4);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-foreground/20 md:p-8 ${
        oculto ? "max-md:hidden" : ""
      }`}
    >
      <div className="flex flex-col gap-3">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{project.type}</span>
        <h3 className="text-xl font-bold leading-[1.3] text-foreground">{project.title}</h3>
        <p className="text-sm leading-[1.625] text-muted-foreground">{project.summary ?? project.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
          {chips.map((tech) => (
            <li key={tech} className="rounded-lg border border-border bg-secondary px-3 py-1 font-mono text-[10px] font-bold text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {expanded && project.details && (
        <motion.div
          id={`detalles-${index}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="mt-6 space-y-5 overflow-hidden border-t border-border pt-6"
        >
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">El Problema</div>
            <p className="text-xs leading-relaxed text-muted-foreground">{project.details.problem}</p>
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">La Solución</div>
            <p className="text-xs leading-relaxed text-muted-foreground">{project.details.solution}</p>
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">Arquitectura</div>
            <p className="rounded-lg border border-border bg-secondary p-3 font-mono text-xs leading-relaxed text-muted-foreground">
              {project.details.architecture}
            </p>
          </div>
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">Desafíos Técnicos</div>
            <p className="text-xs leading-relaxed text-muted-foreground">{project.details.challenges}</p>
          </div>
          <div className="pt-2">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">Stack Tecnológico</div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-lg border border-border bg-secondary px-3 py-1 font-mono text-[10px] font-bold text-muted-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={expanded ? `detalles-${index}` : undefined}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-[160ms] ease-out hover:bg-accent hover:text-accent-foreground md:h-11"
        >
          {expanded ? "Ocultar detalles" : "Ver más detalles"}
          <ChevronDown
            className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  );
}

function ProyectosTecnicos({ projects }: { projects: Project[] }) {
  const [expandido, setExpandido] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  if (projects.length === 0) return null;

  const ocultos = Math.max(0, projects.length - VISIBLES_MOVIL);

  const alternar = () => {
    const siguiente = !expandido;
    setExpandido(siguiente);
    if (!siguiente) {
      requestAnimationFrame(() => {
        const el = document.getElementById("proyectos-tecnicos");
        if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
      });
    }
  };

  return (
    <div className="mt-20 lg:mt-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8 flex justify-center lg:mb-12"
      >
        <Etiqueta id="proyectos-tecnicos">Proyectos técnicos</Etiqueta>
      </motion.div>

      <div id="lista-proyectos" role="list" aria-labelledby="proyectos-tecnicos" className="grid grid-cols-1 items-stretch gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-y-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} oculto={i >= VISIBLES_MOVIL && !expandido} />
        ))}
      </div>

      {ocultos > 0 && (
        <VerMas
          expandido={expandido}
          onToggle={alternar}
          etiqueta={etiquetaVerMas(ocultos, "proyecto", "proyectos")}
          controla="lista-proyectos"
        />
      )}
    </div>
  );
}

export function Projects() {
  const { sections } = profileData;
  const visibles = sections.projects.items.filter((p) => p.visible);
  const projects = visibles.filter((p) => !p.demo);
  const sitios = visibles.filter((p) => p.demo);

  if (!sections.projects.visible || (projects.length === 0 && sitios.length === 0)) return null;

  return (
    <section id="projects" className="relative bg-background pb-20 pt-6 lg:pb-28 lg:pt-10">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <LiveSites sites={sitios} />
        <ProyectosTecnicos projects={projects} />
      </div>
    </section>
  );
}
