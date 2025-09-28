import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Fuente Inter (o podés usar Arimo si querés)
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "800"],
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
