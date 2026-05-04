import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Cine Rental",
  description: "Discover and stream the latest movies.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased bg-[#0A0A0B] text-[#F0EDE6] min-h-screen">
        <Provider>
          {children}
          <div id="modal-root-content" />
        </Provider>
      </body>
    </html>
  );
}
