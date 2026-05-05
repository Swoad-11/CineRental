"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "/public/logo.svg";

const NAV_ITEMS = [
  { key: "trending", icon: "↑", label: "Trending", filter: "trending" },
  {
    key: "newReleases",
    icon: "★",
    label: "New Releases",
    filter: "new-releases",
  },
  { key: "comingSoon", icon: "◷", label: "Coming Soon", filter: "coming-soon" },
  { key: "topRated", icon: "♛", label: "Top Rated", filter: "top-rated" },
  { key: "popular", icon: "♟", label: "Popular", filter: "popular" },
];

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "bn", label: "বাং" },
];

const MobileMenu = ({ dictionary }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter") ?? "trending";
  const activeLang =
    LANGUAGES.find((l) => pathname.startsWith(`/${l.code}`))?.code ?? "en";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleFilter = (filter) => {
    router.push(`/${activeLang}?filter=${filter}`);
    setOpen(false);
  };

  const handleLang = (code) => {
    const filter = searchParams.get("filter") ?? "trending";
    router.push(`/${code}?filter=${filter}`);
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="
          lg:hidden flex items-center justify-center
          w-10 h-10 rounded-xl
          border border-[#C9A84C]/30 bg-[#18181C]
          text-[#C9A84C] hover:bg-[#C9A84C]/10
          transition-all duration-200 active:scale-95
        "
      >
        <svg
          width="18"
          height="18"
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

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm lg:hidden
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-[9999]
          w-[280px] h-screen flex flex-col
          bg-[#111114] border-l border-[#C9A84C]/10
          shadow-[-20px_0_60px_rgba(0,0,0,0.8)]
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Gold top accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/6 shrink-0">
          <Image src={logo} width={110} height={22} alt="Logo" priority />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="
              w-8 h-8 flex items-center justify-center rounded-lg
              bg-white/5 border border-white/8
              text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]/30
              text-sm transition-all duration-150
            "
          >
            ✕
          </button>
        </div>

        {/* Language toggle */}
        <div className="px-4 pt-4 pb-3 border-b border-white/6 shrink-0">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#5A574F] mb-2">
            Language
          </p>
          <div className="flex p-0.5 gap-0.5 rounded-lg bg-black/40 border border-white/6">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => handleLang(code)}
                className={`
                  flex-1 py-2 text-xs font-medium rounded-md transition-all duration-200
                  ${
                    activeLang === code
                      ? "bg-[#C9A84C] text-[#0A0A0B] font-bold"
                      : "text-[#9B978D] hover:text-[#F0EDE6]"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-4 text-[9px] uppercase tracking-[0.15em] text-[#5A574F] mb-3">
            Browse
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ key, icon, label, filter }) => {
              const isActive = activeFilter === filter;
              return (
                <li key={key}>
                  <button
                    onClick={() => handleFilter(filter)}
                    className={`
                      flex items-center gap-3 w-full
                      px-4 py-3 rounded-lg text-sm font-medium
                      border transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#C9A84C]/10 border-[#C9A84C]/30 text-[#C9A84C]"
                          : "border-transparent text-[#9B978D] hover:bg-white/5 hover:text-[#F0EDE6]"
                      }
                    `}
                  >
                    <span
                      className={`w-4 shrink-0 text-center text-sm leading-none ${isActive ? "text-[#C9A84C]" : "text-[#5A574F]"}`}
                    >
                      {icon}
                    </span>
                    <span>{dictionary?.[key] ?? label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
