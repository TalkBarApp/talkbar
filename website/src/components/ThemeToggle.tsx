import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

interface ThemeToggleProps {
  switchToDarkLabel: string;
  switchToLightLabel: string;
}

const ThemeToggle = ({ switchToDarkLabel, switchToLightLabel }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");
  const label = theme === "light" ? switchToDarkLabel : switchToLightLabel;

  return (
    <button
      type="button"
      onClick={toggle}
      className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors duration-200"
      aria-label={label}
      data-tooltip={label}
      data-tooltip-side="bottom"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

export default ThemeToggle;
