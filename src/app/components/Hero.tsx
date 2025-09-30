"use client";

import Image from "next/image";

export default function Hero() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) alert("Cita agendada correctamente");
    else alert("Error al agendar cita");
  };

  return (
    <div className="container">

      {/* Columna izquierda */}
      <div className="column left">
        <div className="column-df">
          <h1 className="branh1">¿QUIÉNES SOMOS?</h1>
          <p>
            Somos una startup dedicada a la gestión integral de datos e información.
          </p>
          <p>
            Nuestra misión se centra en actuar como facilitadores de herramientas
            que le permitan a nuestros clientes contar con la mejor calidad de 
            información para decidir con fundamentos el futuro de su negocio.
          </p>
        </div>
        <div className="column-image">
          <Image src="/brochure_2.jpg" alt="ICH Monitores" width={600} height={250} className="faded-image"/>
        </div>
      </div>

      {/* Columna central */}
      <div className="column center">
        <ul>
          <form
            onSubmit={handleSubmit}
            className="contform"
          >
            <input type="text" name="nombre" placeholder="Nombre" required />
            <input type="celular" name="empresa" placeholder="Empresa" required />
            <input type="email" name="email" placeholder="Correo" required />
            <input type="celular" name="celular" placeholder="Teléfono" required />
            <input type="datetime-local" name="fecha" required />
            <textarea name="comentarios" placeholder="Comentarios"></textarea>
            <button type="submit">
              AGENDAR CITA
            </button>
          </form>
        </ul>
      </div>

      {/* Columna derecha */}
      <div className="column right">
        <div className="branding">
          <h2 className="faded-titulos">
            TRANSFORMÁ<br />TUS DATOS EN<br />INFORMACIÓN
          </h2>
          <Image src="/br_logo.jpg" alt="ICH Logo" width={350} height={350} className="faded-image2"/>
          <h3 className="faded-titulos">
            GESTIONÁ DE<br />MANERA<br />INTELIGENTE
          </h3>
        </div>
      </div>

    </div>
  );
}
