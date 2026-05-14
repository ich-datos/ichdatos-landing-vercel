"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Ichtorias() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Reemplaza esto con tu correo real de ICH
  const MY_EMAIL = "francisco@ichdatos.com.ar"; 

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${MY_EMAIL}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Hubo un error al enviar. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <nav className="p-4 md:px-16 flex justify-between items-center border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <Image src="/logo ich (1).svg" alt="ICH" width={85} height={42} className="cursor-pointer" onClick={() => router.push('/')} />
        <button onClick={() => router.push('/')} className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-blue-600">Volver al Inicio</button>
      </nav>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className="text-center mb-12">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-6 uppercase italic">ICHTORIAS</h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light italic">
                  "Todos tenemos anécdotas que surgen en el manejo de datos... Contanos la tuya <br />
                  <span className="text-blue-600 font-normal">Las cinco mejores recibirán un diagnóstico bonificado.</span>"
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                {/* Configuraciones de FormSubmit (Invisibles para el usuario) */}
                <input type="hidden" name="_subject" value="¡Nueva ICHtoria recibida!" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nombre y Apellido *</label>
                    <input name="Nombre" required type="text" className="bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Empresa *</label>
                    <input name="Empresa" required type="text" className="bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Correo Electrónico *</label>
                    <input name="Email" required type="email" className="bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Celular *</label>
                    <input name="Celular" required type="tel" className="bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 mb-10">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tu ICHtoria *</label>
                  <textarea name="Historia" required rows={6} className="bg-slate-50 border-none rounded-[2rem] p-6 outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
                </div>

                <button disabled={isSending} type="submit" className={`w-full ${isSending ? 'bg-slate-400' : 'bg-blue-600'} text-white font-bold tracking-widest py-5 rounded-full uppercase text-xs transition-all`}>
                  {isSending ? "Enviando..." : "Enviar mi ICHtoria"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white rounded-[4rem] shadow-xl border border-blue-50">
              <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">✓</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 uppercase italic">¡Recibida!</h2>
              <p className="text-slate-500 text-lg max-w-sm mx-auto">Gracias por compartir tu ICHtoria. Te contactaremos pronto.</p>
              <button onClick={() => router.push('/')} className="mt-10 text-blue-600 font-bold uppercase text-[10px] tracking-widest">Volver al Home</button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}