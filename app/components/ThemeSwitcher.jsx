"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        w-9 h-9 flex items-center justify-center
        rounded-lg border border-[#C9A84C]/18 bg-[#18181C]
        text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]
        hover:bg-[#C9A84C]/10 transition-all duration-200
        text-base
      "
    >
      {isDark ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
};

export default ThemeSwitcher;
