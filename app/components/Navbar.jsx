import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Navbar Component
 * @param {ReactNode} mobileTrigger - The button that opens the mobile drawer
 */
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
        {/* --- LEFT SIDE: Logo --- */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-playfair text-xl font-bold tracking-widest text-[#C9A84C] hover:opacity-80 transition-opacity"
          >
            <Image
              src={logo}
              width={139}
              height={26}
              alt="MovieCinema Logo"
              priority
            />
          </Link>
        </div>

        {/* --- RIGHT SIDE: Desktop Actions + Mobile Hamburger --- */}
        <div className="flex items-center gap-2">
          {/* Desktop-Only Items (hidden below lg breakpoint) */}
          <ul className="hidden lg:flex items-center gap-2">
            <li aria-hidden className="w-px h-5 bg-white/6 mx-1" />

            {/* Language Selection */}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          {/* --- MOBILE TRIGGER (Hamburger) --- */}
          {/* This sits on the far right on mobile/tablet and hides on desktop */}
          <div className="lg:hidden flex items-center">{mobileTrigger}</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
