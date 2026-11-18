export interface ProjectDetails {
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
}

/** Miniatura estática de un sitio desplegado (captura del sitio levantado en local). */
export interface ProjectPreview {
  /** Ruta pública de la miniatura AVIF (1280×800, ≤ 40 KB). */
  avif: string;
  /** Respaldo WebP de la misma miniatura (1280×800, ≤ 40 KB). */
  webp: string;
  /** Texto alternativo descriptivo de la miniatura. */
  alt: string;
}

/** Sitio ya desplegado que se puede abrir desde el portafolio. */
export interface ProjectDemo {
  /** URL pública del despliegue. */
  url: string;
  /** true solo si el sitio permite ser embebido en un iframe (frame-ancestors). */
  embeddable: boolean;
  /** Una línea para la tarjeta «Sitio en vivo» (invitación al cliente; no afirma que exista el negocio). */
  summary?: string;
  /** Hasta 3 chips de la tarjeta; si falta, se usan las 3 primeras tecnologías de `stack`. */
  chips?: string[];
  /** Miniatura de la tarjeta. Sin ella la tarjeta muestra «Vista previa no disponible». */
  preview?: ProjectPreview;
  /** true si la miniatura no trae por sí sola la marca de «sitio de ejemplo»: la tarjeta la dibuja encima. */
  exampleBadge?: boolean;
}

export interface Project {
  title: string;
  type: string;
  stack: string[];
  /** Repositorio público. Se omite si el repo es privado. */
  repo?: string;
  description: string;
  metrics?: string;
  /** Una frase corta para la tarjeta de «Proyectos técnicos». Si falta, se usa `description`. */
  summary?: string;
  /** Hasta 4 etiquetas de la tarjeta técnica. Si faltan, se usan las 4 primeras de `stack`. */
  chips?: string[];
  visible: boolean;
  details?: ProjectDetails;
  demo?: ProjectDemo;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  visible: boolean;
}

export interface SkillGroup {
  domain: string;
  skills: string[];
}

const EMAIL = "miguel@mottadev.com";
const GITHUB = "https://github.com/MIGUEL-MOTTA-U/";
const LINKEDIN = "https://www.linkedin.com/in/mottadev/";

export type IconoServicio = "globe" | "cloud" | "bot" | "compass";

export interface CategoriaServicio {
  icon: IconoServicio;
  title: string;
  description: string;
  items: string[];
  /** La tarjeta destacada (oscura) del bloque «bento». */
  featured?: boolean;
}

export interface CanalContacto {
  kind: "mail" | "github" | "linkedin";
  /** Texto visible: el formato ya dice qué es, sin etiqueta. */
  label: string;
  href: string;
}

