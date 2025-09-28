import Image from "next/image";
import "./Hero.css"; // CSS específico para el Hero

export default function Hero() {
  return (
    <div className="hero-container">

      {/* Sección izquierda: Quienes somos */}
      <div className="column left">
        <div className="column-content">
          <h2>¿QUIÉNES SOMOS?</h2>
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
          <Image 
            src="/brochure_1.jpg" 
            alt="ICH Monitores" 
            width={250} 
            height={200}
          />
        </div>
      </div>

      {/* Sección central: Contacto */}
      <div className="column center">
        <h2>CONTACTO</h2>
        <ul>
          <li>📞 351</li>
          <li>📧 info@ichdatos.com.ar</li>
          <li>🌐 <a href="https://www.ichdatos.com.ar">www.ichdatos.com.ar</a></li>
        </ul>
      </div>

      {/* Sección derecha: Branding */}
      <div className="column right">
        <div className="branding">
          <h2>
            TRANSFORMÁ<br />TUS DATOS EN<br />INFORMACIÓN
          </h2>
          <Image 
            src="/br_logo.jpg" 
            alt="ICH Logo" 
            width={160} 
            height={160}
          />
          <h3>
            GESTIONÁ DE<br />MANERA<br />INTELIGENTE
          </h3>
        </div>
      </div>

    </div>
  );
}
