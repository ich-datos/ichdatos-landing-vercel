"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  // 1. LISTA DE IMÁGENES PARA EL BANNER (Asegúrate de que existan en /public)
  const sliderImages = [
    "/brochure_2.jpg",
    "/hero-2.jpg",
    "/hero-3.jpg",
    "/hero-4.jpg",
    "/hero-5.jpg",
  ];

  useEffect(() => {
    // Timer para el preloader
    const loadTimer = setTimeout(() => setLoading(false), 2000);

    // Intervalo para rotar imágenes cada 5 segundos
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(imageInterval);
    };
  }, [sliderImages.length]);

  return (
    <>
      {/* --- PRELOADER --- */}
      {loading && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
          <Image src="/logo ich (1).svg" alt="ICH" width={100} height={100} className="animate-pulse" />
          <div className="w-12 h-[1px] bg-blue-600 mt-4 animate-scale-x"></div>
        </div>
      )}

      {/* --- NAVBAR EJECUTIVO --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-16 py-4 flex justify-between items-center">
        <Image src="/logo ich (1).svg" alt="ICH Logo" width={70} height={35} />
        
        <div className="hidden md:flex gap-10 items-center text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
          <a href="#quienes-somos" className="hover:text-blue-600 transition-colors">Quiénes Somos</a>
          <a href="#productos" className="hover:text-blue-600 transition-colors">Productos</a>
          <a href="https://ich-demos-hub.webflow.io/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Hub de Demos</a>
        </div>

        <button 
          onClick={() => router.push('/agendar')} 
          className="bg-blue-600 text-white text-[10px] px-7 py-2.5 rounded-full font-bold tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-500/20"
        >
          AGENDAR CITA
        </button>
      </nav>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* --- SECCIÓN 1: HERO CON SLIDER AUTOMÁTICO --- */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          {sliderImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image 
                src={src} 
                alt={`ICH Slide ${index}`} 
                fill 
                className={`object-cover ${index === currentImage ? "animate-subtle-zoom" : ""}`} 
                priority={index === 0}
              />
            </div>
          ))}
          
          <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[1px]"></div>
          
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-4 uppercase">
              Transformá tus <span className="font-bold text-blue-500 italic">Datos</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 tracking-wide">
              Soluciones inteligentes para la gestión integral de información estratégica.
            </p>
            <div className="mt-12">
               <button 
                 onClick={() => router.push('/agendar')}
                 className="px-10 py-4 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold tracking-[0.3em] uppercase"
               >
                 Comenzar Diagnóstico
               </button>
            </div>
          </div>

          {/* Indicadores de Slide */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {sliderImages.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 ${i === currentImage ? "w-8 bg-blue-600" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce z-10">
            <span className="text-[9px] tracking-[0.5em] uppercase font-bold">Scroll</span>
          </div>
        </section>

        {/* --- SECCIÓN 2: QUIÉNES SOMOS --- */}
        <section id="quienes-somos" className="py-32 bg-white px-6 md:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-[10px] tracking-[0.6em] text-blue-600 font-bold uppercase">Tu necesidad, nuestro compromiso</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Gestión integral de <br /> <span className="italic font-light text-gray-400">datos y calidad.</span>
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Transformamos datos en información de calidad para brindar un apoyo estratégico real al negocio. 
                Actuamos como facilitadores de herramientas que garantizan la escalabilidad empresarial.
              </p>
              <div className="h-[2px] w-24 bg-blue-600"></div>
            </div>
            <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
              <Image src="/about-us.jpg" alt="Estrategia ICH" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 3: PRODUCTOS --- */}
        <section id="productos" className="py-32 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold italic mb-4">Soluciones Integrales</h2>
              <p className="text-gray-400 font-light tracking-widest uppercase text-xs">Arquitectura y Estrategia</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {[
                { 
                  t: "Arquitectura de Datos", 
                  d: "Procesos ETL, extracción y estructuración eficiente para la creación de bases madre robustas." 
                },
                { 
                  t: "Gestión de OKRs & KPIs", 
                  d: "Identificación y seguimiento de métricas clave alineadas 100% a sus objetivos estratégicos." 
                },
                { 
                  t: "Herramientas a Medida", 
                  d: "Dashboards dinámicos y visualización automatizada de variables clave en tiempo real." 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-12 hover:bg-blue-600 group transition-all duration-700">
                  <span className="text-blue-600 group-hover:text-white font-mono text-sm block mb-8">0{i+1}.</span>
                  <h4 className="text-2xl font-bold mb-6 group-hover:text-white transition-colors">{item.t}</h4>
                  <p className="text-gray-500 group-hover:text-blue-100 leading-relaxed transition-colors">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 4: METODOLOGÍA --- */}
        <section className="py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <h2 className="text-4xl font-bold max-w-md">Metodología de trabajo enfocada en resultados.</h2>
                <p className="text-gray-400 text-sm max-w-sm uppercase tracking-widest">Acompañamiento continuo en cada etapa del diagnóstico.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {[
                  { n: "Relevamiento", c: "Identificación de procesos y responsables clave." },
                  { n: "Diagnóstico", c: "Detección de limitantes y oportunidades de mejora." },
                  { n: "Objetivos", c: "Alineación de etapas con las metas del negocio." },
                  { n: "Capacitación", c: "Garantía de autonomía y crecimiento sostenible." }
                ].map((step, i) => (
                  <div key={i} className="space-y-4">
                    <div className="text-blue-600 font-bold text-xl italic">/0{i+1}</div>
                    <h5 className="font-bold text-lg uppercase tracking-tighter">{step.n}</h5>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.c}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-20 bg-white text-center border-t border-gray-100">
          <Image src="/logo ich (1).svg" alt="ICH Logo" width={60} height={30} className="mx-auto mb-8 opacity-50" />
          <p className="text-[10px] tracking-[0.5em] text-gray-300 uppercase font-bold">
            info@ichdatos.com.ar • Córdoba, Argentina
          </p>
        </footer>

      </div>
    </>
  );
}