"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// --- FONDO DINÁMICO (GRIS AZULADO, SUTIL, SEGUNDO PLANO) ---
const GlobalNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 250 }; 

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.8; 
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 2; 
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(80, 96, 112, 0.4)"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (window.innerWidth * window.innerHeight) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        const dxMouse = mouse.x - particles[i].x;
        const dyMouse = mouse.y - particles[i].y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < mouse.radius) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(80, 96, 112, ${(1 - distMouse / mouse.radius) * 0.3})`;
          ctx.lineWidth = 1; 
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) { 
            ctx.beginPath();
            ctx.strokeStyle = `rgba(80, 96, 112, ${(1 - distance / 130) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-screen pointer-events-none z-0" 
    />
  );
};

// --- RED NEURONAL REFORZADA ESTÁTICA ---
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
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-transparent overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full p-4 md:p-8">
        {nodes.map((node, i) => (
          nodes.slice(i + 1, i + 3).map((target, j) => (
            <motion.line
              key={`line-${i}-${j}`}
              x1={node.x} y1={node.y} x2={target.x} y2={target.y}
              stroke="#506070" 
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.4, 0] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            r={node.size / 10}
            fill="#506070" 
            animate={{ 
              cx: [node.x, node.targetX, node.x], 
              cy: [node.y, node.targetY, node.y],
              opacity: [0.1, 0.7, 0.1] 
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
  
  const clientLogos = [
    { id: 1, src: "/cliente-1.png", isDarkComponent: false },
    { id: 2, src: "/cliente-2.png", isDarkComponent: true }, 
    { id: 3, src: "/cliente-3.png", isDarkComponent: false },
    { id: 4, src: "/cliente-4.png", isDarkComponent: true }, 
    { id: 5, src: "/cliente-5.png", isDarkComponent: false },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "i" || e.key === "j" || e.key === "c")) ||
        (e.ctrlKey && e.key === "u") ||
        (e.metaKey && e.key === "u") 
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
      return <>{phraseBase}<span className="text-[#F0F3F7] font-bold">{rest}</span></>;
    }
    return displayText;
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-[#060A10] flex flex-col items-center justify-center z-[9999]">
          <Image src="/logo ich (1).svg" alt="ICH" width={80} height={80} className="animate-pulse brightness-0 invert opacity-80" />
          <div className="w-12 h-[1px] bg-[#506070] mt-6 animate-scale-x"></div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-[#060A10]/80 backdrop-blur-md border-b border-white/[0.05] px-4 md:px-16 py-3 md:py-4 flex flex-wrap justify-between items-center gap-y-3 transition-all duration-500">
        <Image src="/logo ich (1).svg" alt="ICH Logo" width={85} height={42} className="cursor-pointer brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" onClick={() => router.push('/')} />
        
        <div className="flex gap-4 md:gap-10 items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-[#8A99A8] uppercase order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/que-hacemos')} className="hover:text-[#F0F3F7] transition-colors uppercase">¿QUÉ HACEMOS?</button>
          <a href="#productos" className="hover:text-[#F0F3F7] transition-colors uppercase hidden sm:block">PRODUCTOS</a>
          <button onClick={() => router.push('/noticias')} className="text-[#F0F3F7] hover:text-white transition-colors uppercase">NOTICIAS</button>
        </div>
        
        <button onClick={() => router.push('/agendar')} className="bg-[#F0F3F7] text-[#060A10] text-[8px] md:text-[10px] px-4 md:px-7 py-2 md:py-2.5 rounded-full font-bold tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg order-2 md:order-3 uppercase">
          AGENDAR CITA
        </button>
      </nav>

      {/* CONTENEDOR PRINCIPAL */}
      <main className={`relative transition-opacity duration-1000 min-h-screen bg-[#060A10] text-[#8A99A8] ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* FONDO DINÁMICO */}
        <GlobalNetworkBackground />

        {/* CONTENIDO */}
        <div className="relative z-10 w-full flex flex-col">
          
          {/* HERO PRINCIPAL */}
          <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#060A10] text-center px-4">
            {sliderImages.map((src, index) => (
              <div key={src} className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${index === currentImage ? "opacity-100" : "opacity-0"}`}>
                <Image src={src} alt="Slide" fill className="object-cover" priority={index === 0} />
              </div>
            ))}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#060A10]/50 to-[#060A10] opacity-100"></div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-white w-full">
              <h1 className="text-4xl md:text-8xl font-light tracking-tighter mb-4 uppercase min-h-[1.2em]">
                {renderTypedText()}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }} 
                  className="text-[#506070] font-light ml-1"
                >
                  |
                </motion.span>
              </h1>
              <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto text-[#8A99A8] px-4">
                Soluciones inteligentes para la gestión de información estratégica.
              </p>
            </motion.div>
          </section>

          {/* SECCIÓN LOGOS (FONDO CLARO OPACADO Y TRANQUILO) */}
          <section className="py-12 bg-white relative z-10 border-y border-black/[0.03]">
            {/* Capa de superposición para un "blanco opacado y tranquilo" */}
            <div className="absolute inset-0 bg-[#060A10]/5 z-0" />
            
            <motion.div 
              className="max-w-7xl mx-auto px-6 mb-10 text-center relative z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-sm md:text-lg font-light tracking-[0.3em] text-[#506070] uppercase">
                Confían en nosotros
              </h2>
            </motion.div>
            
            {/* Contenedor con máscara de degradado en los bordes */}
            <motion.div 
              className="relative flex overflow-hidden w-full max-w-[100vw] relative z-10"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <motion.div 
                className="flex whitespace-nowrap items-center w-max gap-16 md:gap-24 pr-16 md:pr-24"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                  <div key={index} className="flex items-center justify-center w-24 md:w-36 h-16 shrink-0 relative group">
                    <Image 
                      src={logo.src} 
                      alt={`Cliente ${logo.id}`} 
                      fill
                      sizes="(max-width: 768px) 96px, 144px"
                      priority={index < 10}
                      className="object-contain transition-all duration-500 select-none cursor-pointer opacity-90 group-hover:opacity-100"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* SECCIÓN VISUALIZACIÓN */}
          <section className="py-16 md:py-24 bg-transparent px-6 relative z-10">
            <motion.div 
              className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center text-center md:text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-4 px-2">
                <h3 className="text-3xl md:text-4xl font-bold italic text-[#F0F3F7] leading-tight">Visualización en Tiempo Real</h3>
                <p className="text-[#8A99A8] text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  Nuestras herramientas permiten observar cómo evolucionan sus métricas críticas mientras los datos fluyen por la arquitectura de ICH.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-8 bg-[#0D131F]/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/[0.03] shadow-2xl">
                <div className="flex flex-col justify-end h-32 md:h-40 space-y-3">
                  {[60, 100, 80].map((h, i) => (
                    <div key={i} className="w-full bg-[#1A2332] rounded-full h-3 md:h-4 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${h}%` }} transition={{ duration: 1.5, delay: i * 0.2 }} className="bg-[#F0F3F7] h-full rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-24 h-24 md:w-32 md:h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-[#1A2332]" />
                    <motion.circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="314" initial={{ strokeDashoffset: 314 }} whileInView={{ strokeDashoffset: 314 - (314 * 0.90) }} transition={{ duration: 2 }} className="text-[#F0F3F7]" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </section>

          {/* SECCIÓN QUIÉNES SOMOS */}
          <section id="quienes-somos" className="py-16 md:py-24 bg-transparent px-6 md:px-24 relative z-10">
            <motion.div 
              className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6 text-center md:text-left order-2 md:order-1 px-2">
                <h3 className="text-3xl md:text-5xl font-bold text-[#F0F3F7] uppercase tracking-tighter">Gestión integral de <br className="hidden md:block" /><span className="italic font-light text-[#506070] font-serif lowercase">datos.</span></h3>
                <p className="text-[#8A99A8] text-lg leading-relaxed italic">
                  Nuestra misión se centra en actuar como facilitadores de herramientas que le permitan a nuestros clientes contar con la mejor calidad de información para decidir con fundamentos el futuro de su negocio.
                </p>
                <div className="h-[2px] w-24 bg-[#506070] mx-auto md:mx-0 opacity-50"></div>
              </div>
              <div className="order-1 md:order-2">
                <NeuralNetwork />
              </div>
            </motion.div>
          </section>

          {/* SECCIÓN PRODUCTOS */}
          <section id="productos" className="py-16 md:py-24 bg-transparent px-6 relative z-10">
            <motion.div 
              className="max-w-7xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold italic mb-3 text-[#F0F3F7] uppercase tracking-wide">Productos destacados</h2>
              <p className="text-[#506070] font-light tracking-[0.3em] uppercase text-xs mb-12 md:mb-20 block">Arquitectura y Estrategia</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { t: "Arquitectura de Datos", d: "Procesos ETL y estructuración eficiente para bases madre robustas." },
                  { t: "Gestión de OKRs & KPIs", d: "Identificación de métricas alineadas 100% a sus objetivos estratégicos." },
                  { t: "Herramientas a Medida", d: "Dashboards dinámicos y visualización automatizada en tiempo real." }
                ].map((item, i) => (
                  <div key={i} className="bg-[#0D131F]/40 p-8 md:p-10 hover:bg-[#131B2B]/80 group transition-colors duration-500 rounded-[2rem] backdrop-blur-sm border border-white/[0.02]">
                    <span className="text-[#506070] group-hover:text-[#F0F3F7] transition-colors font-mono text-sm block mb-5">0{i+1}.</span>
                    <h4 className="text-xl md:text-2xl font-bold mb-3 text-[#F0F3F7]">{item.t}</h4>
                    <p className="text-[#8A99A8] group-hover:text-white transition-colors leading-relaxed text-sm md:text-base">{item.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* SECCIÓN METODOLOGÍA */}
          <section className="py-16 md:py-24 bg-transparent px-6 relative z-10">
            <motion.div 
              className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center bg-[#0D131F]/30 backdrop-blur-md rounded-[2rem] p-10 border border-white/[0.02]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {[
                { n: "Relevamiento", c: "Identificación de procesos clave." },
                { n: "Diagnóstico", c: "Detección de oportunidades." },
                { n: "Objetivos", c: "Plan estructurado de negocio." },
                { n: "Capacitación", c: "Garantía de autonomía total." }
              ].map((step, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-[#506070] font-light text-lg italic">/0{i+1}</div>
                  <h5 className="font-bold text-xs md:text-sm uppercase text-[#F0F3F7] tracking-widest">{step.n}</h5>
                  <p className="text-[#8A99A8] text-[10px] md:text-xs leading-relaxed px-2">{step.c}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* FOOTER */}
          <footer className="relative z-10 pt-24 pb-12 bg-gradient-to-b from-transparent to-[#030508] text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
            >
              <div className="mb-8">
                <Image src="/logo ich (1).svg" alt="ICH" width={70} height={35} className="mx-auto brightness-0 invert opacity-30" />
              </div>
              <div className="space-y-4 px-6">
                <a href="mailto:info@ichdatos.com.ar" className="text-[10px] md:text-xs tracking-[0.4em] text-[#8A99A8] hover:text-[#F0F3F7] transition-colors uppercase font-medium block">
                  info@ichdatos.com.ar
                </a>
                <div className="h-[1px] w-8 bg-[#1A2332] mx-auto"></div>
                <p className="text-[9px] text-[#506070] tracking-[0.3em] uppercase font-light">
                  Córdoba, Argentina • © 2026 ICH
                </p>
              </div>
            </motion.div>
          </footer>
        </div>
      </main>
    </>
  );
}