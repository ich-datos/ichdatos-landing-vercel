import Image from "next/image";

export default function Hero() {
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
          <Image src="/brochure_1.jpg" alt="ICH Monitores" width={600} height={250} className="faded-image"/>
        </div>
      </div>

      {/* Columna central */}
      <div className="column center">
        <h2>CONTACTO</h2>
        <ul>
          <li>351 1234567</li>
          <li>info@ichdatos.com.ar</li>
          <li>🌐 <a href="https://www.ichdatos.com.ar">www.ichdatos.com.ar</a></li>
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
