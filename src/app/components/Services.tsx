import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Bot, Check, Cloud, Compass, Globe } from "lucide-react";
import { profileData } from "../data/profileData";
import type { CategoriaServicio, IconoServicio } from "../data/profileData";
import { Etiqueta } from "./Etiqueta";

const iconos: Record<IconoServicio, typeof Globe> = { globe: Globe, cloud: Cloud, bot: Bot, compass: Compass };

/** Tarjeta «bento». En escritorio las anchas (752 px) llevan la cabecera a la izquierda y la lista a la derecha. */
function Tarjeta({ categoria, index, ancha }: { categoria: CategoriaServicio; index: number; ancha: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icono = iconos[categoria.icon];
  const destacada = categoria.featured === true;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-6 rounded-[20px] border p-8 lg:h-[368px] lg:rounded-3xl lg:p-10 ${
        ancha ? "lg:flex-row lg:items-center lg:gap-14" : ""
      } ${destacada ? "border-panel-edge bg-feature text-panel-ink" : "border-border bg-card text-foreground"}`}
    >
      <div className={`flex flex-col gap-4 lg:gap-5 ${ancha ? "lg:w-[300px] lg:shrink-0" : ""}`}>
        <div
          className={`flex size-12 items-center justify-center rounded-xl lg:size-14 ${
            destacada ? "bg-panel-accent/[0.12] text-panel-accent" : "bg-accent-soft text-primary"
          }`}
        >
          <Icono className="size-6 lg:size-7" aria-hidden="true" />
        </div>
        <h3 className="text-[22px] font-bold leading-[1.2] lg:text-[26px]">{categoria.title}</h3>
        <p className={`text-[15px] leading-normal lg:text-base ${destacada ? "text-panel-muted" : "text-muted-foreground"}`}>
          {categoria.description}
        </p>
      </div>

      <hr className={`border-t ${destacada ? "border-panel-line" : "border-border"} ${ancha ? "lg:hidden" : ""}`} />

      <ul className="flex flex-col gap-3 lg:gap-4">
        {categoria.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[15px] font-medium lg:text-base">
            <Check className={`size-[18px] shrink-0 ${destacada ? "text-panel-accent" : "text-primary"}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const categorias = profileData.services;

  return (
    <section id="services" className="relative py-[72px] lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center gap-4 text-center lg:mb-14 lg:gap-6"
        >
          <Etiqueta>Servicios</Etiqueta>
          <h2 className="text-[32px] font-bold leading-[1.15] tracking-[-0.025em] text-foreground lg:text-[44px]">
            Lo que puedo hacer por tu negocio
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 lg:gap-14">
          <div className="grid gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-[3fr_2fr]">
            {categorias.slice(0, 2).map((c, i) => (
              <Tarjeta key={c.title} categoria={c} index={i} ancha={i === 0} />
            ))}
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-[2fr_3fr]">
            {categorias.slice(2, 4).map((c, i) => (
              <Tarjeta key={c.title} categoria={c} index={i + 2} ancha={i === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
