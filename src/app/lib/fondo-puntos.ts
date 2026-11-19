/**
 * Geometría y parámetros del fondo reactivo (CR-003, UI-SPEC §4 y §5).
 * Funciones puras: sin DOM, sin estado. Los números salen del prototipo aprobado el 2026-11-19.
 *
 * Una sola rejilla cuadrada, girada 45° y fija a la pantalla. El nudo (i, j) cae en
 * x = (i + j)·p·√½ y y = (i − j)·p·√½. La estrella del logo es un astroide con las puntas
 * sobre los ejes de esa rejilla, es decir, en las diagonales de la pantalla.
 */

export const RAIZ_MEDIA = Math.SQRT1_2;

export interface Perfil {
  /** Paso de rejilla en px. */
  p: number;
  /** Radio mínimo del punto en px. */
  r0: number;
  /** Radio máximo del punto en px (en el frente). */
  r1: number;
  /** Distancia de la punta de la estrella al origen cuando la onda llega a su máximo, en px. */
  R: number;
}

export const PERFIL_ESCRITORIO: Perfil = { p: 16, r0: 1.5, r1: 3, R: 400 };
export const PERFIL_MOVIL: Perfil = { p: 12, r0: 1.25, r1: 2.5, R: 260 };
/** Por debajo de este ancho (px) se usa el perfil móvil. */
export const PUNTO_DE_CORTE = 768;

/**
 * Factor de velocidad de las animaciones. 1 es el ritmo aprobado (onda de 1200 ms).
 * Escala la duración de la onda y la entrada, la salida y la estela del halo. No escala esperas (reposo, enfriamiento).
 * No tiene que ver con la latencia entre pulsar y dibujar, que no depende de esta constante.
 */
export const VELOCIDAD = 1;

export const ONDA = {
  /** Ms de vida de una onda. */
  duracion: 1200 / VELOCIDAD,
  maxOndas: 4,
  enfria: 250,
  alfa: 0.9,
  /** Rampa delante del frente, en pasos de rejilla. */
  avance: 0.75,
  /** Constante de caída detrás del frente, en pasos de rejilla. */
  cola: 2.4,
  /** Detrás del frente, más allá de estos pasos la intensidad es 0. */
  corte: 7,
  haloUmbral: 0.55,
  haloRadio: 2.6,
  haloAlfa: 0.16,
} as const;

export const HOVER = {
  /** [radio en pasos de rejilla, intensidad `k`] de dentro hacia fuera. */
  anillos: [
    [4, 0.65],
    [7, 0.4],
    [10, 0.18],
  ] as ReadonlyArray<readonly [number, number]>,
  kMax: 0.65,
  alfa: 0.8,
  r0: 1.5,
  r1: 3,
  /** Factor de la estela por cada 16,667 ms (0,92 al ritmo original). */
  decae: Math.pow(0.92, VELOCIDAD),
  /** Por debajo de esta intensidad el nudo se borra. */
  descarte: 0.05,
  /** Ms sin mover el cursor antes de que el halo empiece a salir. */
  reposo: 800,
  /** Ms de entrada del halo al mover el cursor. */
  entra: 120 / VELOCIDAD,
  /** Ms de salida del halo tras el reposo o al salir el cursor de la ventana. */
  sale: 400 / VELOCIDAD,
  haloUmbral: 0.4,
  haloRadio: 2.4,
  haloAlfa: 0.12,
} as const;

/** Gestos que disparan la onda (UI-SPEC §6). */
export const GESTO = {
  /** Px que se mueve un ratón o lápiz tras pulsar para que sea un arrastre y la onda se cancele. */
  arrastreRaton: 6,
  /** Px que se mueve el dedo para que ya no cuente como toque. */
  arrastreToque: 10,
  /** Ms máximos entre apoyar y levantar el dedo para que cuente como toque. */
  toqueMax: 500,
  /** Ms que tarda en apagarse una onda cancelada. */
  cancelacion: 120,
} as const;

