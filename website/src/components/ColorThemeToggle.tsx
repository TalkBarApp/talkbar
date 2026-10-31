import { useEffect, useState } from "react";

type ColorTheme = "warm" | "blue";

interface ColorThemeToggleProps {
  switchToWarmLabel: string;
  switchToBlueLabel: string;
}

const BLUE = "#054df6";
const COLOR_THEME_EVENT = "talkbar:color-theme";

const getInitialColorTheme = (): ColorTheme => {
  if (typeof window === "undefined") return "blue";
  return localStorage.getItem("colorTheme") === "warm" ? "warm" : "blue";
};

const applyColorTheme = (colorTheme: ColorTheme) => {
  const isBlue = colorTheme === "blue";
  document.documentElement.classList.toggle("color-theme-blue", isBlue);
  localStorage.setItem("colorTheme", colorTheme);

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", isBlue ? BLUE : "#d58458");
};

const ColorThemeToggle = ({ switchToWarmLabel, switchToBlueLabel }: ColorThemeToggleProps) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(getInitialColorTheme);
  // Set by a click, cleared when the pointer leaves: keeps the dot on the
  // new colour instead of previewing the old one while still hovered.
  const [justSwitched, setJustSwitched] = useState(false);
  const nextTheme = colorTheme === "warm" ? "blue" : "warm";
  const nextThemeLabel = nextTheme === "warm" ? switchToWarmLabel : switchToBlueLabel;

  const updateColorTheme = (nextColorTheme: ColorTheme, broadcast = false) => {
    setColorTheme(nextColorTheme);
    if (broadcast) {
      window.dispatchEvent(new CustomEvent(COLOR_THEME_EVENT, { detail: nextColorTheme }));
    }
  };

  useEffect(() => {
    applyColorTheme(colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    const syncColorTheme = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      if (event.detail !== "warm" && event.detail !== "blue") return;
      updateColorTheme(event.detail);
    };

    window.addEventListener(COLOR_THEME_EVENT, syncColorTheme);
    return () => window.removeEventListener(COLOR_THEME_EVENT, syncColorTheme);
  }, []);

  const switchColorTheme = () => {
    updateColorTheme(nextTheme, true);
    setJustSwitched(true);
  };

  return (
    <button
      type="button"
      className={`color-dot-btn cursor-pointer flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors duration-200${justSwitched ? " is-switched" : ""}`}
      onClick={switchColorTheme}
      onPointerLeave={() => setJustSwitched(false)}
      onBlur={() => setJustSwitched(false)}
      aria-label={nextThemeLabel}
      data-tooltip={nextThemeLabel}
      data-tooltip-side="bottom"
    >
      {/* Colours come from CSS (.color-dot in global.css), keyed off the
          theme class on <html>, so the dot is right from the first paint. */}
      <span className="color-dot" aria-hidden="true">
        <span className="color-dot-warm" />
        <span className="color-dot-blue" />
      </span>
    </button>
  );
};

export default ColorThemeToggle;
