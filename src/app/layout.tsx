import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderProfessional from "@/components/HeaderProfessional";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Circle Property - Dubai Property Investment",
  description: "Evidence-driven Dubai property decisions with transparent economics, one-window execution, and ongoing performance management.",
  keywords: ["dubai property investment", "dubai rental yield", "dubai buy-to-let", "dubai off-plan analysis", "dubai real estate comps", "STR dubai yields"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <HeaderProfessional />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
