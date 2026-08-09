import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mizton Shop - Inicio",
  description: "Tienda Mizton Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <body
        className={`${inter.variable} font-body-md bg-background text-on-background min-h-screen flex flex-col pb-20 md:pb-0`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
