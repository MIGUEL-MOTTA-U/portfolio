import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { profileData } from "../data/profileData";

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { sections } = profileData;
  const experience = sections.experience;

  if (!experience.visible || experience.items.length === 0) return null;

  return (
    <section id="experience" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-5">
            Experiencia Profesional
          </span>
          <h2
            className="text-foreground font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Trayectoria{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Técnica
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Desarrollo de soluciones robustas y liderazgo técnico en entornos empresariales y académicos.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {experience.items.filter(item => item.visible).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l border-border"
            >
              {/* Dot on the timeline */}
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 border border-background shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

              <div className="bg-card border border-border rounded-2xl p-8 hover:border-foreground/10 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.role}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 font-medium">
                      <Briefcase className="w-4 h-4" />
                      {item.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {item.achievements.map((achievement, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 border border-border rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
