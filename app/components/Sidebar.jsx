import Link from "next/link";
import { getDictionary } from "../[lang]/dictionaries";

const NAV_ITEMS = [
  { key: "trending", icon: "↑", filter: "trending" },
  { key: "newReleases", icon: "★", filter: "new-releases" },
  { key: "comingSoon", icon: "◷", filter: "coming-soon" },
  { key: "topRated", icon: "♛", filter: "top-rated" },
  { key: "popular", icon: "♟", filter: "popular" },
];

const Sidebar = async ({ lang, searchParams }) => {
  const dictionary = await getDictionary(lang);
  const activeFilter = searchParams?.filter ?? "trending";

  return (
    <aside className="pt-2 pr-4">
      <nav>
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ key, icon, filter }) => {
            const isActive = activeFilter === filter;
            return (
              <li key={key}>
                <Link
                  href={`/${lang}?filter=${filter}`}
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
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
