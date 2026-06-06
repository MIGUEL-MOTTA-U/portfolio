import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { profileData } from "../data/profileData";

const navItemsRaw = [
  { label: "Experiencia", href: "#experience", section: "experience" },
  { label: "Servicios", href: "#services", section: "services" },
  { label: "Proyectos", href: "#projects", section: "projects" },
  { label: "Stack", href: "#stack", section: "technical_skills" },
  { label: "Académico", href: "#academic", section: "education" },
  { label: "IA", href: "#ai", section: "ai" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { sections } = profileData;

  const navItems = navItemsRaw.filter((item) => {
    if (item.section === "ai") return true; // Section without specific visibility in JSON yet
    if (item.section === "services") return true; // Same
    // @ts-ignore
    return sections[item.section]?.visible !== false;
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface-alpha backdrop-blur-2xl border-b border-border shadow-2xl shadow-foreground/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-600/30 transition-all">
            <Terminal className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-mono font-bold text-foreground tracking-tight">
            <span className="text-indigo-400">{"<"}</span>
            <span className="text-cyan-400">motta</span>
            dev
            <span className="text-indigo-400">{" />"}</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="mailto:miguelangelmu2016@gmail.com"
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all duration-200 border border-indigo-500/50 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            Agenda Consulta
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-b border-border"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="px-4 py-2.5 text-sm font-semibold text-center text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Agenda una Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
