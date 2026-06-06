import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { profileData } from "../data/profileData";

function CategoryCard({ cat, index }: { cat: { domain: string; skills: string[] }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="p-5 rounded-2xl bg-card border border-border hover:border-foreground/10 transition-all"
    >
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{cat.domain}</div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-mono text-muted-foreground bg-card border border-border rounded-lg hover:text-foreground hover:border-indigo-500/30 transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const proficiency = [
  { label: "Backend & APIs", pct: 96 },
  { label: "Cloud Architecture (AWS/Azure)", pct: 91 },
  { label: "Full Stack (React + Node/Java)", pct: 89 },
  { label: "DevOps & CI/CD", pct: 87 },
  { label: "AI & Automation", pct: 84 },
  { label: "Software Design Patterns", pct: 92 },
];

function ProficiencyBar({ item, index }: { item: typeof proficiency[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
        <span className="text-xs font-mono text-muted-foreground">{item.pct}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6366f1, #22d3ee)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { sections } = profileData;
  const skills = sections.technical_skills;

  if (!skills.visible) return null;

  return (
    <section id="stack" className="relative py-32 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10"
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
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-5">
            Especialidades Técnicas
          </span>
          <h2
            className="text-foreground font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Habilidades y{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #22d3ee, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tecnologías
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Especializado en el desarrollo de sistemas de alto rendimiento y arquitecturas modernas escalables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {skills.groups.map((group, i) => (
            <CategoryCard key={group.domain} cat={group} index={i} />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-muted-foreground text-sm font-semibold uppercase tracking-widest text-center mb-10">
            Nivel de Especialización
          </h3>
          <div className="space-y-6">
            {proficiency.map((item, i) => (
              <ProficiencyBar key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
