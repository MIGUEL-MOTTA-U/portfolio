import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profileData } from "../data/profileData";
import { propuestaHref } from "../data/contacto";

const iconos = { mail: Mail, github: Github, linkedin: Linkedin };
const nombres = { mail: "Correo", github: "GitHub", linkedin: "LinkedIn" };

const cuadricula =
  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)";

/** Contacto: una acción principal y tres canales como enlaces, sin formulario (CR-002 §3.1, UI-SPEC §4.5). */
export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { channels } = profileData.contact;

  return (
    <section id="contact" className="relative pb-20 lg:pb-28">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-panel-edge bg-panel p-8 lg:min-h-[440px] lg:flex-row lg:items-center lg:justify-between lg:rounded-[32px] lg:p-[72px]"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0" style={{ backgroundImage: cuadricula, backgroundSize: "80px 80px" }} />
            <div
              className="absolute left-[33%] top-[-170px] size-[420px] rounded-full lg:left-[54.7%] lg:top-[-220px] lg:size-[640px]"
              style={{ background: "radial-gradient(closest-side, #34d3993d, transparent)" }}
            />
          </div>

          <div className="relative flex w-full flex-col gap-5 lg:w-[640px] lg:gap-6">
            <span className="inline-flex self-start rounded-full bg-panel-accent/[0.12] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-panel-accent">
              Contacto
            </span>
            <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-panel-ink lg:text-5xl">
              <span className="block">
                ¿Tienes un<span className="hidden lg:inline"> proyecto</span>
              </span>
              <span className="block lg:hidden">proyecto</span>
              <span className="block">en mente?</span>
            </h2>
            <p className="text-base leading-normal text-panel-muted lg:max-w-[520px] lg:text-lg">
              Cuéntame qué necesita tu negocio y te respondo con una propuesta.
            </p>
            <a
              href={propuestaHref}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-panel-accent px-7 text-base font-semibold text-[#0b1210] transition-[background-color,transform] duration-[160ms] ease-out hover:bg-panel-accent-hover active:scale-[0.98] active:duration-100 motion-reduce:active:scale-100 lg:self-start"
            >
              <Mail className="size-[18px]" aria-hidden="true" />
              Pedir propuesta
            </a>
          </div>

          <ul className="relative flex w-full flex-col lg:w-[400px]">
            {channels.map((canal) => {
              const Icono = iconos[canal.kind];
              const externo = canal.kind !== "mail";
              return (
                <li key={canal.kind}>
                  <a
                    href={canal.href}
                    {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={externo ? `${nombres[canal.kind]}: ${canal.label} (se abre en una pestaña nueva)` : `${nombres[canal.kind]}: ${canal.label}`}
                    className="group flex items-center gap-4 border-b border-panel-line py-4 text-panel-ink lg:py-6"
                  >
                    <Icono className="size-5 shrink-0 text-panel-accent" aria-hidden="true" />
                    <span className="flex-1 text-base font-medium">{canal.label}</span>
                    <ArrowUpRight
                      className="size-[18px] text-panel-muted transition-transform duration-[160ms] ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-panel-ink motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
