import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, TrendingUp, Users, Zap, Shield, ExternalLink } from "lucide-react";
import { profileData, Project } from "../data/profileData";

const tagColorMap: Record<string, string> = {
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  // Inferred properties for visual variety based on index
  const gradients = [
    "from-violet-600/20 to-indigo-600/10",
    "from-emerald-600/20 to-cyan-600/10",
    "from-amber-600/20 to-orange-600/10",
    "from-cyan-600/20 to-blue-600/10",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl border border-border bg-card hover:border-foreground/20 transition-all duration-500 overflow-hidden"
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${gradient.replace('/20', '/60').replace('/10', '/30')}`} />

      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative p-7">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
              {project.type}
            </span>
            <h3 className="text-foreground font-bold text-lg leading-snug">{project.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          {project.metrics && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-indigo-400/90">{project.metrics}</span>
            </div>
          )}
          
          {expanded && project.details && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="mt-6 pt-6 border-t border-border space-y-5"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1.5">El Problema</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{project.details.problem}</p>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1.5">La Solución</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{project.details.solution}</p>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">Arquitectura</div>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed bg-secondary/30 p-2.5 rounded-lg border border-border/50">{project.details.architecture}</p>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-1.5">Desafíos Técnicos</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{project.details.challenges}</p>
              </div>
              
              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3">Stack Tecnológico</div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-bold font-mono text-muted-foreground bg-secondary/50 border border-border rounded-lg hover:border-indigo-500/30 transition-all">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full py-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/30 hover:bg-secondary/60 rounded-xl transition-all font-bold uppercase tracking-widest"
        >
          {expanded ? "Ocultar Detalles" : "Ver más detalles"}
          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`} />
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { sections } = profileData;
  const projects = sections.projects.items.filter(p => p.visible);

  if (!sections.projects.visible || projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-32 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-5">
            Portafolio de Proyectos
          </span>
          <h2
            className="text-foreground font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Arquitecturas de{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Alto Impacto
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Soluciones reales diseñadas para escalar, con enfoque en backend, cloud e integración de IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
