"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AgendarPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Aquí es donde llamamos al archivo route.ts que ya tienes
    const res = await fetch("/api/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Cita agendada correctamente. Nos comunicaremos a la brevedad.");
      router.push("/"); // Vuelve al inicio tras el éxito
    } else {
      alert("Error al agendar cita. Intente nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center mb-10">
           <Image src="/logo ich (1).svg" alt="ICH Logo" width={100} height={100} className="mb-6" />
           <h2 className="text-3xl font-light tracking-tighter text-gray-900">AGENDAR <span className="font-bold text-blue-600">CITA</span></h2>
           <p className="text-gray-400 text-sm mt-2">Complete los datos para la sesión estratégica.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-gray-800" type="text" name="nombre" placeholder="Nombre completo" required />
            <input className="w-full border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-gray-800" type="text" name="empresa" placeholder="Empresa" required />
            <input className="w-full border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-gray-800" type="email" name="email" placeholder="Correo corporativo" required />
            <input className="w-full border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-gray-800" type="tel" name="celular" placeholder="Teléfono de contacto" required />
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Fecha y hora preferida</label>
              <input className="w-full border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-gray-500" type="datetime-local" name="fecha" required />
            </div>
            <textarea className="w-full border border-gray-100 p-3 rounded-sm h-24 outline-none focus:border-blue-600 transition-colors text-gray-800 bg-gray-50" name="comentarios" placeholder="Breve descripción de su necesidad..."></textarea>
            
            <button className="w-full bg-blue-600 text-white font-bold py-5 mt-6 rounded-full hover:bg-black transition-all duration-500 tracking-[0.2em] text-xs shadow-xl" type="submit">
              ENVIAR SOLICITUD
            </button>
        </form>

        <button onClick={() => router.push("/")} className="w-full mt-8 text-gray-400 text-[10px] tracking-[0.3em] uppercase hover:text-blue-600 transition-colors">
          ← Volver al portal
        </button>
      </div>
    </div>
  );
}