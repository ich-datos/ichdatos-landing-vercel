import "./globals.css";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";

// Fuente Inter (o podés usar Arimo si querés)
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Tu PYME, conectada.",
  description: "Powered by ICH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={arimo.className}>
      <body>{children}</body>
    </html>
  );
}
