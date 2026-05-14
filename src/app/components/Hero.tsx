"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- RED NEURONAL ---
const NeuralNetwork = () => {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const initialNodes = Array.from({ length: isMobile ? 12 : 25 }, (_, i) => ({
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

  if (!mounted) return <div className="h-[250px] md:h-[400px]" />;

  return (
    <div className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center bg-slate-50/80 rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-gray-200 shadow-inner">
      <svg viewBox="0 0 100 100" className="w-full h-full p-4 md:p-12">
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
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  // TEXTOS ORIGINALES RESTAURADOS
  const phraseBase = "Transformá tus ";
  const phraseHighlight = "DATOS";
  const fullText = phraseBase + phraseHighlight;
  const sliderImages = ["/hero-2.jpg", "/hero-3.jpg", "/hero-4.jpg", "/hero-5.jpg"];
  const clientLogos = [1, 2, 3, 4, 5];

  // Efecto visual al scrollear
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  useEffect(() => {
    // Bloqueo de seguridad anti-copia
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || (e.ctrlKey && e.key === "u")) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Timers
    const loadTimer = setTimeout(() => setLoading(false), 2000);
    const popupTimer = setTimeout(() => setShowPopup(true), 4000); // Popup Endeavor a los 4s
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(loadTimer);
      clearTimeout(popupTimer);
      clearInterval(imageInterval);
    };
  }, [sliderImages.length]);

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

  const renderTypedText = () => {
    if (displayText.startsWith(phraseBase)) {
      const rest = displayText.slice(phraseBase.length);
      return <>{phraseBase}<span className="text-blue-600 font-bold">{rest}</span></>;
    }
    return displayText;
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      {/* 1. PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
            <Image src="/logo ich (1).svg" alt="ICH" width={80} height={80} className="animate-pulse" />
            <div className="w-12 h-[1px] bg-blue-600 mt-4 animate-scale-x"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NAVBAR (Sin Hub de Demos) */}
      <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-16 py-3 md:py-4 flex flex-wrap justify-between items-center gap-y-3">
        <Image src="/logo ich (1).svg" alt="ICH Logo" width={85} height={42} className="cursor-pointer" onClick={() => router.push('/')} />
        
        <div className="flex gap-4 md:gap-10 items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/que-hacemos')} className="hover:text-blue-600 transition-colors uppercase">¿QUÉ HACEMOS?</button>
          <a href="#quienes-somos" className="hover:text-blue-600 transition-colors uppercase hidden sm:block">¿QUIÉNES SOMOS?</a>
          <button onClick={() => router.push('/ichtorias')} className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold">
            ICHTORIAS DE DATOS
          </button>
        </div>

        <button onClick={() => router.push('/agendar')} className="bg-blue-600 text-white text-[8px] md:text-[10px] px-4 md:px-7 py-2 md:py-2.5 rounded-full font-bold tracking-widest hover:bg-black transition-all shadow-lg order-2 md:order-3 uppercase">
          AGENDAR CITA
        </button>
      </nav>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* 3. HERO BANNER (TEXTO ORIGINAL) */}
        <section className="relative h-[100svh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black text-center px-4">
          {sliderImages.map((src, index) => (
            <div key={src} className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${index === currentImage ? "opacity-100" : "opacity-0"}`}>
              <Image src={src} alt="Slide" fill className="object-cover scale-105" priority={index === 0} />
            </div>
          ))}
          <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[1px]"></div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-white w-full">
            <h1 className="text-4xl md:text-8xl font-light tracking-tighter mb-4 uppercase min-h-[2.4em] md:min-h-[1.2em]">
              {renderTypedText()}
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto opacity-90 px-4">
              Soluciones inteligentes para la gestión de información estratégica.
            </p>
          </motion.div>
        </section>

        {/* 4. CARRUSEL CLIENTES */}
        <section className="py-12 bg-white overflow-hidden border-b border-gray-50">
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Confían en nosotros
          </div>
          <div className="relative flex overflow-x-hidden">
            <motion.div className="flex whitespace-nowrap items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
              {[...clientLogos, ...clientLogos].map((num, index) => (
                <div key={index} className="mx-10 md:mx-20 flex items-center justify-center w-28 md:w-40 h-20 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                  <img src={`/cliente-${num}.jpg`} alt="Cliente" className="max-w-full max-h-full object-contain pointer-events-none select-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. VISUALIZACIÓN EN TIEMPO REAL (TEXTO ORIGINAL) */}
        <section className="py-20 md:py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center text-center md:text-left">
            <motion.div {...fadeInUp} className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold italic text-gray-900 leading-tight">Visualización en Tiempo Real</h3>
              <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                Nuestras herramientas permiten observar cómo evolucionan sus métricas críticas mientras los datos fluyen por la arquitectura de ICH.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4 md:gap-8 bg-gray-50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-200 shadow-xl">
              <div className="flex flex-col justify-end h-32 md:h-48 space-y-3">
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
            </motion.div>
          </div>
        </section>

        {/* 6. QUIÉNES SOMOS (TEXTO ORIGINAL) */}
        <section id="quienes-somos" className="py-20 md:py-32 bg-gray-50 px-6 md:px-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div {...fadeInUp} className="space-y-8 text-center md:text-left order-2 md:order-1">
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tighter">Gestión integral de <br className="hidden md:block" /><span className="italic font-light text-gray-400 font-serif lowercase">datos.</span></h3>
              <p className="text-gray-500 text-lg leading-relaxed italic">
                Nuestra misión se centra en actuar como facilitadores de herramientas que le permitan a nuestros clientes contar con la mejor calidad de información para decidir con fundamentos el futuro de su negocio.
              </p>
              <div className="h-[2px] w-24 bg-blue-600 mx-auto md:mx-0"></div>
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 md:order-2">
              <NeuralNetwork />
            </motion.div>
          </div>
        </section>

        {/* 7. PRODUCTOS DESTACADOS (TEXTO ORIGINAL) */}
        <section id="productos" className="py-20 md:py-32 bg-white px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 {...fadeInUp} className="text-3xl md:text-4xl font-bold italic mb-4 text-gray-900 uppercase">Productos destacados</motion.h2>
            <motion.p {...fadeInUp} className="text-gray-400 font-light tracking-widest uppercase text-xs mb-12 md:mb-20">Arquitectura y Estrategia</motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "Arquitectura de Datos", d: "Procesos ETL y estructuración eficiente para bases madre robustas." },
                { t: "Gestión de OKRs & KPIs", d: "Identificación de métricas alineadas 100% a sus objetivos estratégicos." },
                { t: "Herramientas a Medida", d: "Dashboards dinámicos y visualización automatizada en tiempo real." }
              ].map((item, i) => (
                <motion.div {...fadeInUp} key={i} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-8 md:p-12 hover:bg-blue-600 group transition-all duration-700 border border-gray-100 rounded-[2rem] md:rounded-[2.5rem]">
                  <span className="text-blue-600 group-hover:text-white font-mono text-sm block mb-6">0{i+1}.</span>
                  <h4 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-white">{item.t}</h4>
                  <p className="text-gray-500 group-hover:text-blue-100 leading-relaxed text-sm md:text-base">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. METODOLOGÍA (SECCIÓN RECUPERADA Y ORIGINAL) */}
        <section className="py-20 md:py-32 bg-gray-50 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { n: "Relevamiento", c: "Identificación de procesos clave." },
              { n: "Diagnóstico", c: "Detección de oportunidades." },
              { n: "Objetivos", c: "Plan estructurado de negocio." },
              { n: "Capacitación", c: "Garantía de autonomía total." }
            ].map((step, i) => (
              <motion.div {...fadeInUp} transition={{ delay: i * 0.1 }} key={i} className="space-y-3">
                <div className="text-blue-600 font-bold text-lg italic">/0{i+1}</div>
                <h5 className="font-bold text-xs md:text-lg uppercase text-gray-900 tracking-tighter">{step.n}</h5>
                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed">{step.c}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 9. FOOTER (CORREO RESTAURADO) */}
        <footer className="py-20 bg-slate-900 text-center flex flex-col items-center border-t border-slate-800">
          <div className="grayscale invert opacity-50 mb-8">
            <Image src="/logo ich (1).svg" alt="ICH" width={70} height={35} className="mx-auto" />
          </div>
          <div className="space-y-4 px-6">
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

      {/* 10. POPUP ENDEAVOR */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPopup(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-[3rem] p-8 md:p-14 shadow-2xl text-center overflow-hidden border border-blue-50">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
              <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              
              <div className="mb-8 relative w-40 h-16 mx-auto mt-4">
                <Image src="/logo-endeavor.png" alt="Endeavor" fill className="object-contain" />
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter leading-none mb-4 italic">¿Viviendo la <br/><span className="text-blue-600 font-light">Experiencia?</span></h2>
              <p className="text-gray-500 text-sm md:text-lg mb-8 leading-relaxed px-2">Compartinos tu anécdota con los datos y ganá un diagnóstico estratégico.</p>
              
              <div className="flex flex-col gap-3">
                <button onClick={() => { setShowPopup(false); router.push('/ichtorias'); }} className="bg-blue-600 text-white font-black py-4 md:py-5 rounded-full uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-500/20">Contanos tu ICHtoria</button>
                <button onClick={() => setShowPopup(false)} className="text-gray-400 text-[10px] font-black uppercase tracking-widest py-2 hover:text-blue-600 transition-colors">Quizás más tarde</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}