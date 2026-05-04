"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";

const NAV_ITEMS = [
  { key: "trending", icon: "↑", label: "Trending" },
  { key: "newReleases", icon: "★", label: "New Releases" },
  { key: "comingSoon", icon: "◷", label: "Coming Soon" },
  { key: "favorites", icon: "♡", label: "Favorites" },
  { key: "watchLater", icon: "⊕", label: "Watch Later" },
];

// dictionary prop passed from server so we don't need to fetch it client-side
const MobileSidebar = ({ dictionary, activeKey = "trending" }) => {
  const [open, setOpen] = useState(false);

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Hamburger trigger — only visible below lg */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="
          lg:hidden
          w-9 h-9 flex flex-col items-center justify-center gap-1.5
          rounded-lg border border-[#C9A84C]/18 bg-[#18181C]
          text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]
          hover:bg-[#C9A84C]/10 transition-all duration-200
        "
      >
        <span className="w-4 h-px bg-current rounded-full" />
        <span className="w-4 h-px bg-current rounded-full" />
        <span className="w-3 h-px bg-current rounded-full self-start ml-[8px]" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/70 backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-[#111114] border-r border-[#C9A84C]/15
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <Image src={logo} width="139" height="26" alt="" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="
              w-7 h-7 flex items-center justify-center rounded-lg
              border border-white/8 bg-[#18181C]
              text-[#9B978D] hover:text-[#C9A84C]
              transition-colors duration-150 text-sm
            "
          >
            ✕
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ key, icon, label }) => {
              const isActive = key === activeKey;
              return (
                <li key={key}>
                  <a
                    href="#"
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3
                      px-4 py-3 rounded-lg
                      text-sm font-medium
                      border transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#C9A84C]/10 border-[#C9A84C]/30 text-[#C9A84C]"
                          : "border-transparent text-[#9B978D] hover:bg-[#18181C] hover:text-[#F0EDE6]"
                      }
                    `}
                  >
                    <span
                      className={`
                        w-4 shrink-0 text-center text-sm leading-none select-none
                        ${isActive ? "text-[#C9A84C]" : "text-[#5A574F]"}
                      `}
                    >
                      {icon}
                    </span>
                    {dictionary?.[key] ?? label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;
