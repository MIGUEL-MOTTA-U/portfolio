import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Cloud, GitBranch, Package, Activity, Lock, Globe, CheckCircle2 } from "lucide-react";

const cloudServices = [
  { name: "EC2 / ECS", category: "Compute", icon: "⚡" },
  { name: "RDS / Aurora", category: "Database", icon: "🗄️" },
  { name: "S3 / CloudFront", category: "Storage & CDN", icon: "☁️" },
  { name: "Lambda", category: "Serverless", icon: "λ" },
  { name: "SQS / SNS", category: "Messaging", icon: "📨" },
  { name: "EKS", category: "Kubernetes", icon: "⎈" },
  { name: "VPC / IAM", category: "Security", icon: "🔐" },
  { name: "CloudWatch", category: "Observability", icon: "📊" },
];

const pipelineSteps = [
  { label: "Code Push", icon: GitBranch, color: "text-muted-foreground" },
  { label: "Unit Tests", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Build & Lint", icon: Package, color: "text-blue-400" },
  { label: "Security Scan", icon: Lock, color: "text-amber-400" },
  { label: "Staging Deploy", icon: Cloud, color: "text-indigo-400" },
  { label: "Integration Tests", icon: Activity, color: "text-violet-400" },
  { label: "Production", icon: Globe, color: "text-emerald-400" },
];

const features = [
  {
    title: "Infraestructura como Código",
    description: "Terraform y CloudFormation para provisionar y versionar toda la infraestructura de manera reproducible.",
  },
  {
    title: "Kubernetes & Orquestación",
    description: "Despliegues con rolling updates, health checks, autoscaling y gestión de secretos en Kubernetes.",
  },
  {
    title: "Observabilidad Completa",
    description: "Métricas, trazas distribuidas y logs centralizados con Prometheus, Grafana y ELK Stack.",
  },
  {
    title: "Zero-Downtime Deployments",
    description: "Estrategias Blue-Green y Canary para actualizaciones sin interrupciones en producción.",
  },
];

function FeatureCard({ feat, index }: { feat: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-5 rounded-2xl bg-card border border-border hover:border-cyan-500/20 transition-all"
    >
      <h3 className="text-foreground font-semibold mb-2 text-sm">{feat.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{feat.description}</p>
    </motion.div>
  );
}

export function CloudDevOps() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)", filter: "blur(80px)" }}
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
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-5">
            Cloud & DevOps
          </span>
          <h2
            className="text-foreground font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Infraestructura que{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #22d3ee, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              nunca falla
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Cloud-native desde el diseño. Arquitecturas que escalan automáticamente,
            se despliegan sin interrupciones y se monitorizan en tiempo real.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: CI/CD pipeline + AWS grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-5">
                Pipeline CI/CD — De código a producción
              </div>
              <div className="flex flex-wrap gap-2">
                {pipelineSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border"
                      >
                        <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                        <span className="text-xs text-muted-foreground font-medium">{step.label}</span>
                      </motion.div>
                      {i < pipelineSteps.length - 1 && (
                        <span className="text-slate-700 text-xs">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-5">
                Servicios AWS / Azure
              </div>
              <div className="grid grid-cols-4 gap-2">
                {cloudServices.map((svc, i) => (
                  <motion.div
                    key={svc.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                    className="p-3 rounded-xl bg-card border border-border hover:border-cyan-500/20 hover:bg-cyan-500/[0.03] transition-all text-center cursor-default"
                  >
                    <div className="text-lg mb-1.5">{svc.icon}</div>
                    <div className="text-xs text-muted-foreground font-medium leading-tight">{svc.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{svc.category}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: features + uptime widget */}
          <div className="space-y-5">
            {features.map((feat, i) => (
              <FeatureCard key={feat.title} feat={feat} index={i} />
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-muted-foreground">System Uptime</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <div className="font-bold text-foreground mb-1" style={{ fontSize: "2.5rem", lineHeight: 1 }}>
                99.97%
              </div>
              <div className="text-xs text-slate-600 mb-3">Promedio en proyectos de producción</div>
              <div className="flex gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-5 rounded-sm ${i === 14 ? "bg-amber-500/60" : "bg-emerald-500/40"}`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-700 mt-1.5">
                <span>30 días</span>
                <span>Hoy</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
