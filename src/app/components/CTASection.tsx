import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, Mail, Calendar, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";

const contactOptions = [
  {
    icon: Calendar,
    title: "Agendar Consultoría",
    description: "Conversación de 30 min sin costo para evaluar tu proyecto",
    cta: "Reservar tiempo",
    color: "indigo",
  },
  {
    icon: Mail,
    title: "Enviar Proyecto",
    description: "Cuéntame los detalles y te respondo en menos de 24h",
    cta: "Escribir ahora",
    color: "cyan",
  },
  {
    icon: MessageSquare,
    title: "Consulta Técnica",
    description: "Revisión de arquitectura, code review o segunda opinión",
    cta: "Consultar",
    color: "violet",
  },
];

const colorMap: Record<string, { icon: string; btn: string; border: string }> = {
  indigo: {
    icon: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    btn: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20",
    border: "hover:border-indigo-500/30",
  },
  cyan: {
    icon: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    btn: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20",
    border: "hover:border-cyan-500/30",
  },
  violet: {
    icon: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    btn: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/20",
    border: "hover:border-violet-500/30",
  },
};

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 bg-background overflow-hidden">
      {/* Big glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
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
            Trabajemos Juntos
          </span>
          <h2
            className="text-foreground font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            ¿Listo para construir{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(120deg, #6366f1, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              algo extraordinario?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Cuéntame tu desafío técnico. Respondemos en menos de 24 horas con una propuesta concreta.
          </p>
        </motion.div>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {contactOptions.map((opt, i) => {
            const Icon = opt.icon;
            const colors = colorMap[opt.color];
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`p-6 rounded-2xl bg-card border border-border ${colors.border} transition-all text-center`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{opt.title}</h3>
                <p className="text-muted-foreground text-sm mb-5">{opt.description}</p>
                <a
                  href="mailto:miguelangelmu2016@gmail.com"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white ${colors.btn} shadow-lg transition-all`}
                >
                  {opt.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-foreground font-bold text-xl mb-6">Cuéntame sobre tu proyecto</h3>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-foreground font-semibold text-lg mb-2">¡Mensaje enviado!</h4>
                <p className="text-muted-foreground text-sm">Te respondo en menos de 24 horas.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder-slate-700 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.03] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="tu@empresa.com"
                      className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder-slate-700 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.03] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Tu proyecto o desafío
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe brevemente qué necesitas construir, el contexto y el timeline aproximado..."
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-slate-700 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.03] transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-700 text-center">
                  Sin spam. Solo respuestas relevantes a tu proyecto.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
