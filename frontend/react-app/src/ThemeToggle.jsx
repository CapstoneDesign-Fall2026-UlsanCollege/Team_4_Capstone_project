import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, readStoredTheme, toggleTheme } from "./theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => readStoredTheme());

  useEffect(() => {
    setTheme(applyTheme(readStoredTheme()));
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(toggleTheme())}
    >
      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
