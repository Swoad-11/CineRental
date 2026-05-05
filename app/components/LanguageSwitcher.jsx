"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "EN" },
  { code: "bn", label: "বাং" },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const found = languages.find((l) => pathname.includes(l.code));
  const [selected, setSelected] = useState(found?.code ?? "en");

  const handleSelect = (code) => {
    setSelected(code);
    router.push(`/${code}` + pathname.slice(3));
  };

  return (
    <div
      className="
        flex items-center
        h-9 p-0.5 gap-0.5
        rounded-lg border border-[#C9A84C]/18 bg-[#18181C]
      "
    >
      {languages.map(({ code, label }) => {
        const isActive = selected === code;
        return (
          <button
            key={code}
            onClick={() => handleSelect(code)}
            className={`
              h-full px-3 rounded-md text-xs font-medium tracking-wide
              transition-all duration-200
              ${
                isActive
                  ? "bg-[#C9A84C] text-[#0A0A0B]"
                  : "text-[#9B978D] hover:text-[#F0EDE6]"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
