"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.svg";

const NAV_ITEMS = [
  { key: "trending", icon: "↑", label: "Trending" },
  { key: "newReleases", icon: "★", label: "New Releases" },
  { key: "comingSoon", icon: "◷", label: "Coming Soon" },
  { key: "favorites", icon: "♡", label: "Favorites" },
  { key: "watchLater", icon: "⊕", label: "Watch Later" },
];

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "bn", label: "বাং" },
];

const MobileMenu = ({ dictionary, activeKey = "trending" }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* ── Hamburger button ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="
    lg:hidden
    flex items-center justify-center
    w-11 h-11 rounded-xl
    border border-[#C9A84C]/30 bg-[#18181C]
    text-[#C9A84C] hover:bg-[#C9A84C]/10
    transition-all duration-300 active:scale-95
  "
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {/* ── Backdrop (Higher z-index) ── */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md lg:hidden
          transition-opacity duration-300 ease-in-out
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* ── Drawer (The Fixed Part) ── */}
      <aside
        style={{
          backgroundColor: "#111114",
          boxShadow: "-10px 0 50px rgba(0,0,0,1)",
          visibility: open ? "visible" : "hidden",
          height: "100vh", // Force full viewport height
          position: "fixed", // Ensure it ignores parent height
          top: 0,
          right: 0,
        }}
        className={`
    fixed top-0 right-0 z-[9999]
    w-[280px]
    flex flex-col
    transition-transform duration-300 ease-in-out
    lg:hidden
    ${open ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-white/5 bg-[#111114]">
          <Image src={logo} width={120} height={24} alt="Logo" priority />
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Language Selection */}
        <div className="px-5 py-2 bg-[#111114]">
          <div className="flex p-1 rounded-xl bg-black/40 border border-white/5">
            <button className="flex-1 py-2 text-xs rounded-lg bg-[#C9A84C] text-black font-bold">
              EN
            </button>
            <button className="flex-1 py-2 text-xs rounded-lg text-[#9B978D]">
              বাং
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto bg-[#111114]">
          <p className="px-4 text-[10px] uppercase tracking-widest text-[#5A574F] mb-4">
            Browse
          </p>
          <ul className="space-y-2">
            {NAV_ITEMS.map(({ key, icon, label }) => (
              <li key={key}>
                <button className="flex items-center gap-4 w-full px-4 py-2 rounded-xl text-[#9B978D] hover:bg-white/5 hover:text-[#C9A84C] transition-all">
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
