import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const geist = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "SIAPP — Sistem Informasi Departemen Politik Pemerintahan",
  description: "Academic Intelligence Operating System for DPP UGM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={geist.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
