import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({ src: [
  { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
  { path: "./fonts/Poppins-Medium.ttf", weight: "500" },
  { path: "./fonts/Poppins-SemiBold.ttf", weight: "600" },
  { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
], variable: "--font-poppins" });
const bagelFatOne = localFont({ src: "./fonts/BagelFatOne-Regular.woff2", weight: "400", variable: "--font-bagel-fat-one" });

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
    <html lang="pt-BR" className={`${poppins.variable} ${bagelFatOne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