/** ¿El desplazamiento (dx, dy) supera el umbral en px? */
export const superaUmbral = (dx: number, dy: number, umbral: number): boolean => dx * dx + dy * dy > umbral * umbral;

export const perfilPara = (ancho: number): Perfil => (ancho < PUNTO_DE_CORTE ? PERFIL_MOVIL : PERFIL_ESCRITORIO);

/** Posición en pantalla del nudo (i, j). */
export const posicion = (i: number, j: number, p: number): [number, number] => [
  (i + j) * p * RAIZ_MEDIA,
  (i - j) * p * RAIZ_MEDIA,
];

/** Nudo de la rejilla más cercano al punto (x, y). */
export const nudoCercano = (x: number, y: number, p: number): [number, number] => [
  Math.round((x + y) / (2 * p * RAIZ_MEDIA)),
  Math.round((x - y) / (2 * p * RAIZ_MEDIA)),
];

/** Coordenadas reales de rejilla (no enteras) del punto (x, y). */
export const rejillaReal = (x: number, y: number, p: number): [number, number] => [
  (x + y) / (2 * p * RAIZ_MEDIA),
  (x - y) / (2 * p * RAIZ_MEDIA),
];

/**
 * Distancia «de astroide» para un desplazamiento (a, b) medido en pasos de rejilla.
 * El conjunto `distancia = R` es la estrella de 4 puntas del logo.
 */
export const distanciaAstroide = (a: number, b: number, p: number): number =>
  p * Math.pow(Math.pow(Math.abs(a), 2 / 3) + Math.pow(Math.abs(b), 2 / 3), 1.5);

/** Radio del frente (punta de la estrella) en el instante `t` de 0 a 1: ease-out de cuarto grado. */
export const radioFrente = (t: number, R: number): number => R * (1 - Math.pow(1 - t, 4));

/** Vida de la onda: 1 al nacer y 0 al terminar. */
export const vidaOnda = (t: number): number => 1 - t * t;

/**
 * Intensidad de un nudo de la onda. `d = radioFrente − distancia del nudo`:
 * positivo detrás del frente y negativo delante. Devuelve un valor entre 0 y 1.
 */
export function intensidadOnda(d: number, p: number): number {
  const avance = ONDA.avance * p;
  if (d < -avance || d > ONDA.corte * p) return 0;
  return d < 0 ? 1 + d / avance : Math.exp(-d / (ONDA.cola * p));
}

/** Intensidad `k` del anillo del hover para la distancia de astroide `s` al cursor, en px. */
export function intensidadAnillo(s: number, p: number): number {
  for (const [pasos, k] of HOVER.anillos) if (s < pasos * p) return k;
  return 0;
}

export interface NudoEncendido {
  i: number;
  j: number;
  k: number;
}

/** Nudos que el cursor en (x, y) enciende en este fotograma, con su intensidad. */
export function nudosEncendidos(x: number, y: number, p: number): NudoEncendido[] {
  const [fi, fj] = rejillaReal(x, y, p);
  const rr = HOVER.anillos[HOVER.anillos.length - 1][0] + 1;
  const i0 = Math.round(fi);
  const j0 = Math.round(fj);
  const salida: NudoEncendido[] = [];
  for (let i = i0 - rr; i <= i0 + rr; i++) {
    for (let j = j0 - rr; j <= j0 + rr; j++) {
      const k = intensidadAnillo(distanciaAstroide(i - fi, j - fj, p), p);
      if (k > 0) salida.push({ i, j, k });
    }
  }
  return salida;
}

/** Radio del punto del halo según la intensidad `k`. */
export const radioPuntoHover = (k: number): number =>
  HOVER.r0 + (HOVER.r1 - HOVER.r0) * Math.min(1, k / HOVER.kMax);

/** Color `r,g,b` para `rgba()` a partir de `#rrggbb`. Devuelve `null` si no es ese formato. */
export function hexARgb(valor: string): string | null {
  const v = valor.trim().replace("#", "");
  return /^[0-9a-f]{6}$/i.test(v) ? [0, 2, 4].map((n) => parseInt(v.slice(n, n + 2), 16)).join(",") : null;
}
