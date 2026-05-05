import Image from "next/image";
import logo from "/public/logo.svg";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        mt-12 border-t border-white/6
        bg-[#111114]
      "
    >
      <div
        className="
          container mx-auto px-6 py-5
          flex flex-col sm:flex-row items-center justify-between gap-4
        "
      >
        {/* Logo wordmark */}
        <Image src={logo} width="139" height="26" alt="" />

        {/* Copyright */}
        <p className="text-[11px] tracking-wider text-[#5A574F] uppercase">
          &copy; {currentYear} &middot; All rights reserved
        </p>

        {/* Links */}
        <nav className="flex items-center gap-5">
          {["Privacy", "Terms", "Contact"].map((label) => (
            <a
              key={label}
              href="#"
              className="
                text-[11px] tracking-wider uppercase
                text-[#5A574F] hover:text-[#C9A84C]
                transition-colors duration-200
              "
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
