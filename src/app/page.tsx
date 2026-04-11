"use client";
import DemoCard from "./components/DemoCard";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      {/* Título Principal */}
      <header className="mb-16">
        <h1 className="text-6xl font-black tracking-tighter italic mb-4">
          ICH <span className="text-neutral-500 not-italic">DATOS</span>
        </h1>
        <p className="text-neutral-400 text-xl max-w-2xl">
          Explorá nuestras demos interactivas y soluciones de datos avanzadas.
        </p>
      </header>

      {/* La Grilla de Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DemoCard 
          tag="Machine Learning"
          title="Predicción de Churn"
          description="Modelo para identificar clientes con riesgo de abandono."
        />
        <DemoCard 
          tag="Visualización"
          title="Dashboard Financiero"
          description="Control total de ingresos y gastos en tiempo real."
        />
        <DemoCard 
          tag="Automatización"
          title="Pipeline ETL"
          description="Integración de datos automática desde múltiples fuentes."
        />
      </div>
    </main>
  );
}