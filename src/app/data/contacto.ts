import { profileData } from "./profileData";

/** Enlace de «Pedir propuesta»: abre el correo con asunto (UI-SPEC §9, flujo 1). */
export const propuestaHref = `mailto:${profileData.personal_info.email}?subject=${encodeURIComponent(
  profileData.contact.subject
)}`;

/** ¿Hay al menos un sitio en vivo visible? Si no, se oculta «Ver sitios en vivo». */
export const hayDemos = profileData.sections.projects.items.some((p) => p.visible && p.demo);
