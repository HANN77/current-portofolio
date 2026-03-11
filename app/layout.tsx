import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer & Designer",
  description:
    "A modern portfolio showcasing creative development and design work. Built with Next.js, GSAP, Motion, and Three.js.",
  keywords: ["portfolio", "developer", "designer", "creative", "web development"],
  openGraph: {
    title: "Portfolio | Creative Developer & Designer",
    description: "Crafting Digital Experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
