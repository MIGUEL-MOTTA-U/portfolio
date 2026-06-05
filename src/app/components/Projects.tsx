import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, TrendingUp, Users, Zap, Shield } from "lucide-react";

const projects = [
  {
    id: 1,
    category: "Plataforma IA",
    tag: "EdTech",
    tagColor: "violet",
    title: "Plataforma Educativa Impulsada por IA",
    problem: "Una institución educativa necesitaba personalizar el aprendizaje para 50,000 estudiantes con recursos limitados de docentes.",
    solution: "Plataforma cloud-native con agentes de IA que generan rutas de aprendizaje adaptativas, analítica en tiempo real y tutorías automáticas mediante LLMs.",
    architecture: "Microservicios en AWS · Event-driven con SQS · RAG sobre contenido educativo · LLM fine-tuning",
    stack: ["Java", "Spring Boot", "React", "AWS", "PostgreSQL", "Redis", "LangChain", "OpenAI"],
    metrics: [
      { icon: TrendingUp, value: "340%", label: "Mejora en retención" },
      { icon: Users, value: "50K+", label: "Estudiantes activos" },
      { icon: Zap, value: "<200ms", label: "Latencia de respuesta" },
    ],
    gradient: "from-violet-600/20 to-indigo-600/10",
    accentColor: "violet",
  },
  {
    id: 2,
    category: "Arquitectura Cloud",
    tag: "FinTech",
    tagColor: "emerald",
    title: "Migración Microservicios Enterprise",
    problem: "Empresa fintech con monolito legacy en Java que no podía escalar en temporadas de alto volumen transaccional.",
    solution: "Diseño e implementación de arquitectura de microservicios con orquestación en Kubernetes, APIs gateway y pipelines CI/CD totalmente automatizados.",
    architecture: "12 microservicios · API Gateway · Kafka para eventos · Kubernetes en AWS EKS · Blue-Green deployment",
    stack: ["Java", "Spring Cloud", "Kafka", "Docker", "Kubernetes", "PostgreSQL", "Redis", "GitHub Actions"],
    metrics: [
      { icon: TrendingUp, value: "10x", label: "Capacidad de escala" },
      { icon: Zap, value: "75%", label: "Reducción de costos cloud" },
      { icon: Shield, value: "99.99%", label: "Uptime alcanzado" },
    ],
    gradient: "from-emerald-600/20 to-cyan-600/10",
    accentColor: "emerald",
  },
  {
    id: 3,
    category: "Automatización",
    tag: "Enterprise",
    tagColor: "amber",
    title: "Sistema de Automatización de Procesos",
    problem: "Empresa manufacturera con 200+ procesos manuales que consumían 3,000 horas/mes en tareas repetitivas y propensos a errores humanos.",
    solution: "Plataforma de automatización con agentes de IA, integraciones con ERP/CRM existentes y dashboards de monitoreo en tiempo real.",
    architecture: "Python workers · REST APIs · Webhooks · Azure Functions · PostgreSQL · Power BI dashboards",
    stack: ["Python", "FastAPI", "Azure", "PostgreSQL", "Redis", "React", "Docker", "GitHub Actions"],
    metrics: [
      { icon: Zap, value: "3,200h", label: "Ahorro mensual" },
      { icon: TrendingUp, value: "97%", label: "Reducción de errores" },
      { icon: Users, value: "40+", label: "Procesos automatizados" },
    ],
    gradient: "from-amber-600/20 to-orange-600/10",
    accentColor: "amber",
  },
  {
    id: 4,
    category: "SaaS Cloud-Native",
    tag: "B2B SaaS",
    tagColor: "cyan",
    title: "Plataforma SaaS Multi-Tenant",
    problem: "Startup B2B necesitaba una plataforma multi-tenant capaz de aislar datos por cliente, escalar on-demand y lanzar al mercado en 4 meses.",
    solution: "Arquitectura multi-tenant con aislamiento por schema en PostgreSQL, autenticación con JWT/OAuth2, onboarding automatizado y billing integrado.",
    architecture: "Multi-tenant · JWT/OAuth2 · Stripe integration · AWS RDS · CDN global · Observability stack",
    stack: ["TypeScript", "Node.js", "React", "AWS", "PostgreSQL", "Redis", "Stripe", "GitHub Actions"],
    metrics: [
      { icon: TrendingUp, value: "4 meses", label: "De idea a producción" },
      { icon: Users, value: "30+", label: "Empresas onboarded" },
      { icon: Zap, value: "0 downtime", label: "En 18 meses" },
    ],
    gradient: "from-cyan-600/20 to-blue-600/10",
    accentColor: "cyan",
  },
];

const tagColorMap: Record<string, string> = {
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl border border-border bg-card hover:border-foreground/20 transition-all duration-500 overflow-hidden"
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${project.gradient.replace('/20', '/60').replace('/10', '/30')}`} />

      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative p-7">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
              {project.category}
            </span>
            <h3 className="text-foreground font-bold text-lg leading-snug">{project.title}</h3>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${tagColorMap[project.tagColor]} shrink-0 ml-4`}>
            {project.tag}
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Problema</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Solución</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Arquitectura</div>
              <p className="text-sm font-mono text-muted-foreground leading-relaxed">{project.architecture}</p>
            </motion.div>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-card border border-border rounded">
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
          {project.metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-1">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="text-foreground font-bold text-lg leading-none mb-1">{m.value}</div>
                <div className="text-muted-foreground text-xs leading-tight">{m.label}</div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-indigo-400 transition-colors font-medium"
        >
          {expanded ? "Ver menos" : "Ver arquitectura"}
          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
            Casos de Éxito
          </span>
          <h2
            className="text-foreground font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Proyectos que{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              generaron impacto
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Soluciones reales, con arquitecturas reales, midiendo resultados de negocio concretos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
