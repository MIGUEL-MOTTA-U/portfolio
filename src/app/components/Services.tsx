import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Server, Layers, Cloud, GitBranch, Bot, Shield, Zap, Code2, BarChart2, RefreshCw,
} from "lucide-react";

const services = [
  {
    icon: Server,
    title: "Backend Engineering",
    description: "APIs de alto rendimiento, microservicios resilientes y arquitecturas distribuidas que manejan millones de solicitudes.",
    tags: ["Java", "Spring Boot", "Node.js", "Python"],
    color: "indigo",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    description: "Desarrollo end-to-end desde la base de datos hasta la interfaz de usuario. Experiencias digitales rápidas y escalables.",
    tags: ["React", "TypeScript", "REST", "GraphQL"],
    color: "violet",
  },
  {
    icon: Cloud,
    title: "Arquitectura Cloud",
    description: "Diseño e implementación de infraestructura cloud-native en AWS y Azure. Escalabilidad automática y alta disponibilidad.",
    tags: ["AWS", "Azure", "Serverless", "IaC"],
    color: "cyan",
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description: "Pipelines de integración y despliegue continuo, contenedores y automatización de infraestructura para entregas sin fricción.",
    tags: ["Docker", "GitHub Actions", "Kubernetes", "Terraform"],
    color: "emerald",
  },
  {
    icon: Bot,
    title: "Inteligencia Artificial",
    description: "Agentes de IA, modelos LLM integrados en productos y flujos de trabajo inteligentes que transforman la operación empresarial.",
    tags: ["LLM", "LangChain", "RAG", "Agents"],
    color: "amber",
  },
  {
    icon: Zap,
    title: "Automatización Empresarial",
    description: "Eliminación de procesos manuales mediante automatización inteligente. Ahorra horas de trabajo y reduce errores operativos.",
    tags: ["RPA", "Workflows", "Integrations", "APIs"],
    color: "orange",
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description: "Arquitecturas seguras desde el diseño. Autenticación robusta, cifrado de datos y cumplimiento de estándares internacionales.",
    tags: ["OAuth2", "JWT", "OWASP", "Encryption"],
    color: "rose",
  },
  {
    icon: Code2,
    title: "APIs Empresariales",
    description: "Diseño e implementación de APIs RESTful y GraphQL escalables, bien documentadas y preparadas para integraciones externas.",
    tags: ["REST", "GraphQL", "OpenAPI", "Webhooks"],
    color: "blue",
  },
  {
    icon: BarChart2,
    title: "Consultoría Técnica",
    description: "Auditoría de arquitectura, definición de roadmap tecnológico y acompañamiento estratégico para equipos de ingeniería.",
    tags: ["Architecture", "SOLID", "Review", "Strategy"],
    color: "purple",
  },
  {
    icon: RefreshCw,
    title: "Modernización Tecnológica",
    description: "Migración de sistemas legacy a arquitecturas modernas. Menos deuda técnica, mejor rendimiento y mayor mantenibilidad.",
    tags: ["Migration", "Refactoring", "Cloud", "Patterns"],
    color: "teal",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400", glow: "hover:border-indigo-500/40 hover:shadow-indigo-500/10" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", glow: "hover:border-violet-500/40 hover:shadow-violet-500/10" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", glow: "hover:border-cyan-500/40 hover:shadow-cyan-500/10" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "hover:border-emerald-500/40 hover:shadow-emerald-500/10" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "hover:border-amber-500/40 hover:shadow-amber-500/10" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400", glow: "hover:border-orange-500/40 hover:shadow-orange-500/10" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", glow: "hover:border-rose-500/40 hover:shadow-rose-500/10" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", glow: "hover:border-blue-500/40 hover:shadow-blue-500/10" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", glow: "hover:border-purple-500/40 hover:shadow-purple-500/10" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400", glow: "hover:border-teal-500/40 hover:shadow-teal-500/10" },
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const colors = colorMap[service.color];
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-6 rounded-2xl bg-card border border-border ${colors.glow} hover:shadow-xl transition-all duration-300 cursor-default`}
    >
      <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-5`}>
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      <h3 className="text-foreground font-semibold mb-2.5 text-base">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-card border border-border rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 bg-background">
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-5">
            Servicios
          </span>
          <h2
            className="text-foreground font-bold mb-4 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Soluciones de ingeniería{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              de nivel enterprise
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Desde la arquitectura inicial hasta el despliegue en producción. Construyo, escalo y mantengo
            soluciones tecnológicas que generan impacto real en el negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.slice(0, 5).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
          {services.slice(5).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 5} />
          ))}
        </div>
      </div>
    </section>
  );
}
