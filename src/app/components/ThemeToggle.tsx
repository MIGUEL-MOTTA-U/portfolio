import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors border border-border"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 90,
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-4 h-4" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -90,
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-4 h-4" />
      </motion.div>
    </button>
  );
}
