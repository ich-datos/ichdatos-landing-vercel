import Image from "next/image";

export default function Hero() {
  return (
    <section className="landing">
      {/* Bloque izquierdo */}
      <div className="left">
        <div>
          <h1>¿QUIÉNES SOMOS?</h1>
          <p>Somos una startup dedicada a la gestión integral de datos e información.</p>
          <p>Nuestra misión es actuar como facilitadores de herramientas que permitan a nuestros clientes contar con la mejor calidad de información para decidir con fundamentos el futuro de su negocio.</p>
        </div>
        <Image src="/brochure_1.png" alt="Icono monitores" width={100} height={100} />
      </div>

      {/* Bloque central */}
      <div className="center">
        <h2>CONTACTO</h2>
        <p>Tel: 351</p>
        <p>Email: info@ichdatos.com.ar</p>
        <p><a href="https://www.ichdatos.com.ar" target="_blank" rel="noreferrer">www.ichdatos.com.ar</a></p>
      </div>

      {/* Bloque derecho */}
      <div className="right">
        <h1>TRANSFORMÁ TUS DATOS EN INFORMACIÓN</h1>
        <Image src="/br_logo.png" alt="Logo ICH" width={80} height={80} />
        <h2>GESTIONÁ DE MANERA INTELIGENTE</h2>
      </div>
    </section>
  );
}
