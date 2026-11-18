import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { profileData } from "../data/profileData";
import { hayDemos, propuestaHref } from "../data/contacto";

const botonBase =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-xl px-7 text-base font-semibold transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.98] active:duration-100 motion-reduce:active:scale-100";

const ruido =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")";

export function Hero() {
  const { personal_info, sections, hero } = profileData;
  const summary = sections.professional_summary;

  if (!summary.visible) return null;

  return (
    <section className="relative flex min-h-[656px] items-start overflow-hidden bg-background pb-10 pt-[120px] lg:min-h-[832px] lg:items-center lg:pb-0 lg:pt-[72px]">
      {/* Fondo estático: cuadrícula, velo, orbes y ruido (UI-SPEC §4.2). Las animaciones quedan para después. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 72% 40%, transparent 0%, var(--background) 90%)" }}
        />
        <div
          className="absolute left-[28%] top-[-56px] size-[420px] rounded-full lg:left-[52.7%] lg:top-[-8px] lg:size-[760px]"
          style={{ background: "radial-gradient(closest-side, var(--orb-a), transparent)" }}
        />
        <div
          className="absolute left-[-140px] top-[296px] size-[360px] rounded-full lg:left-[-200px] lg:top-[272px] lg:size-[560px]"
          style={{ background: "radial-gradient(closest-side, var(--orb-b), transparent)" }}
        />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: ruido }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <div className="flex max-w-[880px] flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 lg:gap-4"
          >
            <h1 className="flex items-center gap-[0.18em] font-mono text-[40px] font-bold leading-none tracking-[-0.0375em] text-foreground min-[480px]:text-[48px] md:text-[56px] lg:text-[80px]">
              <span>{personal_info.name}</span>
              <span aria-hidden="true" className="inline-block h-[0.85em] w-[0.45em] rounded-[0.05em] bg-cursor" />
            </h1>
            <p className="text-[22px] font-semibold leading-tight text-foreground lg:text-[28px]">
              <span className="block lg:inline">{hero.cargo_es[0]}</span>
              <span className="hidden lg:inline" aria-hidden="true">
                {" · "}
              </span>
              <span className="block lg:inline">{hero.cargo_es[1]}</span>
            </p>
            <p lang="en" className="font-mono text-xs font-medium text-muted-foreground lg:text-base">
              {hero.cargo_en.join(" · ")}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-[600px] text-[17px] leading-normal text-muted-foreground lg:text-xl"
          >
            {hero.frase}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-col gap-3 lg:flex-row lg:gap-4"
          >
            <a
              href={propuestaHref}
              className={`${botonBase} bg-primary text-primary-foreground hover:bg-accent-hover`}
            >
              <Mail className="size-[18px]" aria-hidden="true" />
              Pedir propuesta
            </a>
            {hayDemos && (
              <a
                href="#sitios-en-vivo"
                className={`${botonBase} border-[1.5px] border-foreground text-foreground hover:bg-accent hover:text-accent-foreground`}
              >
                Ver sitios en vivo
                <ArrowDown className="size-[18px]" aria-hidden="true" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
