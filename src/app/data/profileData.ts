export interface Project {
  title: string;
  type: string;
  stack: string[];
  repo: string;
  description: string;
  metrics?: string;
  visible: boolean;
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

export const profileData = {
  version: "1.0.3",
  last_updated: "2026-06-05T16:30:00Z",
  personal_info: {
    name: "Miguel Motta",
    role: "Ingeniero de Sistemas | Fullstack Engineer & Cloud Architect",
    location: "Colombia",
    email: "miguelangelmu2016@gmail.com",
    links: {
      github: "https://github.com/MIGUEL-MOTTA-U/",
      linkedin: "https://www.linkedin.com/in/miguelangelmotta-backendengineer/"
    }
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
        }
      ] as (Project & { details: any })[]
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
