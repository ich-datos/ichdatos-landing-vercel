"use client"; // Necesario para interacciones y animaciones en el App Router

import DemoCard from "./components/DemoCard";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Encabezado minimalista estilo ICH */}
        <header className="py-16 mb-12 border-b border-neutral-800">
          <h1 className="text-8xl text-blue-500 font-black">ICH</h1>
          <p className="text-neutral-400 mt-4 text-lg max-w-2xl">
            Hub de demos y soluciones de datos. Transformamos información en decisiones estratégicas.
          </p>
        </header>

        {/* Sección de Demos con Grilla Correcta */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DemoCard 
              title="Análisis Predictivo" 
              description="Visualización de tendencias futuras utilizando modelos avanzados de Machine Learning."
              tag="Data Science"
            />
            <DemoCard 
              title="Dashboard Comercial" 
              description="Panel de control interactivo con métricas críticas de negocio actualizadas en tiempo real."
              tag="Business Intelligence"
            />
            <DemoCard 
              title="Automatización ETL" 
              description="Pipelines de datos robustos para la extracción, transformación y carga de datos eficiente."
              tag="Engineering"
            />
          </div>
        </section>

        {/* CTA de Citas con estilo profesional */}
        <section className="mt-32 mb-20 p-12 bg-neutral-900/50 rounded-3xl border border-neutral-800 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">¿Necesitás una solución a medida?</h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            Agendá una breve reunión para que analicemos cómo podemos potenciar tus datos.
          </p>
          <button 
            onClick={() => window.location.href = 'mailto:hola@ichdatos.com.ar'} // O el link de tu agenda
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
          >
            Agendar Cita
          </button>
        </section>

      </main>

      {/* Footer Minimalista */}
      <footer className="py-8 border-t border-neutral-900 text-center text-neutral-600 text-sm">
        © {new Date().getFullYear()} ICH DATOS. Todos los derechos reservados.
      </footer>
    </div>
  );
}