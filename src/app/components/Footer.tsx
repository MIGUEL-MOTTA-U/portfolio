import { Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { profileData } from "../data/profileData";
import { navItems } from "../data/navegacion";

const iconos = { mail: Mail, github: Github, linkedin: Linkedin };
const nombres = { mail: "Correo", github: "GitHub", linkedin: "LinkedIn" };

/** Pie compacto: marca, enlaces a las secciones, redes y pie legal (UI-SPEC §4.6). */
export function Footer() {
  const { channels } = profileData.contact;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 pb-8 pt-10 lg:px-20 lg:pb-10 lg:pt-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <a href="#" className="flex items-center gap-3 lg:gap-4" aria-label="mottadev, volver al inicio">
            <Logo />
            <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
              by Miguel Motta
            </span>
          </a>

          <nav aria-label="Secciones" className="flex flex-wrap gap-x-6 gap-y-4 lg:gap-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-muted-foreground transition-colors duration-[160ms] hover:text-foreground lg:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ul className="flex gap-3">
            {channels.map((canal) => {
              const Icono = iconos[canal.kind];
              const externo = canal.kind !== "mail";
              return (
                <li key={canal.kind}>
                  <a
                    href={canal.href}
                    {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={externo ? `${nombres[canal.kind]} (se abre en una pestaña nueva)` : nombres[canal.kind]}
                    className="flex size-11 items-center justify-center rounded-[10px] border border-border text-foreground transition-colors duration-[160ms] ease-out hover:bg-secondary lg:size-10"
                  >
                    <Icono className="size-[18px]" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} mottadev · {profileData.personal_info.location}
        </p>
      </div>
    </footer>
  );
}
