import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Cambiá el nombre de 'nunito' a 'inter' (ya que es la fuente Inter)
const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '800'], // podés sumar '400', '700' si querés más pesos
  });

export const metadata: Metadata = {
  title: "Tu PYME, conectada.",
  description: "Powered by ICH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}