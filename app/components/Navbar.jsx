import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/public/logo.svg";

// mobileTrigger is the <MobileSidebar> hamburger button passed from the page.
// Keeping it as a prop avoids making Navbar itself a client component.
const Navbar = ({ mobileTrigger }) => {
  return (
    <header className="sticky top-0 z-50">
      <nav
        className="
          flex items-center justify-between
          px-5 h-16
          bg-[#0A0A0B]/90 backdrop-blur-xl
          border-b border-[#C9A84C]/18
        "
      >
        {/* Left: hamburger (mobile) + logo */}
        <div className="flex items-center gap-3">
          {mobileTrigger}
          <Link
            href="/"
            className="font-playfair text-xl font-bold tracking-widest text-[#C9A84C] hover:opacity-80 transition-opacity"
          >
            <Image src={logo} width="139" height="26" alt="" />
          </Link>
        </div>

        {/* Right: actions */}
        <ul className="flex items-center gap-2">
          {/* Notifications */}
          <li>
            <a
              href="#"
              className="
                relative w-9 h-9 flex items-center justify-center
                rounded-lg border border-[#C9A84C]/18 bg-[#18181C]
                text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]
                hover:bg-[#C9A84C]/10 transition-all duration-200
              "
            >
              <Image
                src="/ring.svg"
                width={18}
                height={18}
                alt="Notifications"
              />
              <span
                className="
                  absolute -top-1 -right-1
                  w-3.5 h-3.5 rounded-full
                  bg-[#C0392B] border border-[#0A0A0B]
                  text-[8px] font-semibold text-white
                  flex items-center justify-center
                "
              >
                3
              </span>
            </a>
          </li>

          <li aria-hidden className="w-px h-5 bg-white/6 mx-1" />
          <li>
            <ThemeSwitcher />
          </li>
          <li aria-hidden className="w-px h-5 bg-white/6 mx-1" />

          {/* Cart */}
          <li>
            <a
              href="#"
              className="
                w-9 h-9 flex items-center justify-center
                rounded-lg border border-[#C9A84C]/18 bg-[#18181C]
                text-[#9B978D] hover:text-[#C9A84C] hover:border-[#C9A84C]
                hover:bg-[#C9A84C]/10 transition-all duration-200
              "
            >
              <Image
                src="/shopping-cart.svg"
                width={18}
                height={18}
                alt="Cart"
              />
            </a>
          </li>

          <li aria-hidden className="w-px h-5 bg-white/6 mx-1" />
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
