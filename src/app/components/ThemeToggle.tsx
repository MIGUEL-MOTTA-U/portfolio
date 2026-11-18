import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/** Alternador de tema (40×40). El icono muestra el tema al que se cambia: luna en claro, sol en oscuro. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="size-10" aria-hidden="true" />;

  const oscuro = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(oscuro ? "light" : "dark")}
      className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-border text-foreground transition-colors duration-[160ms] ease-out hover:bg-secondary"
      aria-label={oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {oscuro ? <Sun className="size-[18px]" aria-hidden="true" /> : <Moon className="size-[18px]" aria-hidden="true" />}
    </button>
  );
}
