import { profileData } from "./profileData";

const navItemsRaw = [
  { label: "Servicios", href: "#services", section: "services" },
  { label: "Proyectos", href: "#projects", section: "projects" },
  { label: "Stack", href: "#stack", section: "technical_skills" },
  { label: "Académico", href: "#academic", section: "education" },
  { label: "IA", href: "#ai", section: "ai" },
];

/** Enlaces a las secciones que se ven (la barra y el pie usan la misma lista). */
export const navItems = navItemsRaw.filter((item) => {
  if (item.section === "ai" || item.section === "services") return true;
  // @ts-ignore
  return profileData.sections[item.section]?.visible !== false;
});
