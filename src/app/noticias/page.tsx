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

export default function Noticias() {
  const router = useRouter();

  useEffect(() => {
    // Seguridad Anti-copia
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
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

  // Animación suave de entrada
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <main className="relative min-h-screen bg-[#060A10] text-[#8A99A8] flex flex-col transition-opacity duration-1000 overflow-hidden">
      
      {/* FONDO DINÁMICO */}
      <GlobalNetworkBackground />

      {/* NAVBAR UNIFICADA */}
      <nav className="fixed top-0 w-full z-[100] bg-[#060A10]/80 backdrop-blur-md border-b border-white/[0.05] px-4 md:px-16 py-3 md:py-4 flex flex-wrap justify-between items-center gap-y-3 transition-all duration-500">
        <Image 
          src="/logo ich (1).svg" 
          alt="ICH Logo" 
          width={85} 
          height={42} 
          className="cursor-pointer brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
          onClick={() => router.push('/')} 
        />
        
        <div className="flex gap-4 md:gap-10 items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-[#8A99A8] uppercase order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/')} className="hover:text-[#F0F3F7] transition-colors uppercase">INICIO</button>
          <button onClick={() => router.push('/que-hacemos')} className="hover:text-[#F0F3F7] transition-colors uppercase">¿QUÉ HACEMOS?</button>
          <button className="text-[#F0F3F7] border-b border-[#506070] pb-1 uppercase transition-colors">NOTICIAS</button>
        </div>
        
        <button onClick={() => router.push('/agendar')} className="bg-[#F0F3F7] text-[#060A10] text-[8px] md:text-[10px] px-4 md:px-7 py-2 md:py-2.5 rounded-full font-bold tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg order-2 md:order-3 uppercase">
          AGENDAR CITA
        </button>
      </nav>

      <div className="flex-grow relative z-10 w-full flex flex-col pt-24">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <section className="pt-12 md:pt-20 pb-12 px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="max-w-4xl mx-auto">
            <span className="text-[#506070] font-light tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-4">
              Novedades y Prensa
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F0F3F7] leading-tight uppercase italic mb-8">
              ICH en la Experiencia <br className="hidden md:block"/> Endeavor Córdoba 2026
            </h1>
            <div className="w-16 h-[2px] bg-[#506070] mx-auto rounded-full opacity-50"></div>
          </motion.div>
        </section>

        {/* GALERÍA DE IMÁGENES */}
        <section className="py-8 px-6 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative h-64 md:h-80 w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/[0.02] group">
                <Image 
                  src={`/endeavor-${num}.jpeg`} 
                  alt={`Experiencia Endeavor ${num}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
                {/* Overlay oscuro sutil */}
                <div className="absolute inset-0 bg-[#060A10]/40 group-hover:bg-[#060A10]/10 transition-colors duration-500"></div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* MENCIONES EN MEDIOS (LINKS) */}
        <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#F0F3F7] mb-8 px-4 border-l-2 border-[#506070]">
              Cobertura en medios
            </h2>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Noticia 1 - Cadena 3 */}
              <a 
                href="https://www.cadena3.com/noticia/sociedad/mas-de-6-mil-asistentes-a-la-experiencia-endeavor-cordoba_551743" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-[#0D131F]/40 p-6 md:p-8 rounded-[2rem] border border-white/[0.02] backdrop-blur-md shadow-lg hover:bg-[#131B2B]/80 hover:border-white/[0.05] transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#506070] block mb-2 group-hover:text-[#8A99A8] transition-colors">Cadena 3</span>
                    <h3 className="text-lg md:text-xl font-bold text-[#F0F3F7] group-hover:text-white transition-colors">
                      Más de 6 mil asistentes a la Experiencia Endeavor Córdoba
                    </h3>
                  </div>
                  <div className="flex items-center text-[#8A99A8] group-hover:text-[#F0F3F7] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors">
                    Leer nota
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </a>

              {/* Noticia 2 - Punto a Punto */}
              <a 
                href="https://puntoapunto.com.ar/experiencia-endeavor-2026-el-ecosistema-emprendedor-debatio-sobre-financiamiento-cultura-y-el-rol-de-la-mujer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-[#0D131F]/40 p-6 md:p-8 rounded-[2rem] border border-white/[0.02] backdrop-blur-md shadow-lg hover:bg-[#131B2B]/80 hover:border-white/[0.05] transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#506070] block mb-2 group-hover:text-[#8A99A8] transition-colors">Punto a Punto</span>
                    <h3 className="text-lg md:text-xl font-bold text-[#F0F3F7] group-hover:text-white transition-colors">
                      Experiencia Endeavor 2026: el ecosistema emprendedor debatió sobre financiamiento, cultura y el rol de la mujer
                    </h3>
                  </div>
                  <div className="flex items-center text-[#8A99A8] group-hover:text-[#F0F3F7] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors">
                    Leer nota
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </a>

              {/* Noticia 3 - La Nación */}
              <a 
                href="https://www.lanacion.com.ar/economia/negocios/fracasar-reinventarse-y-volver-a-intentar-las-lecciones-que-dejo-endeavor-cordoba-nid15052026/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-[#0D131F]/40 p-6 md:p-8 rounded-[2rem] border border-white/[0.02] backdrop-blur-md shadow-lg hover:bg-[#131B2B]/80 hover:border-white/[0.05] transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#506070] block mb-2 group-hover:text-[#8A99A8] transition-colors">La Nación</span>
                    <h3 className="text-lg md:text-xl font-bold text-[#F0F3F7] group-hover:text-white transition-colors">
                      Fracasar, reinventarse y volver a intentar: las lecciones que dejó Endeavor Córdoba
                    </h3>
                  </div>
                  <div className="flex items-center text-[#8A99A8] group-hover:text-[#F0F3F7] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors">
                    Leer nota
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </a>

              {/* Noticia 4 - LinkedIn Pulse */}
              <a 
                href="https://www.linkedin.com/pulse/meet-companies-m%C3%A1s-de-26-startups-cordobesas-conectaron-con-nn47f" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-[#0D131F]/40 p-6 md:p-8 rounded-[2rem] border border-white/[0.02] backdrop-blur-md shadow-lg hover:bg-[#131B2B]/80 hover:border-white/[0.05] transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#506070] block mb-2 group-hover:text-[#8A99A8] transition-colors">LinkedIn Pulse</span>
                    <h3 className="text-lg md:text-xl font-bold text-[#F0F3F7] group-hover:text-white transition-colors">
                      Meet Companies: más de 26 startups cordobesas conectaron con fondos de inversión
                    </h3>
                  </div>
                  <div className="flex items-center text-[#8A99A8] group-hover:text-[#F0F3F7] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors">
                    Leer nota
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </a>

            </div>
          </motion.div>
        </section>
      </div>

      {/* FOOTER ADAPTADO AL HERO PRINCIPAL */}
      <footer className="relative z-10 pt-16 pb-12 bg-gradient-to-b from-transparent to-[#030508] text-center flex flex-col items-center">
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

    </main>
  );
}