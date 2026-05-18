"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-blue-100 flex flex-col">
      
      {/* NAVBAR UNIFICADA */}
      <nav className="p-4 md:px-16 flex flex-wrap justify-between items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-lg z-[100] gap-y-3 shadow-sm">
        <Image 
          src="/logo ich (1).svg" 
          alt="ICH" 
          width={85} 
          height={42} 
          className="cursor-pointer" 
          onClick={() => router.push('/')} 
        />
        <div className="flex gap-4 md:gap-10 text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 order-3 w-full justify-center md:w-auto md:order-2">
          <button onClick={() => router.push('/')} className="hover:text-blue-500 transition-colors">INICIO</button>
          <button onClick={() => router.push('/que-hacemos')} className="hover:text-blue-500 transition-colors">¿QUÉ HACEMOS?</button>
          <button className="text-blue-600 border-b-2 border-blue-600 pb-1">NOTICIAS</button>
        </div>
        <button onClick={() => router.push('/agendar')} className="bg-blue-600 text-white text-[8px] md:text-[10px] px-5 py-2 rounded-full font-bold order-2 md:order-3 tracking-widest uppercase hover:bg-slate-900 transition-colors shadow-md">
          AGENDAR
        </button>
      </nav>

      <div className="flex-grow">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <section className="pt-20 md:pt-32 pb-12 px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="max-w-4xl mx-auto">
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-4">
              Novedades y Prensa
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-tight uppercase italic mb-8">
              ICH en la Experiencia Endeavor Córdoba 2026
            </h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>
        </section>

        {/* GALERÍA DE IMÁGENES (3 FOTOS) - AHORA CON .JPEG */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Foto 1 */}
            <div className="relative h-64 md:h-80 w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 group">
              <Image src="/endeavor-1.jpeg" alt="Experiencia Endeavor 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Foto 2 */}
            <div className="relative h-64 md:h-80 w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 group">
              <Image src="/endeavor-2.jpeg" alt="Experiencia Endeavor 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Foto 3 */}
            <div className="relative h-64 md:h-80 w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 group">
              <Image src="/endeavor-3.jpeg" alt="Experiencia Endeavor 3" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </motion.div>
        </section>

        {/* MENCIONES EN MEDIOS (LINKS) */}
        <section className="py-16 md:py-20 px-6 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 mb-8 px-2 border-l-4 border-blue-600 pl-4">
              Cobertura en medios
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Noticia 1 - Cadena 3 */}
              <a 
                href="https://www.cadena3.com/noticia/sociedad/mas-de-6-mil-asistentes-a-la-experiencia-endeavor-cordoba_551743" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Cadena 3</span>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Más de 6 mil asistentes a la Experiencia Endeavor Córdoba
                    </h3>
                  </div>
                  <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-wider shrink-0">
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
                className="block bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Punto a Punto</span>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Experiencia Endeavor 2026: el ecosistema emprendedor debatió sobre financiamiento, cultura y el rol de la mujer
                    </h3>
                  </div>
                  <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-wider shrink-0">
                    Leer nota
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="py-12 bg-slate-900 text-center border-t border-slate-800">
        <Image src="/logo ich (1).svg" alt="ICH" width={50} height={25} className="mx-auto grayscale invert opacity-20 mb-6" />
        <p className="text-slate-600 text-[8px] tracking-[0.5em] uppercase font-bold">ICH • Estrategia & Datos • 2026</p>
      </footer>

    </main>
  );
}