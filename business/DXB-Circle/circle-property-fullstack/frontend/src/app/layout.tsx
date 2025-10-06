import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import HeaderProfessional from "@/components/HeaderProfessional";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.beechfordestates.com'),
  title: {
    default: "Beechford Estate Office - Dubai Property Investment",
    template: "%s | Beechford Estate Office"
  },
  description: "Discreet property services with institutional-grade analytics. Evidence-driven decisions, integrated execution, and ongoing portfolio management for discerning families.",
  keywords: [
    "dubai property investment", 
    "dubai estate office", 
    "dubai rental yield", 
    "dubai buy-to-let", 
    "dubai off-plan analysis", 
    "dubai real estate advisory", 
    "private property office dubai",
    "dubai property portfolio management",
    "dubai real estate optimization",
    "institutional property analysis dubai"
  ],
  authors: [{ name: "Beechford Estate Office" }],
  creator: "Beechford Estate Office",
  publisher: "Beechford Estate Office",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Beechford Estate Office - Dubai Property Investment",
    description: "Discreet property services with institutional-grade analytics. Evidence-driven decisions, integrated execution, and ongoing portfolio management.",
    url: 'https://www.beechfordestates.com',
    siteName: 'Beechford Estate Office',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beechford Estate Office - Dubai Property Investment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beechford Estate Office - Dubai Property Investment',
    description: 'Discreet property services with institutional-grade analytics for discerning families.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/vite.svg',
    shortcut: '/vite.svg',
    apple: '/vite.svg',
  },
  verification: {
    // Add these when you register with search engines
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
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
