/**
 * Fondo reactivo con puntos (CR-003, UI-SPEC): una onda con forma de la estrella del logo al hacer clic o tocar,
 * y un halo de puntos que sigue al cursor con puntero fino. Una sola capa <canvas> fija, sin bloquear clics.
 * Toda la geometría vive en `../lib/fondo-puntos.ts`. Aquí solo hay estado, eventos y dibujo.
 */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  GESTO,
  HOVER,
  ONDA,
  distanciaAstroide,
  hexARgb,
  intensidadOnda,
  nudoCercano,
  nudosEncendidos,
  perfilPara,
  posicion,
  radioFrente,
  radioPuntoHover,
  superaUmbral,
  vidaOnda,
  type Perfil,
} from "../lib/fondo-puntos";

interface Onda {
  x: number;
  y: number;
  t0: number;
  perfil: Perfil;
  color: string;
  /** Instante en que se canceló (la pulsación se volvió un arrastre). La onda se apaga en `GESTO.cancelacion` ms. */
  corte?: number;
}

/** Pulsación en curso, desde que se apoya el puntero hasta que se levanta o se cancela. */
interface Gesto {
  id: number;
  x: number;
  y: number;
  t: number;
  toque: boolean;
  onda: Onda | null;
}

interface Encendido {
  i: number;
  j: number;
  k: number;
  p: number;
}

/** Elementos sobre los que un clic no lanza onda (UI-SPEC §6). */
const CONTROLES =
  "a,button,input,textarea,select,summary,label,[role=button],[contenteditable],video,iframe";
const VUELTA = Math.PI * 2;

/** `r,g,b` de `--primary` en el tema actual. Si la variable no es hexadecimal, usa el valor de la marca. */
function colorPrimario(): string {
  const raiz = document.documentElement;
  return (
    hexARgb(getComputedStyle(raiz).getPropertyValue("--primary")) ??
    (raiz.classList.contains("dark") ? "52,211,153" : "4,120,87")
  );
}

/** Tabla de distancias de astroide por perfil, para no recalcular potencias en cada fotograma. */
const tablas = new Map<number, Float32Array>();
function tablaAstroide(perfil: Perfil): { datos: Float32Array; lado: number } {
  const lado = Math.ceil(perfil.R / perfil.p) + 1;
  let datos = tablas.get(perfil.p);
  if (!datos) {
    datos = new Float32Array(lado * lado);
    for (let a = 0; a < lado; a++) for (let b = 0; b < lado; b++) datos[a * lado + b] = distanciaAstroide(a, b, perfil.p);
    tablas.set(perfil.p, datos);
  }
  return { datos, lado };
}