export const profileData = {
  version: "1.2.0",
  last_updated: "2026-11-18T22:45:00Z",
  personal_info: {
    name: "Miguel Motta",
    role: "Ingeniero de Sistemas | Arquitecto de soluciones",
    location: "Colombia",
    email: EMAIL,
    links: {
      github: GITHUB,
      linkedin: LINKEDIN
    }
  },
  hero: {
    cargo_es: ["Ingeniero de Sistemas", "Arquitecto de soluciones"],
    cargo_en: ["Systems Engineer", "Solutions Architect"],
    frase:
      "Creo sitios y aplicaciones web rápidos, claros y fáciles de mantener. Cuéntame qué necesita tu negocio y te envío una propuesta."
  },
  services: [
    {
      icon: "globe",
      title: "Sitios y aplicaciones web",
      description: "Desde una página sencilla hasta una aplicación completa.",
      items: ["Desarrollo Full Stack", "Backend", "APIs empresariales"],
      featured: true
    },
    {
      icon: "cloud",
      title: "Cloud y DevOps",
      description: "Infraestructura segura que escala y se despliega sola.",
      items: ["Arquitectura Cloud", "DevOps y CI/CD", "Ciberseguridad"]
    },
    {
      icon: "bot",
      title: "IA y automatización",
      description: "Asistentes y procesos que ahorran horas de trabajo.",
      items: ["Inteligencia Artificial", "Automatización empresarial"]
    },
    {
      icon: "compass",
      title: "Consultoría y modernización",
      description: "Revisión técnica y renovación de sistemas antiguos.",
      items: ["Consultoría técnica", "Modernización tecnológica"]
    }
  ] as CategoriaServicio[],
  contact: {
    /** Asunto del correo que abre «Pedir propuesta». */
    subject: "Propuesta de proyecto",
    channels: [
      { kind: "mail", label: EMAIL, href: `mailto:${EMAIL}` },
      { kind: "github", label: "MIGUEL-MOTTA-U", href: GITHUB },
      { kind: "linkedin", label: "mottadev", href: LINKEDIN }
    ] as CanalContacto[]
  },
  sections: {
    professional_summary: {
      visible: true,
      content: "Ingeniero de Sistemas especializado en arquitecturas escalables, microservicios y prácticas DevOps. Experto en transformar visiones técnicas en soluciones de nivel empresarial utilizando IA Generativa y servicios Cloud (AWS/Azure). Enfocado en el diseño de sistemas distribuidos de alta disponibilidad y performance.",
      highlights: [
        "Sistemas Distribuidos & Backend",
        "Cloud Architecture (AWS/Azure)",
        "GenAI & AI Agents Integration",
        "DevOps & Scalability Specialist"
      ]
    },
    experience: {
      visible: false,
      items: [
        {
          role: "Cloud & Backend Architect",
          company: "Independent Consultant / Enterprise Projects",
          period: "Actualidad",
          description: "Diseño y despliegue de infraestructuras críticas bajo estándares SOLID. Liderazgo en la transición de arquitecturas monolíticas a microservicios cloud-native.",
          technologies: ["Java", "Spring Boot", "Node.js", "AWS", "Docker", "Kubernetes"],
          achievements: [
            "Arquitecto de plataformas de IA Generativa de alto impacto",
            "Optimización de sistemas de mensajería en tiempo real con Redis y WebSockets",
            "Implementación de arquitecturas serverless escalables con AWS Lambda"
          ],
          visible: true
        }
      ] as Experience[]
    },
    testimonials: {
      visible: false
    },
    projects: {
      visible: true,
      items: [
        {
          title: "AI Enterprise Cloud Platform",
          summary: "Ecosistema de microservicios escalable diseñado para la tutoría personalizada mediante IA.",
          chips: ["Node.js", "TypeScript", "AWS ECS", "Gemini API"],
          type: "Backend / Cloud / AI",
          stack: ["Node.js", "TypeScript", "AWS ECS", "AWS ECR", "AWS NLB", "API Gateway", "RDS", "AWS Lambda", "Gemini API", "MongoDB", "Redis"],
          repo: "https://github.com/MIGUEL-MOTTA-U/",
          description: "Ecosistema de microservicios escalable diseñado para la tutoría personalizada mediante IA. La plataforma orquesta servicios de autenticación, gestión de cursos y procesamiento de lenguaje natural en tiempo real.",
          details: {
            problem: "La necesidad de una plataforma educativa capaz de ofrecer tutoría adaptativa 24/7 a gran escala sin sobrecargar a los docentes.",
            solution: "Arquitectura nativa de la nube que utiliza orquestación de contenedores y servicios serverless para gestionar interacciones dinámicas con LLMs.",
            architecture: "Microservicios desacoplados comunicándose vía REST y Eventos. Implementación de un Coordinator (API Gateway) para centralizar la seguridad y el ruteo. Despliegue en AWS ECS con balanceo de carga de alto rendimiento (NLB).",
            challenges: "Gestión de estado en chats de IA de baja latencia y orquestación de múltiples servicios bajo alta concurrencia."
          },
          metrics: "Despliegue escalable con ECS y balanceo de carga (NLB) optimizado para tráfico masivo.",
          visible: true
        },
        {
          title: "Multiplayer Engine: Bad Ice Cream",
          summary: "Remake de alto rendimiento del clásico «Bad Ice Cream» con sincronización multijugador en tiempo real.",
          chips: ["Fastify", "TypeScript", "WebSocket", "Redis"],
          type: "Full Stack / Real-time",
          stack: ["Fastify", "TypeScript", "WebSocket", "Redis", "PostgreSQL", "React"],
          repo: "https://github.com/MIGUEL-MOTTA-U/The-Matrix-Back",
          description: "Remake de alto rendimiento del clásico 'Bad Ice Cream' con sincronización multijugador en tiempo real. Enfocado en la validación de estados del lado del servidor y física distribuida.",
          details: {
            problem: "Sincronizar el estado del juego entre múltiples jugadores sin latencia perceptible ('split-brain problem') en un entorno de navegador.",
            solution: "Motor de juego basado en WebSockets con lógica de validación autoritativa en el servidor (Fastify) y almacenamiento volátil de alta velocidad en Redis.",
            architecture: "Uso de patrones Observer para eventos de juego, Factory para entidades y Strategy para mecánicas intercambiables de colisión.",
            challenges: "Optimización de paquetes WebSocket para mantener 60 FPS estables y manejo de colisiones complejas en tiempo real."
          },
          metrics: "Sincronización menor a 50ms y despliegue automatizado en Azure con GitHub Actions.",
          visible: true
        },
        {
          title: "Enterprise Library Notification System",
          summary: "Módulo de automatización de alertas y gestión de multas para sistemas bibliotecarios de gran escala.",
          chips: ["Spring Boot", "Java", "Spring Cloud", "PostgreSQL"],
          type: "Backend / Microservices",
          stack: ["Spring Boot", "Java", "Spring Cloud", "PostgreSQL", "Spring Security"],
          repo: "https://github.com/thesrcielos/spammers",
          description: "Módulo de automatización de alertas y gestión de multas para sistemas bibliotecarios de gran escala, diseñado bajo una arquitectura de microservicios resiliente.",
          details: {
            problem: "La gestión manual de préstamos, vencimientos y multas generaba ineficiencias operativas y falta de control sobre el inventario.",
            solution: "Sistema automatizado basado en eventos que programa notificaciones preventivas y gestiona el ciclo de vida de las multas de forma transparente.",
            architecture: "Spring Cloud para Service Discovery y Config Management. Spring Data JPA para una capa de persistencia robusta y Spring Security para RBAC.",
            challenges: "Implementación de lógica de negocio compleja para calendarios de notificaciones y cálculo dinámico de sanciones."
          },
          metrics: "Arquitectura lista para la nube con Circuit Breakers y Service Discovery integrados.",
          visible: true
        },
        {
          title: "Strategic Game Engine: QuoriPOOB",
          summary: "Implementación digital del juego Quoridor que muestra principios avanzados de programación orientada a objetos.",
          chips: ["Java", "Java Swing", "Diseño orientado a objetos"],
          type: "Desktop / OOP Architecture",
          stack: ["Java", "Java Swing", "Object-Oriented Design"],
          repo: "https://github.com/MIGUEL-MOTTA-U/POOB_DANIEL_MIGUEL",
          description: "Implementación digital del juego Quoridor que sirve como showcase de principios avanzados de Programación Orientada a Objetos y patrones de diseño.",
          details: {
            problem: "Crear un motor de juego de mesa con reglas complejas que fuera fácilmente extensible y mantenible.",
            solution: "Diseño por capas con desacoplamiento total entre la lógica de juego (Core), la interfaz gráfica (GUI) y la persistencia.",
            architecture: "Uso intensivo de Polimorfismo, Herencia e Interfaces. Motor de IA personalizado con algoritmos de búsqueda de caminos (pathfinding).",
            challenges: "Validación de caminos bloqueados y reglas de movimiento intrincadas mediante algoritmos eficientes de grafos."
          },
          metrics: "Arquitectura modular 100% desacoplada con sistema de logs y persistencia de estados.",
          visible: true
        },
        {
          title: "Listo para aprender: landing de demostración",
          type: "Frontend / Motion / Web Performance",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript", "GSAP", "Lenis", "Vercel"],
          demo: {
            url: "https://8va.mottadev.com/",
            embeddable: false,
            summary: "Así puede verse el sitio de tu negocio: rápido, con video y animación.",
            chips: ["Astro", "Tailwind CSS 4", "GSAP"],
            preview: {
              avif: "/previews/octava-1280x800.avif",
              webp: "/previews/octava-1280x800.webp",
              alt: "Portada de «Listo para aprender»: una guitarra eléctrica sobre fondo oscuro, el título «Listo para aprender» y los botones «Escríbeme» y «Ver el ejemplo»."
            }
          },
          description: "Landing de una sola página para una academia de guitarra de demostración. Es una pieza de portafolio: el contenido es ficticio y las imágenes, los videos y la melodía están generados con IA, como declara el propio sitio.",
          details: {
            problem: "Mostrar capacidad de entrega front-end con movimiento, video y temas claro y oscuro sin sacrificar la primera carga ni la accesibilidad.",
            solution: "Sitio estático con Astro y Tailwind 4, sin backend. Hero con video, escena de scroll atada a video, cuerdas interactivas con sonido sintetizado y melodía propia generada por síntesis (Karplus-Strong).",
            architecture: "Todo texto, URL y número vive en archivos JSON validados por esquemas, nunca en los componentes. Los scripts de movimiento (Lenis, GSAP) se difieren. Despliegue automático desde GitHub: main es producción y develop genera una vista previa protegida.",
            challenges: "Mantener liviana la carga inicial con videos pesados, evitar saltos de layout durante el scroll y cuidar contraste y teclado con animaciones activas."
          },
          metrics: "Medido en local: 89,3 KB hasta la carga, 7,8 KB de JS inicial (gzip), LCP mediano de 1,58 s en 4G lenta simulada y CLS 0,0000 en 48 cargas.",
          visible: true
        },
        {
          title: "Ascua: sitio de demostración para una pizzería",
          type: "Sitio web / Gastronomía",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://ascua-demo.mottadev.com",
            embeddable: false,
            summary: "Así puede verse el sitio de tu restaurante: carta, pedido de ejemplo y horario, rápido y claro.",
            preview: {
              avif: "/previews/ascua-1280x800.avif",
              webp: "/previews/ascua-1280x800.webp",
              alt: "Portada de «Ascua»: el titular «Pizza a la brasa, masa de dos días», una pizza sobre un plato de barro y el botón «Ver la carta», sobre fondo crema."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de una pizzería ficticia: carta, pedido de ejemplo y horario, con tema claro y oscuro. Marca, platos e imágenes son de ejemplo; las imágenes están generadas con IA.",
          visible: true
        },
        {
          title: "Vesper: sitio de demostración para una pizzería",
          type: "Sitio web / Gastronomía",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://vesper-demo.mottadev.com",
            embeddable: false,
            summary: "Una carta con notas de cata y pedido de ejemplo, en tema claro u oscuro, para un local que abre al caer la tarde.",
            preview: {
              avif: "/previews/vesper-1280x800.avif",
              webp: "/previews/vesper-1280x800.webp",
              alt: "Portada de «Vesper» en tema oscuro: el titular «La brasa es el ingrediente» sobre una pizza frente a un horno de leña, con los botones «Ver la carta» y «Hacer mi pedido»."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de una pizzería ficticia: carta con notas de cata, pedido de ejemplo y tema claro u oscuro. Marca, platos e imágenes son de ejemplo; las imágenes están generadas con IA.",
          visible: true
        },
        {
          title: "Halo: sitio de demostración para un salón de uñas y cabello",
          type: "Sitio web / Bienestar y belleza",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://halo-salon-bogota.mottadev.com",
            embeddable: false,
            summary: "Reserva paso a paso, catálogo filtrable y bono de regalo interactivo, en tema claro y oscuro, para un salón de belleza.",
            preview: {
              avif: "/previews/halo-1280x800.avif",
              webp: "/previews/halo-1280x800.webp",
              alt: "Portada de «Halo»: salón de uñas y cabello con fotografía editorial, botón de reserva y navegación en tema claro."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de un salón de uñas y cabello ficticio: catálogo filtrable, flujo de reserva en cuatro pasos y constructor de bono de regalo, con tema claro y oscuro.",
          visible: true
        },
        {
          title: "Gremio: sitio de demostración para una barbería",
          type: "Sitio web / Bienestar y belleza",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://gremio-barberia.mottadev.com",
            embeddable: false,
            summary: "Servicios, equipo, reserva de cita y bono de regalo personalizado, en tema claro y oscuro, para una barbería.",
            preview: {
              avif: "/previews/gremio-1280x800.avif",
              webp: "/previews/gremio-1280x800.webp",
              alt: "Portada de «Gremio»: barbería con tipografía condensada, fotografía editorial y acceso directo a reserva."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de una barbería ficticia: carta de servicios, reserva paso a paso y bono de regalo interactivo, con tema claro y oscuro.",
          visible: true
        },
        {
          title: "Nácar: sitio de demostración para un spa y estética",
          type: "Sitio web / Bienestar y belleza",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://nacar-spa.mottadev.com",
            embeddable: false,
            summary: "Carta de rituales, agenda paso a paso y bono de regalo con vista previa viva, en tema claro y oscuro, para un spa.",
            preview: {
              avif: "/previews/nacar-1280x800.avif",
              webp: "/previews/nacar-1280x800.webp",
              alt: "Portada de «Nácar»: spa y estética con estética minimalista, fotografía editorial y botón de reserva."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de un spa y estética ficticio: catálogo de servicios, reserva guiada y bono de regalo interactivo, con tema claro y oscuro.",
          visible: true
        },
        {
          title: "Marfil: sitio de demostración para un consultorio odontológico",
          type: "Sitio web / Salud",
          stack: ["Astro", "Tailwind CSS 4", "Three.js", "TypeScript"],
          demo: {
            url: "https://marfil-dentist.mottadev.com",
            embeddable: false,
            summary: "Un diente en 3D, un consultorio que se recorre arrastrando y pedido de cita, en tema claro y oscuro, para una clínica dental.",
            chips: ["Astro", "Tailwind CSS 4", "Three.js"],
            preview: {
              avif: "/previews/marfil-1280x800.avif",
              webp: "/previews/marfil-1280x800.webp",
              alt: "Portada de «Marfil»: el titular «Una sonrisa» y un diente en 3D dentro de un círculo sobre fondo crema, con el botón «Pedir cita»."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de un consultorio odontológico ficticio: portada con un diente en 3D, escenas del consultorio y del mapa que se arrastran, servicios, opiniones y contacto, con tema claro y oscuro. Marca, textos e imágenes son de ejemplo.",
          visible: true
        },
        {
          title: "Tersa A: sitio de demostración para una dermatología",
          type: "Sitio web / Salud",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://tersa-dermatologia.mottadev.com",
            embeddable: false,
            summary: "La palabra «piel» se acerca con el scroll hasta abrir el contenido y pedir cita, en tema claro y oscuro, para una dermatología.",
            chips: ["Astro", "Tailwind CSS 4", "TypeScript"],
            preview: {
              avif: "/previews/tersa-a-1280x800.avif",
              webp: "/previews/tersa-a-1280x800.webp",
              alt: "Portada de «Tersa A»: la palabra «piel» en tamaño gigante junto al texto «Mire su piel de cerca» y el botón «Solicitar cita»."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de una dermatología ficticia de Bogotá: una palabra enorme que se acerca con el scroll hasta abrir el contenido, con guía de la primera cita y del consultorio, en tema claro y oscuro. Marca y textos son de ejemplo.",
          visible: true
        },
        {
          title: "Tersa B: sitio de demostración para una dermatología",
          type: "Sitio web / Salud",
          stack: ["Astro", "Tailwind CSS 4", "TypeScript"],
          demo: {
            url: "https://tersa-piel.mottadev.com",
            embeddable: false,
            summary: "Un quiz de piel de tres preguntas con tarjetas de palabras que sugiere un motivo de consulta, en tema claro y oscuro, para una dermatología.",
            chips: ["Astro", "Tailwind CSS 4", "TypeScript"],
            preview: {
              avif: "/previews/tersa-b-1280x800.avif",
              webp: "/previews/tersa-b-1280x800.webp",
              alt: "Portada de «Tersa B»: la pregunta «¿Qué le preocupa de su piel?» y seis tarjetas con motivos de consulta como acné, manchas y lunares."
            },
            exampleBadge: true
          },
          description: "Sitio de demostración de una dermatología ficticia de Bogotá: un quiz de dos o tres preguntas con tarjetas de solo palabras y un resultado que sugiere un motivo de consulta, en tema claro y oscuro. Marca y textos son de ejemplo.",
          visible: true
        }
      ] as Project[]
    },
    education: {
      visible: true,
      items: [
        {
          degree: "Ingeniero de Sistemas",
          institution: "Escuela Colombiana de Ingeniería Julio Garavito",
          period: "2024",
          status: "Graduado"
        }
      ]
    },
    certifications: {
      visible: true,
      items: [
        {
          name: "Cloud Architecture Specialist",
          issuer: "AWS / In-house training",
          year: "2024"
        },
        {
          name: "Software Design Patterns & SOLID",
          issuer: "Academic Certification",
          year: "2023"
        }
      ]
    },
    technical_skills: {
      visible: true,
      groups: [
        {
          domain: "Backend & Languages",
          skills: ["Java (Spring Boot/Cloud)", "Python", "Node.js (Express/Fastify)", "TypeScript", "SQL"]
        },
        {
          domain: "Cloud & DevOps",
          skills: ["AWS (ECS, RDS, Cognito, API Gateway)", "Azure", "Docker", "GitHub Actions", "CI/CD"]
        },
        {
          domain: "AI & Data",
          skills: ["LLM Integration (Gemini, OpenAI)", "MCP (Model Context Protocol)", "PostgreSQL", "MongoDB", "Redis"]
        },
        {
          domain: "Architecture & Standards",
          skills: ["Microservices", "RESTful APIs", "SOLID", "Design Patterns", "Clean Architecture"]
        }
      ] as SkillGroup[]
    },
    soft_skills: {
      visible: true,
      items: ["Mentoring Técnico", "Colaboración en Equipos Ágiles", "Resolución de Problemas Complejos", "Adaptabilidad Tecnológica"]
    },
    languages: {
      visible: true,
      items: [
        { language: "Español", level: "C1 - Nativo" },
        { language: "Inglés", level: "C1 - Profesional Técnico" }
      ]
    }
  }
};
