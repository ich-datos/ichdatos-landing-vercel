"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Preloader Minimalista */}
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
          <Image src="/logo ich (1).svg" alt="ICH Logo" width={120} height={120} className="animate-pulse" />
          <div className="w-12 h-[1px] bg-blue-600 mt-4 animate-scale-x"></div>
        </div>
      )}

      {/* 2. Contenido con Efecto Hero */}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* IMAGEN CON EFECTO DE DESPLAZAMIENTO */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image 
              src="/brochure_2.jpg" 
              alt="ICH Data Management" 
              fill 
              className="object-cover animate-subtle-zoom" // <-- El efecto de desplazamiento
              priority
            />
            {/* CAPA DE CONTRASTE (OVERLAY): Esto hace que el texto resalte */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          </div>

          {/* TEXTO PRINCIPAL CON CONTRASTE ALTO */}
          <div className="relative z-10 text-center px-6 animate-fade-up">
            <h1 className="text-white text-5xl md:text-8xl font-light tracking-tighter mb-4">
              TRANSFORMÁ TUS <span className="font-bold text-blue-500 italic">DATOS</span>
            </h1>
            <p className="text-gray-100 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light tracking-wide">
              Gestión integral de información para decisiones estratégicas de alto nivel.
            </p>
            
            {/* BOTÓN EJECUTIVO */}
            <button 
              onClick={() => window.location.href = '/agendar'} 
              className="px-12 py-4 bg-blue-600 text-white font-bold tracking-[0.2em] hover:bg-white hover:text-blue-600 transition-all duration-500 rounded-full text-xs shadow-2xl"
            >
              AGENDAR CITA EJECUTIVA
            </button>
          </div>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Scroll</span>
          </div>
        </section>

        {/* SECCIÓN INFERIOR DE CONTENIDO (Para seguir bajando) */}
        <section className="py-32 bg-white flex flex-col items-center">
           <div className="max-w-4xl text-center px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Estrategia Basada en Evidencia</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">
                En ICH facilitamos herramientas de alta precisión que permiten a nuestros clientes contar 
                con la mejor calidad de información para decidir con fundamentos el futuro de su negocio.
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
           </div>
        </section>
      </div>
    </>
  );
}