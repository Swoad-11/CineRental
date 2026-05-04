"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdLanguage } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "bn", label: "Bangla", flag: "🇧🇩" },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const found = languages.find((l) => pathname.includes(l.code));
  const [selected, setSelected] = useState(found ?? languages[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
    router.push(`/${lang.code}` + pathname.slice(3));
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          flex items-center gap-1.5 h-9 px-3
          rounded-lg border border-[#C9A84C]/18 bg-[#18181C]
          text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]
          hover:bg-[#C9A84C]/10 transition-all duration-200
          text-xs font-medium tracking-wide
        "
      >
        <MdLanguage className="text-sm" />
        <span>{selected.label}</span>
        <MdKeyboardArrowDown
          className={`text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          className="
            absolute right-0 top-[calc(100%+6px)] z-50
            min-w-[140px] overflow-hidden
            rounded-lg border border-[#C9A84C]/25
            bg-[#18181C] shadow-[0_8px_32px_rgba(0,0,0,0.6)]
          "
        >
          {languages.map((lang) => {
            const isActive = lang.code === selected.code;
            return (
              <li key={lang.code}>
                <button
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(lang)}
                  className={`
                    w-full flex items-center gap-2.5 px-3.5 py-2.5
                    text-xs font-medium tracking-wide text-left
                    border-b border-white/5 last:border-0
                    transition-all duration-150
                    ${
                      isActive
                        ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "text-[#9B978D] hover:bg-[#C9A84C]/8 hover:text-[#C9A84C]"
                    }
                  `}
                >
                  <span className="text-sm">{lang.flag}</span>
                  {lang.label}
                  {isActive && (
                    <span className="ml-auto text-[#C9A84C] text-xs">✓</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
