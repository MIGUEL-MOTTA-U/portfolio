import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { profileData } from "../data/profileData";

export function Hero() {
  const { personal_info, sections } = profileData;
  const summary = sections.professional_summary;

  if (!summary.visible) return null;

  const metrics = [
    { value: "50+", label: "Proyectos entregados" },
    { value: "8+", label: "Años de experiencia" },
    { value: "99.9%", label: "Uptime garantizado" },
    { value: "15+", label: "Países" },
  ];

  const techBadges = [
    "AWS", "Docker", "Java", "React", "Spring Boot",
    "Python", "TypeScript", "PostgreSQL", "Redis", "GitHub Actions",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-5xl">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-8 tracking-wide uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponible para nuevos proyectos
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-foreground leading-[1.06] tracking-tight mb-6 font-bold"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)" }}
            >
              {personal_info.name}.{" "}
              <br className="hidden sm:block" />
              <span
                style={{
                  background: "linear-gradient(120deg, #6366f1, #22d3ee, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ingeniero de Sistemas.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            {summary.content}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            <a
              href="mailto:miguelangelmu2016@gmail.com"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 font-semibold text-sm"
            >
              Agendar Consultoría Gratuita
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 rounded-xl transition-all duration-200 bg-card hover:bg-accent font-medium text-sm"
            >
              Ver Casos de Éxito
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Tech badges row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-2 mb-16"
          >
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.04 }}
                className="px-3 py-1 text-xs font-mono text-muted-foreground bg-card border border-border rounded-full hover:text-foreground hover:border-indigo-500/30 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Metrics */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              >
                <div
                  className="font-bold text-foreground mb-1"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
                >
                  {m.value}
                </div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
