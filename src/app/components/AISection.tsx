import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Bot, Brain, Workflow, Cpu, MessageSquare, Database, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "Agentes de IA Autónomos",
    description: "Agentes capaces de razonar, planificar y ejecutar tareas complejas en entornos empresariales sin intervención humana continua.",
  },
  {
    icon: MessageSquare,
    title: "RAG & Knowledge Bases",
    description: "Sistemas de Retrieval-Augmented Generation sobre documentos corporativos para asistentes inteligentes contextualizados.",
  },
  {
    icon: Workflow,
    title: "Automatización con LLMs",
    description: "Integración de modelos de lenguaje en flujos de trabajo existentes: clasificación, extracción, generación de reportes y más.",
  },
  {
    icon: Database,
    title: "Pipelines de Datos IA",
    description: "Infraestructura de datos para entrenamiento, fine-tuning y serving de modelos en producción con monitoreo continuo.",
  },
  {
    icon: Cpu,
    title: "Integración LLM API",
    description: "Integración de OpenAI, Anthropic, Gemini y modelos open-source en productos digitales existentes de forma escalable.",
  },
  {
    icon: Bot,
    title: "Chatbots Empresariales",
    description: "Asistentes conversacionales con contexto del negocio, acceso a datos internos y capacidad de acción sobre sistemas externos.",
  },
];

const useCases = [
  { label: "Soporte al cliente 24/7", value: "↓ 60% tickets humanos" },
  { label: "Análisis de documentos", value: "10x más rápido" },
  { label: "Generación de reportes", value: "↓ 90% tiempo manual" },
  { label: "Clasificación inteligente", value: "98% precisión" },
  { label: "Onboarding automatizado", value: "↑ 45% conversión" },
  { label: "Detección de anomalías", value: "Real-time alerts" },
];

function CapabilityItem({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = cap.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all group"
    >
      <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-all">
        <Icon className="w-4 h-4 text-violet-400" />
      </div>
      <div>
        <div className="text-white font-semibold text-sm mb-1">{cap.title}</div>
        <p className="text-slate-500 text-sm leading-relaxed">{cap.description}</p>
      </div>
    </motion.div>
  );
}

export function AISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai" className="relative py-32 bg-[#060611] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
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
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full mb-5">
            Inteligencia Artificial
          </span>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            IA que trabaja{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #a78bfa, #6366f1, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              para tu negocio
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            No solo integro IA — diseño arquitecturas que hacen que la inteligencia artificial sea
            un activo estratégico real, no un experimento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: capabilities */}
          <div className="space-y-4">
            {capabilities.map((cap, i) => (
              <CapabilityItem key={cap.title} cap={cap} index={i} />
            ))}
          </div>

          {/* Right: visual + use cases */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl bg-[#0d0d1a] border border-white/[0.08] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="text-xs text-slate-600 font-mono ml-2">ai-agent.py</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-1.5">
                <div><span className="text-slate-600"># </span><span className="text-slate-500">Inicializando agente empresarial...</span></div>
                <div><span className="text-violet-400">agent</span><span className="text-slate-400"> = </span><span className="text-cyan-400">AgentExecutor</span><span className="text-slate-400">(</span></div>
                <div className="pl-4"><span className="text-slate-400">llm=</span><span className="text-emerald-400">ChatOpenAI</span><span className="text-slate-400">(model="gpt-4o"),</span></div>
                <div className="pl-4"><span className="text-slate-400">tools=</span><span className="text-amber-400">[db_tool, api_tool, report_tool]</span><span className="text-slate-400">,</span></div>
                <div className="pl-4"><span className="text-slate-400">memory=</span><span className="text-indigo-400">ConversationBufferMemory</span><span className="text-slate-400">()</span></div>
                <div><span className="text-slate-400">)</span></div>
                <div className="mt-2"><span className="text-slate-600"># </span><span className="text-slate-500">Resultado: 3,200h/mes ahorradas ✓</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-400">Agent deployed to production</span>
                  <span className="inline-block w-2 h-4 bg-white/60 animate-pulse" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
                Casos de uso frecuentes
              </div>
              <div className="grid grid-cols-2 gap-3">
                {useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/20 transition-all"
                  >
                    <div className="text-xs text-slate-400 mb-1 font-medium">{uc.label}</div>
                    <div className="text-xs font-mono font-semibold text-violet-400">{uc.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Hablar sobre IA para tu empresa
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
