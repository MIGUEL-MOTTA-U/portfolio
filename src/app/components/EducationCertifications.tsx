import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, Award, Brain, Languages } from "lucide-react";
import { profileData } from "../data/profileData";

export function EducationCertifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { sections } = profileData;

  const showEducation = sections.education.visible && sections.education.items.length > 0;
  const showCerts = sections.certifications.visible && sections.certifications.items.length > 0;
  const showSoftSkills = sections.soft_skills.visible && sections.soft_skills.items.length > 0;
  const showLanguages = sections.languages.visible && sections.languages.items.length > 0;

  if (!showEducation && !showCerts && !showSoftSkills && !showLanguages) return null;

  return (
    <section id="academic" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {showEducation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              ref={ref}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Educación</h3>
              </div>
              <div className="space-y-4">
                {sections.education.items.map((edu, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                    <div className="text-sm text-indigo-400 font-semibold mb-1">{edu.period}</div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h4>
                    <p className="text-muted-foreground text-sm">{edu.institution}</p>
                    {edu.status && (
                      <span className="inline-block mt-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
                        {edu.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showSoftSkills && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Soft Skills</h3>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <div className="flex flex-wrap gap-3">
                  {sections.soft_skills.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary/30 border border-border rounded-xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {showCerts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Certificaciones</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sections.certifications.items.map((cert, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-card border border-border flex flex-col justify-between">
                    <h4 className="text-sm font-bold text-foreground mb-2">{cert.name}</h4>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                      <span>{cert.issuer}</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showLanguages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Idiomas</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sections.languages.items.map((lang, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between">
                    <div className="font-bold text-foreground">{lang.language}</div>
                    <div className="text-xs text-indigo-400 font-bold uppercase">{lang.level}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
