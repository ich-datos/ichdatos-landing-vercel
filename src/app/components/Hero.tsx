"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// --- RED NEURONAL REFORZADA ---
const NeuralNetwork = () => {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    const initialNodes = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
      size: Math.random() * 4 + 3,
    }));
    setNodes(initialNodes);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] md:h-[400px]" />;

  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-slate-50/80 rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-gray-200 shadow-inner">
      <svg viewBox="0 0 100 100" className="w-full h-full p-6 md:p-12">
        {nodes.map((node, i) => (
          nodes.slice(i + 1, i + 3).map((target, j) => (
            <motion.line
              key={`line-${i}-${j}`}
              x1={node.x} y1={node.y} x2={target.x} y2={target.y}
              stroke="#0047FF"
              strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            r={node.size / 10}
            fill="#0047FF"
            animate={{ 
              cx: [node.x, node.targetX, node.x], 
              cy: [node.y, node.targetY, node.y],
              opacity: [0.2, 1, 0.2] 
            }}
            transition={{ duration: Math.random() * 8 + 7, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
};

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const router = useRouter();

  const phraseBase = "Transformá tus ";
  const phraseHighlight = "DATOS";
  const fullText = phraseBase + phraseHighlight;
  const sliderImages = ["/hero-2.jpg", "/hero-3.jpg", "/hero-4.jpg", "/hero-5.jpg"];
  const clientLogos = [1, 2, 3, 4, 5];

  // --- BLOQUEO DE SEGURIDAD (ANTICOPIA) ---
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "i" || e.key === "j" || e.key === "c")) || // Mac
        (e.ctrlKey && e.key === "u") ||
        (e.metaKey && e.key === "u") // Mac
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(typingInterval);
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [loading]);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2000);
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => {
      clearTimeout(loadTimer);
      clearInterval(imageInterval);
    };
  }, [sliderImages.length]);

  const renderTypedText = () => {
    if (displayText.startsWith(phraseBase)) {
      const rest = displayText.slice(phraseBase.length);
      return <>{phraseBase}<span className="text-blue-600 font-bold">{rest}</span></>;
    }
    return displayText;
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
          <Image src="/logo ich (1).svg" alt="ICH" width={80} height={80} className="animate-pulse" />
          <div className="w-12 h-[1px] bg-blue-600 mt-4 animate-scale-x"></div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-16 py-3 md:py-4 flex flex-wrap justify-between items-center gap-y-3">
        <Image src="/logo ich (1).svg" alt="ICH Logo" width={85} height={42} className="cursor-pointer" onClick={() => router.push('/')} />
        
        <div className="flex gap-4 md:gap-10 items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/que-hacemos')} className="hover:text-blue-600 transition-colors uppercase">¿QUÉ HACEMOS?</button>
          <a href="#quienes-somos" className="hover:text-blue-600 transition-colors uppercase hidden sm:block">¿QUIÉNES SOMOS?</a>
          <a href="#productos" className="hover:text-blue-600 transition-colors uppercase hidden sm:block">PRODUCTOS</a>
          <a href="https://ich-demos-hub.webflow.io/" target="_blank" className="text-blue-500 hover:text-black transition-colors uppercase">HUB DE DEMOS</a>
        </div>

        <button onClick={() => router.push('/agendar')} className="bg-blue-600 text-white text-[8px] md:text-[10px] px-4 md:px-7 py-2 md:py-2.5 rounded-full font-bold tracking-widest hover:bg-black transition-all shadow-lg order-2 md:order-3 uppercase">
          AGENDAR CITA
        </button>
      </nav>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-center px-4">
          {sliderImages.map((src, index) => (
            <div key={src} className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${index === currentImage ? "opacity-100" : "opacity-0"}`}>
              <Image src={src} alt="Slide" fill className="object-cover" priority={index === 0} />
            </div>
          ))}
          <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[1px]"></div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-white">
            <h1 className="text-4xl md:text-8xl font-light tracking-tighter mb-4 uppercase cursor-blink min-h-[1.2em]">
              {renderTypedText()}
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto opacity-90 px-4">
              Soluciones inteligentes para la gestión de información estratégica.
            </p>
          </motion.div>
        </section>

        {/* CONFIAN EN NOSOTROS */}
        <section className="py-12 bg-white overflow-hidden border-b border-gray-50">
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold italic text-gray-400 uppercase tracking-[0.2em]">
              Confían en nosotros
            </h2>
          </div>

          <div className="relative flex overflow-x-hidden group">
            <motion.div 
              className="flex whitespace-nowrap items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...clientLogos, ...clientLogos].map((num, index) => (
                <div key={index} className="mx-10 md:mx-20 flex items-center justify-center w-28 md:w-40 h-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-in-out transform hover:scale-110">
                  <img src={`/cliente-${num}.jpg`} alt={`Cliente ${num}`} className="max-w-full max-h-full object-contain pointer-events-none select-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VISUALIZACIÓN */}
        <section className="py-16 md:py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold italic text-gray-900 leading-tight">Visualización en Tiempo Real</h3>
              <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                Nuestras herramientas permiten observar cómo evolucionan sus métricas críticas mientras los datos fluyen por la arquitectura de ICH.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8 bg-gray-50 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-200 shadow-xl">
              <div className="flex flex-col justify-end h-32 md:h-40 space-y-3">
                {[60, 100, 80].map((h, i) => (
                  <div key={i} className="w-full bg-gray-200 rounded-full h-3 md:h-4">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${h}%` }} transition={{ duration: 1.5, delay: i * 0.2 }} className="bg-blue-600 h-full" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                <svg className="w-24 h-24 md:w-32 md:h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
                  <motion.circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="314" initial={{ strokeDashoffset: 314 }} whileInView={{ strokeDashoffset: 314 - (314 * 0.90) }} transition={{ duration: 2 }} className="text-blue-600" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* QUIÉNES SOMOS */}
        <section id="quienes-somos" className="py-16 md:py-24 bg-gray-50 px-6 md:px-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 text-center md:text-left order-2 md:order-1">
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tighter">Gestión integral de <br className="hidden md:block" /><span className="italic font-light text-gray-400 font-serif lowercase">datos.</span></h3>
              <p className="text-gray-500 text-lg leading-relaxed italic">
                Nuestra misión se centra en actuar como facilitadores de herramientas que le permitan a nuestros clientes contar con la mejor calidad de información para decidir con fundamentos el futuro de su negocio.
              </p>
              <div className="h-[2px] w-24 bg-blue-600 mx-auto md:mx-0"></div>
            </div>
            <div className="order-1 md:order-2">
              <NeuralNetwork />
            </div>
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="py-16 md:py-24 bg-white px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold italic mb-3 text-gray-900 uppercase">Productos destacados</h2>
            <p className="text-gray-400 font-light tracking-widest uppercase text-xs mb-10 md:mb-16">Arquitectura y Estrategia</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "Arquitectura de Datos", d: "Procesos ETL y estructuración eficiente para bases madre robustas." },
                { t: "Gestión de OKRs & KPIs", d: "Identificación de métricas alineadas 100% a sus objetivos estratégicos." },
                { t: "Herramientas a Medida", d: "Dashboards dinámicos y visualización automatizada en tiempo real." }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-8 md:p-10 hover:bg-blue-600 group transition-all duration-700 border border-gray-100 rounded-[2rem] md:rounded-[2.5rem]">
                  <span className="text-blue-600 group-hover:text-white font-mono text-sm block mb-5">0{i+1}.</span>
                  <h4 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white">{item.t}</h4>
                  <p className="text-gray-500 group-hover:text-blue-100 leading-relaxed text-sm md:text-base">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <section className="py-16 md:py-24 bg-gray-50 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {[
              { n: "Relevamiento", c: "Identificación de procesos clave." },
              { n: "Diagnóstico", c: "Detección de oportunidades." },
              { n: "Objetivos", c: "Plan estructurado de negocio." },
              { n: "Capacitación", c: "Garantía de autonomía total." }
            ].map((step, i) => (
              <div key={i} className="space-y-2">
                <div className="text-blue-600 font-bold text-lg italic">/0{i+1}</div>
                <h5 className="font-bold text-xs md:text-lg uppercase text-gray-900 tracking-tighter">{step.n}</h5>
                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed px-2">{step.c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 bg-slate-900 text-center flex flex-col items-center border-t border-slate-800">
          <div className="grayscale invert opacity-50 mb-6">
            <Image src="/logo ich (1).svg" alt="ICH" width={70} height={35} className="mx-auto" />
          </div>
          <div className="space-y-3 px-6">
            <a href="mailto:info@ichdatos.com.ar" className="text-[9px] md:text-xs tracking-[0.5em] text-slate-400 hover:text-blue-400 transition-colors uppercase font-bold block">
              info@ichdatos.com.ar
            </a>
            <div className="h-[1px] w-12 bg-slate-700 mx-auto"></div>
            <p className="text-[9px] text-slate-500 tracking-[0.3em] uppercase font-light italic">
              Córdoba, Argentina • © 2026 ICH
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}