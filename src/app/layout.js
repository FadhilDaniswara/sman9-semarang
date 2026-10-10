import { Dela_Gothic_One, Plus_Jakarta_Sans, Gaegu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"], variable: "--font-dela", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const gaegu = Gaegu({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-gaegu", display: "swap" });

export const metadata = {
  title: "SMA Negeri 9 Semarang",
  description: "Website profil SMA Negeri 9 Semarang (proyek tugas UTS).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${dela.variable} ${jakarta.variable} ${gaegu.variable}`}>
      <body className="font-sans antialiased">
        <a href="#utama" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-lime focus:p-3">Lewati ke konten</a>
        <Navbar />
        <main id="utama">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
