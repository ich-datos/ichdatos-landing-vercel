"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- ICONOS REALISTAS ---
const LogisticaIcon = () => (
  <div className="relative w-full h-48 md:h-56 flex items-center justify-center bg-blue-100/20 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-blue-200/30">
    <motion.svg 
      viewBox="0 0 100 100" className="w-20 md:w-24 h-20 md:h-24 text-blue-600 absolute"
      animate={{ x: [-120, 120] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <path fill="currentColor" d="M15,65 L85,65 L78,85 L22,85 Z M35,65 L35,45 L48,45 L48,65" />
    </motion.svg>
    <motion.svg 
      viewBox="0 0 100 100" className="w-20 md:w-24 h-20 md:h-24 text-blue-500 absolute mt-20 md:mt-24"
      animate={{ x: [-130, 130] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <rect x="5" y="45" width="50" height="20" fill="currentColor" rx="1" />
      <path fill="currentColor" d="M56,65 L78,65 L78,52 L70,52 L60,45 L56,45 Z" />
      <circle fill="currentColor" cx="15" cy="68" r="4" /><circle fill="currentColor" cx="45" cy="68" r="4" />
    </motion.svg>
  </div>
);

const AdministracionIcon = () => (
  <div className="w-full h-48 md:h-56 flex items-center justify-center bg-blue-100/20 rounded-[2rem] md:rounded-[3rem] border border-blue-200/30">
    <motion.svg viewBox="0 0 100 100" className="w-24 md:w-28 h-24 md:h-28 text-blue-600" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
      <path fill="currentColor" d="M50,20 A30,30 0 1,0 50,80 A30,30 0 1,0 50,20 M50,0 L58,15 L72,12 L75,25 L88,28 L84,40 L96,48 L88,58 L96,70 L82,75 L80,88 L65,85 L58,96 L48,85 L32,92 L30,78 L15,80 L20,65 L5,58 L15,48 L10,35 L25,32 L28,18 L42,20 Z" />
      <circle fill="white" cx="50" cy="50" r="10" />
    </motion.svg>
  </div>
);

const FinanzasIcon = () => (
  <div className="w-full h-48 md:h-56 flex items-center justify-center bg-blue-100/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border border-blue-200/30">
    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
      <motion.rect x="10" y="60" width="12" height="30" fill="currentColor" opacity="0.3" animate={{ height: [30, 50, 30] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.rect x="35" y="40" width="12" height="50" fill="currentColor" opacity="0.6" animate={{ height: [50, 70, 50] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="60" y="20" width="12" height="70" fill="currentColor" animate={{ height: [70, 90, 70] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
      <motion.path d="M10,80 L40,50 L70,20 L90,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  </div>
);

const ComercialIcon = () => (
  <div className="w-full h-48 md:h-56 flex items-center justify-center bg-blue-100/20 rounded-[2rem] md:rounded-[3rem] p-10 md:p-12 border border-blue-200/30">
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
    { 
      title: "Logística", 
      icon: <LogisticaIcon />, 
      items: ["Seguimiento de costos de transporte", "Forecast de compras", "Confección de surtido", "Clusterizacion de productos"] 
    },
    { 
      title: "Administración", 
      icon: <AdministracionIcon />, 
      items: ["Control de cuentas", "Worflow de documentación automatizado", "Automatización de reportes mensuales", "Control de gastos fijos y variables"] 
    },
    { 
      title: "Finanzas", 
      icon: <FinanzasIcon />, 
      items: ["Flujo de caja proyectado (Cashflow)", "Análisis de rentabilidad por unidad de negocio", "Seguimiento de inversiones y financiamiento", "Control de desvíos presupuestarios"] 
    },
    { 
      title: "Comercial", 
      icon: <ComercialIcon />, 
      items: ["Embudo de ventas en tiempo real", "Scorecard por proveedor", "Analisis de performance", "Seguimiento de objetivos comerciales"] 
    },
  ];

  return (
    <main className="min-h-screen relative bg-white overflow-x-hidden selection:bg-blue-100">
      <motion.div style={{ y: yBg }} className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none">
        <Image src="/hero-2.jpg" alt="Background" fill className="object-cover" priority />
      </motion.div>

      <nav className="p-4 md:px-16 flex flex-wrap justify-between items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-lg z-[100] gap-y-3">
        <Image 
          src="/logo ich (1).svg" 
          alt="ICH" 
          width={85} 
          height={42} 
          className="cursor-pointer" 
          onClick={() => router.push('/')} 
        />
        <div className="flex gap-4 md:gap-10 text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/')}>INICIO</button>
          <a href="https://ich-demos-hub.webflow.io/" target="_blank" className="text-blue-500">HUB DE DEMOS</a>
        </div>
        <button onClick={() => router.push('/agendar')} className="bg-blue-600 text-white text-[8px] md:text-[10px] px-5 py-2 rounded-full font-bold order-2 md:order-3 tracking-widest uppercase">AGENDAR</button>
      </nav>

      <section className="py-20 px-6 md:px-16 bg-slate-900/95 text-white flex justify-center relative z-10">
        <div className="max-w-4xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm md:text-lg font-light leading-relaxed tracking-wide text-slate-300 italic px-2">
            "Nos encargamos de que puedas sacarle el máximo provecho a tu información. <span className="text-blue-400 font-normal underline decoration-blue-600/30">Ordenamos tus bases de datos, generamos respaldos seguros y encontramos relaciones entre variables</span> que permitan llegar a decisiones asertivas para cada arista de tu negocio. Actuamos justo ahí donde tu ERP falla. En ICH, cada desarrollo es a medida, es orientado por nuestro cliente y por eso responde específicamente a tus necesidades."
          </motion.p>
          <div className="h-[1px] w-12 bg-blue-600/50 mx-auto mt-6"></div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-16 max-w-7xl mx-auto relative z-10 bg-transparent">
        <div className="mb-12 text-center min-h-[3em] flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-4xl font-bold tracking-tight uppercase text-gray-900 px-2 cursor-blink">
            {displayText}
          </h2>
          <div className="h-1 w-16 bg-blue-600 mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {sectores.map((s, i) => (
            <div key={i} className="p-2 border border-white/50 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/70 backdrop-blur-md shadow-xl hover:bg-white/90 transition-all duration-500">
              <div className="p-3 md:p-4">{s.icon}</div>
              <div className="p-6 md:p-10 pt-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 italic tracking-tighter text-gray-800">{s.title}</h3>
                <ul className="space-y-3">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm md:text-base border-b border-gray-200/30 pb-2 last:border-0 font-medium">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-16 bg-slate-900 text-center border-t border-slate-800 relative z-10">
        <Image src="/logo ich (1).svg" alt="ICH" width={50} height={25} className="mx-auto grayscale invert opacity-20 mb-6" />
        <p className="text-slate-600 text-[8px] tracking-[0.5em] uppercase font-bold tracking-widest">ICH • Estrategia & Datos • 2026</p>
      </footer>
    </main>
  );
}