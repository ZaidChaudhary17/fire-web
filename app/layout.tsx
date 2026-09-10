import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MBMC Fire Emergency Response & Management System | Mira-Bhayandar EOC",
  description: "Enterprise Municipal Emergency Operations Center (EOC) and Computer-Aided Dispatch (CAD) System for Mira-Bhayandar Municipal Corporation (MBMC) Fire & Emergency Services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sansFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-[#090a0d] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
