import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { propuestaHref } from "../data/contacto";
import { navItems } from "../data/navegacion";

const botonPrincipal =
  "inline-flex items-center justify-center bg-primary font-semibold text-primary-foreground transition-[background-color,transform] duration-[160ms] ease-out hover:bg-accent-hover active:scale-[0.98] active:duration-100 motion-reduce:active:scale-100";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activo, setActivo] = useState<string | null>(null);
  const botonMenu = useRef<HTMLButtonElement>(null);

  // Enlace de la sección activa: la última cuyo borde superior ya pasó el 40 % de la ventana.
  useEffect(() => {
    // «contact» no tiene enlace en la barra: al llegar a Contacto no queda ninguno activo.
    const els = [...navItems.map((item) => item.href.slice(1)), "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let pendiente = false;
    const calcular = () => {
      pendiente = false;
      const limite = window.innerHeight * 0.4;
      let actual: string | null = null;
      let tope = -Infinity;
      // El orden del menú no es el de la página: gana la sección cuyo borde superior está más abajo sin pasar el límite.
      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        if (top <= limite && top > tope) {
          tope = top;
          actual = el.id;
        }
      }
      setActivo(actual === "contact" ? null : actual);
    };
    const alScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc cierra el menú y devuelve el foco al botón.
  useEffect(() => {
    if (!mobileOpen) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        botonMenu.current?.focus();
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [mobileOpen]);

  return (
    <motion.nav
      aria-label="Principal"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:h-[72px] lg:px-20">
        <a href="#" aria-label="mottadev, inicio" className="rounded-md">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const esActivo = activo === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={esActivo ? "location" : undefined}
                className={`relative text-[15px] font-medium transition-colors duration-200 ${
                  esActivo
                    ? "text-foreground after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a href={propuestaHref} className={`h-10 rounded-[10px] px-[18px] text-sm ${botonPrincipal}`}>
            Pedir propuesta
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={botonMenu}
            type="button"
            className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-border text-foreground transition-colors duration-[160ms] ease-out hover:bg-secondary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="size-[18px]" aria-hidden="true" /> : <Menu className="size-[18px]" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-border bg-background lg:hidden"
          >
            <div className="flex flex-col gap-6 px-6 pb-8 pt-2">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex h-14 items-center justify-between border-b border-border text-xl font-semibold text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <ArrowRight className="size-[18px] text-muted-foreground" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <a
                href={propuestaHref}
                className={`h-[52px] gap-2 rounded-xl px-6 text-base ${botonPrincipal}`}
                onClick={() => setMobileOpen(false)}
              >
                Pedir propuesta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
