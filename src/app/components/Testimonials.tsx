import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "CTO",
    company: "FinCloud Technologies",
    avatar: "CM",
    color: "indigo",
    stars: 5,
    text: "La migración de nuestro monolito a microservicios fue una de las decisiones más complejas de nuestra empresa. Se entregó en tiempo, por debajo del presupuesto y con una arquitectura que nos permitió escalar 10x en 6 meses. Nivel técnico excepcional.",
  },
  {
    name: "Ana Rodríguez",
    role: "CEO & Co-founder",
    company: "EduAI Latam",
    avatar: "AR",
    color: "violet",
    stars: 5,
    text: "Construimos nuestra plataforma de IA educativa desde cero. La visión arquitectónica que aportó fue clave — desde el día uno pensamos en escala empresarial. 50,000 estudiantes activos y el sistema ni siente la carga.",
  },
  {
    name: "Roberto Sánchez",
    role: "VP de Operaciones",
    company: "ManufactGroup",
    avatar: "RS",
    color: "cyan",
    stars: 5,
    text: "Automatizamos 40 procesos críticos que antes consumían semanas de trabajo. La solución se integró perfectamente con nuestro ERP existente. El ROI fue visible en el primer mes. Recomendado sin dudarlo.",
  },
  {
    name: "Laura Pérez",
    role: "Directora de Tecnología",
    company: "RetailNova",
    avatar: "LP",
    color: "emerald",
    stars: 5,
    text: "Necesitábamos lanzar un SaaS B2B en tiempo récord sin sacrificar calidad. Entregó una arquitectura multi-tenant sólida, documentación impecable y el equipo interno pudo tomar el control sin problemas. Trabajo de primer nivel.",
  },
  {
    name: "Miguel Torres",
    role: "Fundador",
    company: "DataStream AI",
    avatar: "MT",
    color: "amber",
    stars: 5,
    text: "Los agentes de IA que implementó transformaron completamente nuestro pipeline de datos. Pasamos de procesar reportes en 3 horas a generarlos en minutos, con un 98% de precisión. Exactamente lo que necesitábamos.",
  },
  {
    name: "Valeria Gómez",
    role: "CTO",
    company: "SecureOps",
    avatar: "VG",
    color: "rose",
    stars: 5,
    text: "La auditoría de seguridad y el rediseño de nuestra arquitectura de autenticación fue exhaustivo y profesional. Cumplimos con los estándares internacionales que necesitábamos para expandirnos a Europa. Alta calidad en cada entregable.",
  },
];

const avatarColorMap: Record<string, string> = {
  indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] transition-all"
    >
      <Quote className="w-5 h-5 text-indigo-500/40 mb-4" />
      <p className="text-slate-400 text-sm leading-relaxed mb-6">"{t.text}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold ${avatarColorMap[t.color]}`}>
            {t.avatar}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{t.name}</div>
            <div className="text-slate-600 text-xs">{t.role} · {t.company}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 bg-[#060611] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }}
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
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full mb-5">
            Testimonios
          </span>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Lo que dicen los{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #f59e0b, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              clientes
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Resultados reales en empresas reales. La confianza se construye entregando lo prometido.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          {[
            { value: "100%", label: "Proyectos entregados a tiempo" },
            { value: "5.0/5", label: "Calificación promedio" },
            { value: "90%", label: "Clientes con proyectos adicionales" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-bold text-white mb-1" style={{ fontSize: "1.75rem" }}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
