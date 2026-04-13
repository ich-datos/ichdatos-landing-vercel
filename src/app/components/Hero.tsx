"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// --- RECURSO DE RED NEURONAL REFORZADO ---
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
      size: Math.random() * 4 + 3, // Nodos más grandes
    }));
    setNodes(initialNodes);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[400px]" />;

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-slate-50/80 rounded-[4rem] overflow-hidden border border-gray-200 shadow-inner">
      <svg viewBox="0 0 100 100" className="w-full h-full p-12">
        {nodes.map((node, i) => (
          nodes.slice(i + 1, i + 3).map((target, j) => (
            <motion.line
              key={`line-${i}-${j}`}
              x1={node.x} y1={node.y} x2={target.x} y2={target.y}
              stroke="#0047FF"
              strokeWidth="0.4" // Líneas mucho más gruesas
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }} // Mayor opacidad
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            r={node.size / 10}
            fill="#0047FF"
            initial={{ cx: node.x, cy: node.y, opacity: 0 }}
            animate={{ 
              cx: [node.x, node.targetX, node.x], 
              cy: [node.y, node.targetY, node.y],
              opacity: [0.2, 1, 0.2] // Contraste constante
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 to-transparent pointer-events-none" />
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
      return (
        <>{phraseBase}<span className="text-blue-600 font-bold">{rest}</span></>
      );
    }
    return displayText;
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
          <Image src="/logo ich (1).svg" alt="ICH" width={100} height={100} className="animate-pulse" />
          <div className="w-12 h-[1px] bg-blue-600 mt-4 animate-scale-x"></div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-16 py-4 flex justify-between items-center">
        <Image src="/logo ich (1).svg" alt="ICH Logo" width={70} height={35} />
        <div className="hidden md:flex gap-10 items-center text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
          <a href="#quienes-somos" className="hover:text-blue-600 transition-colors">Quiénes Somos</a>
          <a href="#productos" className="hover:text-blue-600 transition-colors">Productos</a>
          <a href="https://ich-demos-hub.webflow.io/" target="_blank" className="hover:text-blue-600 transition-colors text-blue-500">Hub de Demos</a>
        </div>
        <button onClick={() => router.push('/agendar')} className="bg-blue-600 text-white text-[10px] px-7 py-2.5 rounded-full font-bold tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-500/20">
          AGENDAR CITA
        </button>
      </nav>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* HERO */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-center">
          {sliderImages.map((src, index) => (
            <div key={src} className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${index === currentImage ? "opacity-100" : "opacity-0"}`}>
              <Image src={src} alt="Slide" fill className="object-cover animate-subtle-zoom" priority={index === 0} />
            </div>
          ))}
          <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[1px]"></div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-white px-6">
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-4 uppercase cursor-blink min-h-[1.2em]">
              {renderTypedText()}
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 tracking-wide">
              Soluciones inteligentes para la gestión de información estratégica.
            </p>
          </motion.div>
        </section>

        {/* VISUALIZACIÓN */}
        <section className="py-32 bg-white px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center text-center md:text-left">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold italic text-gray-900">Visualización en Tiempo Real</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Nuestras herramientas permiten observar cómo evolucionan sus métricas críticas mientras los datos fluyen por la arquitectura de ICH.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 bg-gray-50 p-12 rounded-[3.5rem] border border-gray-200 shadow-xl shadow-blue-900/5">
              <div className="flex flex-col justify-end h-48 space-y-3">
                {[60, 100, 80].map((h, i) => (
                  <div key={i} className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${h}%` }} transition={{ duration: 1.5, delay: i * 0.2 }} className="bg-blue-600 h-full" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
                  <motion.circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="314" initial={{ strokeDashoffset: 314 }} whileInView={{ strokeDashoffset: 314 - (314 * 0.90) }} transition={{ duration: 2 }} className="text-blue-600" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* QUIÉNES SOMOS */}
        <section id="quienes-somos" className="py-32 bg-gray-50 px-6 md:px-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900">Gestión integral de <br /><span className="italic font-light text-gray-400">datos.</span></h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Nuestra misión se centra en actuar como facilitadores de herramientas que le permitan a nuestros clientes contar con la mejor calidad de información para decidir con fundamentos, el futuro de su negocio.
              </p>
              <div className="h-[2px] w-24 bg-blue-600 mx-auto md:mx-0"></div>
            </div>
            <NeuralNetwork />
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="py-32 bg-white px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold italic mb-4 text-gray-900 uppercase tracking-tighter">Productos destacados</h2>
            <p className="text-gray-400 font-light tracking-widest uppercase text-xs mb-20">Arquitectura y Estrategia</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "Arquitectura de Datos", d: "Procesos ETL y estructuración eficiente para bases madre robustas." },
                { t: "Gestión de OKRs & KPIs", d: "Identificación de métricas alineadas 100% a sus objetivos estratégicos." },
                { t: "Herramientas a Medida", d: "Dashboards dinámicos y visualización automatizada en tiempo real." }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-12 hover:bg-blue-600 group transition-all duration-700 border border-gray-100 rounded-[2.5rem] shadow-sm">
                  <span className="text-blue-600 group-hover:text-white font-mono text-sm block mb-8">0{i+1}.</span>
                  <h4 className="text-2xl font-bold mb-6 group-hover:text-white">{item.t}</h4>
                  <p className="text-gray-500 group-hover:text-blue-100 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <section className="py-32 bg-gray-50 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { n: "Relevamiento", c: "Identificación de procesos y responsables clave para optimizar la gestión." },
              { n: "Diagnóstico", c: "Detección de limitantes y oportunidades de mejora estratégica." },
              { n: "Objetivos", c: "Definición de un plan estructurado para abordar los objetivos del negocio." },
              { n: "Capacitación", c: "Garantía de autonomía y acompañamiento para un crecimiento sostenible." }
            ].map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="text-blue-600 font-bold text-xl italic">/0{i+1}</div>
                <h5 className="font-bold text-lg uppercase tracking-tighter text-gray-900">{step.n}</h5>
                <p className="text-gray-500 text-sm leading-relaxed">{step.c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 bg-slate-900 text-center flex flex-col items-center border-t border-slate-800">
          <div className="grayscale invert opacity-50 mb-10"><Image src="/logo ich (1).svg" alt="ICH" width={80} height={40} /></div>
          <div className="space-y-4">
            <a href="mailto:info@ichdatos.com.ar" className="text-xs tracking-[0.6em] text-slate-400 hover:text-blue-400 transition-colors uppercase font-bold block">info@ichdatos.com.ar</a>
            <div className="h-[1px] w-12 bg-slate-700 mx-auto"></div>
            <p className="text-[10px] text-slate-500 tracking-[0.4em] uppercase font-light italic">Córdoba, Argentina • © 2026 ICH</p>
          </div>
        </footer>
      </div>
    </>
  );
}