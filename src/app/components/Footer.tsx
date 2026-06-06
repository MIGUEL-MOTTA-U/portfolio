import { Terminal, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const links = {
  Servicios: [
    { label: "Backend Engineering", href: "#services" },
    { label: "Arquitectura Cloud", href: "#services" },
    { label: "DevOps & CI/CD", href: "#services" },
    { label: "Inteligencia Artificial", href: "#ai" },
    { label: "Automatización", href: "#services" },
    { label: "Ciberseguridad", href: "#services" },
  ],
  Trabajo: [
    { label: "Casos de Éxito", href: "#projects" },
    { label: "Stack Técnico", href: "#stack" },
    { label: "Cloud & DevOps", href: "#ai" },
    { label: "IA & Agentes", href: "#ai" },
  ],
  Contacto: [
    { label: "Agendar Reunión", href: "#contact" },
    { label: "Enviar Proyecto", href: "#contact" },
    { label: "Consultoría Técnica", href: "#contact" },
    { label: "miguelangelmu2016@gmail.com", href: "mailto:miguelangelmu2016@gmail.com" },
  ],
};

const socials = [
  { icon: Github, href: "https://github.com/MIGUEL-MOTTA-U/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/miguelangelmotta-backendengineer/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:miguelangelmu2016@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-mono font-bold text-foreground tracking-tight">
                <span className="text-indigo-400">{"<"}</span>
                <span className="text-cyan-400">motta</span>dev
                <span className="text-indigo-400">{" />"}</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Ingeniería de software de nivel enterprise. Arquitectura, escalabilidad e innovación
              para empresas que quieren crecer sin límites técnicos.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    target="_blank"
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground/60">
            © 2026 MottaDev. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <span>Construido con</span>
            <span className="font-mono text-indigo-500">React</span>
            <span>·</span>
            <span className="font-mono text-cyan-600">TypeScript</span>
            <span>·</span>
            <span className="font-mono text-violet-500">Tailwind</span>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            Volver arriba
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
