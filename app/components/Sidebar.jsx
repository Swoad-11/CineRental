import { getDictionary } from "../[lang]/dictionaries";

const NAV_ITEMS = [
  { key: "trending", icon: "↑", href: "#" },
  { key: "newReleases", icon: "★", href: "#" },
  { key: "comingSoon", icon: "◷", href: "#" },
  { key: "favorites", icon: "♡", href: "#" },
  { key: "watchLater", icon: "⊕", href: "#" },
];

const Sidebar = async ({ lang, activeKey = "trending" }) => {
  const dictionary = await getDictionary(lang);

  return (
    <aside className="pt-2 pr-4">
      <nav>
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ key, icon, href }) => {
            const isActive = key === activeKey;
            return (
              <li key={key}>
                <a
                  href={href}
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
                  <span>{dictionary[key]}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
