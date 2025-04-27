import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco-Invest",
  description: "Analyze companies based on their environmental impact and growth potential",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-[#0d2b1e] via-[#123d15] to-[#1b5e20] text-white`}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-20" />
        {children}
      </body>
    </html>
  );
}
