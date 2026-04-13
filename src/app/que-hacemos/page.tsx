"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- ICONOS REFORZADOS ---

const LogisticaIcon = () => (
  <div className="relative w-full h-56 flex items-center justify-center bg-blue-50/30 rounded-[3rem] overflow-hidden border border-blue-200/20">
    <motion.svg 
      viewBox="0 0 100 100" className="w-24 h-24 text-blue-600 absolute"
      animate={{ x: [-120, 120], y: [0, -1, 0] }}
      transition={{ x: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
    >
      <path fill="currentColor" d="M15,65 L85,65 L78,85 L22,85 Z M35,65 L35,45 L48,45 L48,65 M52,65 L52,55 L62,55 L62,65" />
    </motion.svg>
    <motion.svg 
      viewBox="0 0 100 100" className="w-24 h-24 text-blue-500 absolute mt-24"
      animate={{ x: [-130, 130] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <rect x="5" y="45" width="50" height="20" fill="currentColor" rx="1" />
      <path fill="currentColor" d="M56,65 L78,65 L78,52 L70,52 L60,45 L56,45 Z" />
      <rect x="62" y="48" width="8" height="6" fill="white" opacity="0.5" rx="1" />
      <circle fill="currentColor" cx="15" cy="68" r="4" />
      <circle fill="currentColor" cx="45" cy="68" r="4" />
      <circle fill="currentColor" cx="68" cy="68" r="4" />
    </motion.svg>
  </div>
);

const AdministracionIcon = () => (
  <div className="w-full h-56 flex items-center justify-center bg-blue-50/30 rounded-[3rem] border border-blue-200/20">
    <motion.svg 
      viewBox="0 0 100 100" className="w-28 h-28 text-blue-600"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <path fill="currentColor" d="M50,20 A30,30 0 1,0 50,80 A30,30 0 1,0 50,20 M50,0 L58,15 L72,12 L75,25 L88,28 L84,40 L96,48 L88,58 L96,70 L82,75 L80,88 L65,85 L58,96 L48,85 L32,92 L30,78 L15,80 L20,65 L5,58 L15,48 L10,35 L25,32 L28,18 L42,20 Z" />
      <circle fill="white" cx="50" cy="50" r="10" />
    </motion.svg>
  </div>
);

const FinanzasIcon = () => (
  <div className="w-full h-56 flex items-center justify-center bg-blue-50/30 rounded-[3rem] p-10 border border-blue-200/20">
    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
      <motion.rect x="10" y="60" width="12" height="30" fill="currentColor" opacity="0.3" animate={{ height: [30, 50, 30] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.rect x="35" y="40" width="12" height="50" fill="currentColor" opacity="0.6" animate={{ height: [50, 70, 50] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="60" y="20" width="12" height="70" fill="currentColor" animate={{ height: [70, 90, 70] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
      <motion.path d="M10,80 L40,50 L70,20 L90,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  </div>
);

const ComercialIcon = () => (
  <div className="w-full h-56 flex items-center justify-center bg-blue-50/30 rounded-[3rem] p-12 border border-blue-200/20">
    <motion.svg viewBox="0 0 100 100" className="w-full h-full text-blue-600" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity }}>
      <path fill="none" stroke="currentColor" strokeWidth="3" d="M10,5 L90,5 L65,95 L35,95 Z" />
      <motion.line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="4" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    </motion.svg>
  </div>
);

export default function QueHacemos() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState("");
  const fullTitle = "Para cada necesidad, una solución concreta";

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) clearInterval(typingInterval);
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  const sectores = [
    { title: "Logística", icon: <LogisticaIcon />, items: ["Eficiencia de rutas", "Control de combustible", "Análisis de flota", "Tiempos de entrega"] },
    { title: "Administración", icon: <AdministracionIcon />, items: ["Gestión de procesos", "Digitalización de archivos", "Control de activos", "Eficiencia de tareas"] },
    { title: "Finanzas", icon: <FinanzasIcon />, items: ["Control presupuestario", "Análisis de desvíos", "Cashflow proyectado", "Rentabilidad por unidad"] },
    { title: "Comercial", icon: <ComercialIcon />, items: ["Funnel de ventas", "Performance de asesores", "Objetivos vs Real", "Análisis de mercado"] },
  ];

  return (
    <main className="min-h-screen font-sans selection:bg-blue-100 relative bg-white">
      
      {/* IMAGEN DE FONDO FIJA CON PARALLAX */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none"
      >
        <Image 
          src="/hero-2.jpg" 
          alt="Background" 
          fill 
          className="object-cover"
          priority
        />
      </motion.div>

      {/* NAVBAR */}
      <nav className="p-6 md:px-16 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-lg z-[100]">
        <Image src="/logo ich (1).svg" alt="ICH" width={70} height={35} className="cursor-pointer" onClick={() => router.push('/')} />
        
        <div className="hidden md:flex gap-10 items-center text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
          <button onClick={() => router.push('/')} className="hover:text-blue-600 transition-colors uppercase cursor-pointer">Inicio</button>
          <a href="https://ich-demos-hub.webflow.io/" target="_blank" className="hover:text-blue-600 transition-colors text-blue-500 font-bold">Hub de Demos</a>
        </div>

        <button onClick={() => router.push('/agendar')} className="bg-blue-600 text-white text-[10px] px-7 py-2.5 rounded-full font-bold tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-500/20">
          AGENDAR CITA
        </button>
      </nav>

      {/* SECCIÓN MANIFIESTO (Transparencia parcial) */}
      <section className="py-20 px-6 md:px-16 bg-slate-900/95 text-white flex justify-center relative z-10">
        <div className="max-w-4xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg md:text-xl font-light leading-relaxed tracking-wide text-slate-300 italic">
            "Nos encargamos de que puedas sacarle el máximo provecho a tu información. <span className="text-blue-400 font-normal">Ordenamos tus bases de datos, generamos respaldos seguros y encontramos relaciones entre variables que permitan llegar a decisiones asertivas para cada arista de tu negocio.
</span> Actuamos justo ahí donde tu ERP falla. En ICH, cada desarrollo es a medida, es orientado por nuestro cliente y por eso responde específicamente a tus necesidades. No trabajamos con módulos estandarizados. Vos guías nuestro trabajo."
          </motion.p>
          <div className="h-[1px] w-12 bg-blue-600/50 mx-auto mt-6"></div>
        </div>
      </section>

      {/* SECCIÓN MÓDULOS (Fondo transparente para ver el parallax) */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative z-10 bg-transparent">
        <div className="mb-20 text-center min-h-[3em] flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-gray-900">
            {displayText}
            <span className="text-blue-600 animate-pulse ml-1">|</span>
          </h2>
          <div className="h-1 w-16 bg-blue-600 mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sectores.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-2 border border-white/50 rounded-[3.5rem] bg-white/60 backdrop-blur-md shadow-xl shadow-blue-900/5 transition-all duration-500 hover:bg-white/80"
            >
              <div className="p-4">{s.icon}</div>
              <div className="p-10 pt-4">
                <h3 className="text-3xl font-bold mb-6 italic tracking-tighter text-gray-800">{s.title}</h3>
                <ul className="space-y-3">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-base border-b border-gray-200/30 pb-2 last:border-0 font-medium">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-4 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-16 bg-slate-900 text-center border-t border-slate-800 relative z-10">
        <Image src="/logo ich (1).svg" alt="ICH" width={50} height={25} className="mx-auto grayscale invert opacity-20 mb-6" />
        <p className="text-slate-600 text-[8px] tracking-[0.5em] uppercase font-bold">ICH • Estrategia & Datos • 2026</p>
      </footer>
    </main>
  );
}