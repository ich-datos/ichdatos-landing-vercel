"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// --- FONDO DINÁMICO (GRIS AZULADO, SÚPER SUTIL) ---
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
        ctx.fillStyle = "rgba(80, 96, 112, 0.2)"; 
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
          ctx.strokeStyle = `rgba(80, 96, 112, ${(1 - distMouse / mouse.radius) * 0.15})`;
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
            ctx.strokeStyle = `rgba(80, 96, 112, ${(1 - distance / 130) * 0.08})`;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 grayscale invert opacity-10" 
    />
  );
};

// --- COMPONENTE DE ANIMACIÓN DE DESPLAZAMIENTO ---
const FadeInWhenVisible = ({ children, delay = 0, yOffset = 50 }: { children: ReactNode; delay?: number; yOffset?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

// --- ICONOS ADAPTADOS A LA ESTÉTICA PROFUNDA (Flotantes y sin bordes duros) ---
const LogisticaIcon = () => (
  <div className="relative w-full h-48 md:h-56 flex items-center justify-center bg-white/[0.02] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/[0.05]">
    <motion.svg 
      viewBox="0 0 100 100" className="w-20 md:w-24 h-20 md:h-24 text-[#506070] absolute"
      animate={{ x: [-120, 120] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <path fill="currentColor" d="M15,65 L85,65 L78,85 L22,85 Z M35,65 L35,45 L48,45 L48,65" />
    </motion.svg>
    <motion.svg 
      viewBox="0 0 100 100" className="w-20 md:w-24 h-20 md:h-24 text-[#F0F3F7] absolute mt-20 md:mt-24"
      animate={{ x: [-130, 130] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <rect x="5" y="45" width="50" height="20" fill="currentColor" rx="1" />
      <path fill="currentColor" d="M56,65 L78,65 L78,52 L70,52 L60,45 L56,45 Z" />
      <circle fill="currentColor" cx="15" cy="68" r="4" /><circle fill="currentColor" cx="45" cy="68" r="4" />
    </motion.svg>
  </div>
);

const AdministracionIcon = () => (
  <div className="w-full h-48 md:h-56 flex items-center justify-center bg-white/[0.02] rounded-[2rem] md:rounded-[3rem] border border-white/[0.05]">
    <motion.svg viewBox="0 0 100 100" className="w-24 md:w-28 h-24 md:h-28 text-[#506070]" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
      <path fill="currentColor" d="M50,20 A30,30 0 1,0 50,80 A30,30 0 1,0 50,20 M50,0 L58,15 L72,12 L75,25 L88,28 L84,40 L96,48 L88,58 L96,70 L82,75 L80,88 L65,85 L58,96 L48,85 L32,92 L30,78 L15,80 L20,65 L5,58 L15,48 L10,35 L25,32 L28,18 L42,20 Z" />
      <circle fill="#F0F3F7" cx="50" cy="50" r="10" />
    </motion.svg>
  </div>
);

const FinanzasIcon = () => (
  <div className="w-full h-48 md:h-56 flex items-center justify-center bg-white/[0.02] rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border border-white/[0.05]">
    <svg viewBox="0 0 100 100" className="w-full h-full text-[#506070]">
      <motion.rect x="10" y="60" width="12" height="30" fill="currentColor" opacity="0.4" animate={{ height: [30, 50, 30] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.rect x="35" y="40" width="12" height="50" fill="currentColor" opacity="0.7" animate={{ height: [50, 70, 50] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="60" y="20" width="12" height="70" fill="currentColor" animate={{ height: [70, 90, 70] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
      <motion.path d="M10,80 L40,50 L70,20 L90,5" fill="none" stroke="#F0F3F7" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  </div>
);

const ComercialIcon = () => (
  <div className="w-full h-48 md:h-56 flex items-center justify-center bg-white/[0.02] rounded-[2rem] md:rounded-[3rem] p-10 md:p-12 border border-white/[0.05]">
    <motion.svg viewBox="0 0 100 100" className="w-full h-full text-[#506070]" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity }}>
      <path fill="none" stroke="currentColor" strokeWidth="3" d="M10,5 L90,5 L65,95 L35,95 Z" />
      <motion.line x1="25" y1="35" x2="75" y2="35" stroke="#F0F3F7" strokeWidth="2" strokeDasharray="4" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    </motion.svg>
  </div>
);

export default function QueHacemos() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState("");
  const fullTitle = "Para cada necesidad, una solución concreta";

  const sectores = [
    { 
      title: "Logística", 
      icon: <LogisticaIcon />, 
      items: ["Seguimiento de costos de transporte", "Forecast de compras", "Confección de surtido", "Clusterizacion de productos"] 
    },
    { 
      title: "Administración", 
      icon: <AdministracionIcon />, 
      items: ["Control de cuentas", "Worflow de documentation automatizado", "Automatización de reportes mensuales", "Control de gastos fijos y variables"] 
    },
    { 
      title: "Finanzas", 
      icon: <FinanzasIcon />, 
      items: ["Flujo de caja proyectado (Cashflow)", "Análisis de rentabilidad por unidad de negocio", "Seguimiento de inversiones y financiamiento", "Control de desvíos presupuestarios"] 
    },
    { 
      title: "Comercial", 
      icon: <ComercialIcon />, 
      items: ["Embudo de ventas en tiempo real", "Scorecard por proveedor", "Análisis de performance", "Seguimiento de objetivos comerciales"] 
    },
  ];

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) clearInterval(typingInterval);
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#060A10] text-[#8A99A8] overflow-hidden">
      
      {/* FONDO DINÁMICO */}
      <GlobalNetworkBackground />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-[#060A10]/80 backdrop-blur-md border-b border-white/[0.05] px-4 md:px-16 py-3 md:py-4 flex flex-wrap justify-between items-center gap-y-3 transition-all duration-500">
        <Image src="/logo ich (1).svg" alt="ICH Logo" width={85} height={42} className="cursor-pointer brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" onClick={() => router.push('/')} />
        
        <div className="flex gap-4 md:gap-10 items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-[#8A99A8] uppercase order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/')} className="hover:text-[#F0F3F7] transition-colors uppercase">INICIO</button>
          <button onClick={() => router.push('/que-hacemos')} className="text-[#F0F3F7] hover:text-white transition-colors uppercase">¿QUÉ HACEMOS?</button>
          <button onClick={() => router.push('/noticias')} className="hover:text-[#F0F3F7] transition-colors uppercase">NOTICIAS</button>
        </div>
        
        <button onClick={() => router.push('/agendar')} className="bg-[#F0F3F7] text-[#060A10] text-[8px] md:text-[10px] px-4 md:px-7 py-2 md:py-2.5 rounded-full font-bold tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg order-2 md:order-3 uppercase">
          AGENDAR CITA
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full flex flex-col pt-32 pb-16">
        
        {/* Degradado superior para fundir con el navbar */}
        <div className="absolute top-0 left-0 w-full h-48 z-[1] bg-gradient-to-b from-[#060A10] via-[#060A10]/60 to-transparent pointer-events-none"></div>

        {/* INTRODUCCIÓN (Estilo Hero) */}
        <FadeInWhenVisible yOffset={30}>
          <section className="px-6 md:px-16 flex flex-col items-center justify-center relative z-10 mb-20 md:mb-32 mt-10">
            <div className="max-w-4xl text-center space-y-8">
              <p className="text-base md:text-xl font-light leading-relaxed tracking-wide text-[#8A99A8] italic px-2">
                "Nos encargamos de que puedas sacarle el máximo provecho a tu información. <span className="text-[#F0F3F7] font-medium">Ordenamos tus bases de datos, generamos respaldos seguros y encontramos relaciones entre variables</span> que permitan llegar a decisiones asertivas para cada arista de tu negocio. Actuamos justo ahí donde tu ERP falla. En ICH, cada desarrollo es a medida, es orientado por nuestro cliente y por eso responde específicamente a tus necesidades."
              </p>
              <div className="h-[1px] w-16 bg-[#506070] mx-auto opacity-50"></div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* TÍTULO MÁQUINA DE ESCRIBIR */}
        <FadeInWhenVisible delay={0.2}>
          <div className="mb-16 md:mb-24 text-center min-h-[4em] flex flex-col items-center justify-center px-4">
            <h2 className="text-2xl md:text-5xl font-light tracking-tighter uppercase text-[#F0F3F7]">
              {displayText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
                className="text-[#506070] font-light ml-1"
              >
                |
              </motion.span>
            </h2>
          </div>
        </FadeInWhenVisible>

        {/* TARJETAS DE SECTORES (Grid Fundido) */}
        <section className="px-4 md:px-16 max-w-7xl mx-auto relative z-10 bg-transparent w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {sectores.map((s, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.15} yOffset={60}>
                {/* Tarjetas Glassmorphism fundidas, sin bordes duros */}
                <div className="h-full p-2 border border-white/[0.02] rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0D131F]/40 backdrop-blur-md shadow-lg hover:bg-[#131B2B]/60 transition-all duration-500 group flex flex-col">
                  <div className="p-3 md:p-4">{s.icon}</div>
                  <div className="p-6 md:p-10 pt-4 flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 italic tracking-tighter text-[#F0F3F7]">{s.title}</h3>
                    <ul className="space-y-4">
                      {s.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-[#8A99A8] group-hover:text-white transition-colors text-sm md:text-base border-b border-white/[0.05] pb-3 last:border-0 font-light">
                          <span className="w-1.5 h-1.5 bg-[#506070] rounded-full mr-4 mt-2 shrink-0 group-hover:bg-[#F0F3F7] transition-colors"></span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 pt-24 pb-12 bg-gradient-to-b from-transparent to-[#030508] text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
        >
          <div className="mb-8">
            <Image src="/logo ich (1).svg" alt="ICH" width={70} height={35} className="mx-auto brightness-0 invert opacity-60" />
          </div>
          <div className="space-y-4 px-6">
            <a href="mailto:info@ichdatos.com.ar" className="text-[10px] md:text-xs tracking-[0.4em] text-[#B8BEC9] hover:text-[#F0F3F7] transition-colors uppercase font-medium block">
              info@ichdatos.com.ar
            </a>
            <div className="h-[1px] w-8 bg-[#506070] mx-auto"></div>
            <p className="text-[9px] text-[#8A99A8] tracking-[0.3em] uppercase font-light">
              Córdoba, Argentina • © 2026 ICH
            </p>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}