export function OndaFondo() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const lienzo = ref.current;
    const ctx = lienzo?.getContext("2d");
    if (!lienzo || !ctx) return;

    const reducir = matchMedia("(prefers-reduced-motion: reduce)");
    const fino = matchMedia("(hover: hover) and (pointer: fine)");

    let ancho = 0;
    let alto = 0;
    let ondas: Onda[] = [];
    const encendidos = new Map<string, Encendido>();
    let corre = false;
    let cuadroId = 0;
    let ultimaOnda = -Infinity;
    let ultCuadro = 0;
    // Estado del halo del cursor
    let mx = 0;
    let my = 0;
    let dentro = false;
    let ultMov = -Infinity;
    let entrada = 0;
    let salida = 1;
    let colorHover: string | null = null;

    const medir = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      // Se mide el lienzo tal como se muestra. Con una barra de desplazamiento clásica, su ancho útil es menor que
      // `innerWidth`: medir con `innerWidth` encoge la imagen y desplaza todo hacia la izquierda.
      ancho = lienzo.clientWidth || innerWidth;
      alto = lienzo.clientHeight || innerHeight;
      lienzo.width = Math.round(ancho * d);
      lienzo.height = Math.round(alto * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const punto = (x: number, y: number, r: number, color: string, alfa: number) => {
      ctx.fillStyle = `rgba(${color},${alfa.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, VUELTA);
      ctx.fill();
    };

    const pintar = (ahora: number) => {
      ctx.clearRect(0, 0, ancho, alto);

      // Onda del clic
      ondas = ondas.filter(
        (o) => ahora - o.t0 < ONDA.duracion && (o.corte === undefined || ahora - o.corte < GESTO.cancelacion),
      );
      for (const o of ondas) {
        const corte = o.corte === undefined ? 1 : 1 - (ahora - o.corte) / GESTO.cancelacion;
        const t = (ahora - o.t0) / ONDA.duracion;
        const { p, r0, r1, R } = o.perfil;
        const { datos, lado } = tablaAstroide(o.perfil);
        const N = lado - 1;
        const frente = radioFrente(t, R);
        const vida = vidaOnda(t) * corte;
        for (let i = -N; i <= N; i++) {
          for (let j = -N; j <= N; j++) {
            const I = intensidadOnda(frente - datos[Math.abs(i) * lado + Math.abs(j)], p);
            if (I === 0) continue;
            const [dx, dy] = posicion(i, j, p);
            const x = o.x + dx;
            const y = o.y + dy;
            if (x < -8 || y < -8 || x > ancho + 8 || y > alto + 8) continue;
            const r = r0 + (r1 - r0) * I;
            if (I > ONDA.haloUmbral) punto(x, y, r * ONDA.haloRadio, o.color, ONDA.haloAlfa * I * vida);
            punto(x, y, r, o.color, ONDA.alfa * I * vida);
          }
        }
      }

      // Halo del cursor
      const g = entrada * salida;
      if (g > 0 && colorHover) {
        for (const h of encendidos.values()) {
          const [x, y] = posicion(h.i, h.j, h.p);
          const r = radioPuntoHover(h.k);
          if (h.k > HOVER.haloUmbral) {
            punto(x, y, r * HOVER.haloRadio, colorHover, HOVER.haloAlfa * Math.min(1, h.k / HOVER.kMax) * g);
          }
          punto(x, y, r, colorHover, HOVER.alfa * h.k * g);
        }
      }
    };

    /** Avanza el estado del halo. Devuelve `true` mientras el cursor lo mantiene encendido. */
    const actualizarHover = (ahora: number, dt: number): boolean => {
      const activo = dentro && ahora - ultMov < HOVER.reposo;
      if (activo) {
        if (entrada === 0) colorHover = colorPrimario();
        entrada = Math.min(1, entrada + dt / HOVER.entra);
        salida = 1;
        const p = perfilPara(innerWidth).p;
        for (const n of nudosEncendidos(mx, my, p)) {
          const clave = `${n.i},${n.j}`;
          const e = encendidos.get(clave);
          if (e) e.k = Math.max(e.k, n.k);
          else encendidos.set(clave, { ...n, p });
        }
      } else {
        salida = Math.max(0, salida - dt / HOVER.sale);
        if (salida === 0) {
          entrada = 0;
          encendidos.clear();
        }
      }
      const f = Math.pow(HOVER.decae, dt / 16.667);
      for (const [clave, h] of encendidos) {
        h.k *= f;
        if (h.k < HOVER.descarte) encendidos.delete(clave);
      }
      return activo;
    };

    const cuadro = (ahora: number) => {
      const dt = Math.min(Math.max(ahora - ultCuadro, 0), 50) || 16.667;
      ultCuadro = ahora;
      const activo = actualizarHover(ahora, dt);
      pintar(ahora);
      if (ondas.length || activo || encendidos.size || (salida > 0 && entrada > 0)) {
        cuadroId = requestAnimationFrame(cuadro);
      } else {
        corre = false;
        ctx.clearRect(0, 0, ancho, alto);
      }
    };

    const arrancar = () => {
      if (corre) return;
      corre = true;
      ultCuadro = performance.now();
      cuadroId = requestAnimationFrame(cuadro);
    };

    /** ¿Puede esta pulsación lanzar una onda? No sobre controles ni con «reducir movimiento». */
    const admite = (destino: EventTarget | null): boolean =>
      !reducir.matches && !(destino instanceof Element && destino.closest(CONTROLES));

    /** Lanza una onda en el nudo más cercano a (x, y). Devuelve `null` si aún está en enfriamiento. */
    const lanzar = (x: number, y: number): Onda | null => {
      const ahora = performance.now();
      if (ahora - ultimaOnda < ONDA.enfria) return null;
      ultimaOnda = ahora;
      const perfil = perfilPara(innerWidth);
      const [i, j] = nudoCercano(x, y, perfil.p);
      const [ox, oy] = posicion(i, j, perfil.p);
      const onda: Onda = { x: ox, y: oy, t0: ahora, perfil, color: colorPrimario() };
      ondas.push(onda);
      if (ondas.length > ONDA.maxOndas) ondas.shift();
      arrancar();
      return onda;
    };

    const cancelarOnda = (onda: Onda | null) => {
      if (onda && onda.corte === undefined) onda.corte = performance.now();
    };

    // Ratón y lápiz: la onda nace al pulsar, sin esperar a soltar. Si la pulsación se vuelve un arrastre
    // (por ejemplo, para seleccionar texto), la onda se apaga.
    // Dedo: no se sabe al apoyarlo si será un toque o el inicio de un desplazamiento. La onda nace al levantarlo.
    let gesto: Gesto | null = null;

    const alPulsar = (e: PointerEvent) => {
      gesto = null;
      if (!e.isPrimary || e.button !== 0 || !admite(e.target)) return;
      const toque = e.pointerType === "touch";
      gesto = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), toque, onda: null };
      if (!toque) gesto.onda = lanzar(e.clientX, e.clientY);
    };

    const alLevantar = (e: PointerEvent) => {
      const g = gesto;
      if (!g || g.id !== e.pointerId) return;
      gesto = null;
      if (g.toque && performance.now() - g.t < GESTO.toqueMax && admite(e.target)) lanzar(g.x, g.y);
    };

    const alCancelarGesto = (e: PointerEvent) => {
      if (gesto && gesto.id === e.pointerId) {
        cancelarOnda(gesto.onda);
        gesto = null;
      }
    };

    const alMoverElPuntero = (e: PointerEvent) => {
      if (gesto && gesto.id === e.pointerId) {
        const umbral = gesto.toque ? GESTO.arrastreToque : GESTO.arrastreRaton;
        if (superaUmbral(e.clientX - gesto.x, e.clientY - gesto.y, umbral)) {
          cancelarOnda(gesto.onda);
          gesto = null;
        }
      }
      if (reducir.matches || !fino.matches || e.pointerType === "touch") return;
      mx = e.clientX;
      my = e.clientY;
      ultMov = performance.now();
      dentro = true;
      arrancar();
    };

    const alSalirElPuntero = () => {
      dentro = false;
    };

    const alCambiarMovimiento = () => {
      if (!reducir.matches) return;
      ondas = [];
      encendidos.clear();
      dentro = false;
      entrada = 0;
      salida = 1;
      ctx.clearRect(0, 0, ancho, alto);
    };

    medir();
    // La barra de desplazamiento puede aparecer o desaparecer sin que cambie la ventana (por ejemplo, al crecer la página).
    const observador = new ResizeObserver(medir);
    observador.observe(lienzo);
    addEventListener("resize", medir);
    addEventListener("pointerdown", alPulsar, { passive: true });
    addEventListener("pointerup", alLevantar, { passive: true });
    addEventListener("pointercancel", alCancelarGesto, { passive: true });
    addEventListener("pointermove", alMoverElPuntero, { passive: true });
    document.documentElement.addEventListener("pointerleave", alSalirElPuntero);
    reducir.addEventListener("change", alCambiarMovimiento);

    return () => {
      cancelAnimationFrame(cuadroId);
      observador.disconnect();
      removeEventListener("resize", medir);
      removeEventListener("pointerdown", alPulsar);
      removeEventListener("pointerup", alLevantar);
      removeEventListener("pointercancel", alCancelarGesto);
      removeEventListener("pointermove", alMoverElPuntero);
      document.documentElement.removeEventListener("pointerleave", alSalirElPuntero);
      reducir.removeEventListener("change", alCambiarMovimiento);
    };
  }, []);

  return createPortal(
    <canvas
      id="onda"
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 size-full print:hidden"
    />,
    document.body,
  );
}
