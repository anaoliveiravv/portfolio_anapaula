import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Ana Paula de Oliveira — Software Engineer",
  description:
    "Portfólio de Ana Paula de Oliveira, estudante de Engenharia de Software e desenvolvedora back-end com interesse em inteligência artificial.",
  openGraph: {
    title: "Ana Paula de Oliveira — Software Engineer",
    description: "Um pequeno universo entre software, dados e inteligência artificial.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
