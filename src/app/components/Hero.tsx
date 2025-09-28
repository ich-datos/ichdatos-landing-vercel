import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex v-screen">

      {/* Sección izquierda: Quienes somos */}
      <div className="flex flex-col justify-between bg-gray-800 text-white p-10 w-1/3">
        <div>
          <h2 className="text-3xl font-bold mb-6">¿QUIÉNES SOMOS?</h2>
          <p className="mb-4">
            Somos una startup dedicada a la gestión integral de datos e información.
          </p>
          <p>
            Nuestra misión se centra en actuar como facilitadores de herramientas
            que le permitan a nuestros clientes contar con la mejor calidad de 
            información para decidir con fundamentos el futuro de su negocio.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <Image 
            src="/brochure_1.jpg" 
            alt="ICH Monitores" 
            width={250} 
            height={200} 
            className="object-contain"
          />
        </div>
      </div>

      {/* Sección central: Contacto */}
      <div className="flex flex-col justify-center items-center bg-blue-600 text-white p-10 w-1/3">
        <h2 className="text-3xl font-bold mb-6">CONTACTO</h2>
        <ul className="space-y-3 text-lg text-center">
          <li>📞 351</li>
          <li>📧 info@ichdatos.com.ar</li>
          <li>
            🌐 <a href="https://www.ichdatos.com.ar" className="underline">www.ichdatos.com.ar</a>
          </li>
        </ul>
      </div>

      {/* Sección derecha: Branding */}
      <div className="flex flex-col justify-center items-center bg-gray-100 text-gray-800 p-10 w-1/3">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6 leading-tight">
            TRANSFORMÁ<br />TUS DATOS EN<br />INFORMACIÓN
          </h2>
          <Image 
            src="/br_logo.jpg" 
            alt="ICH Logo" 
            width={160} 
            height={160} 
            className="mx-auto my-10"
          />
          <h3 className="text-3xl font-bold leading-tight">
            GESTIONÁ DE<br />MANERA<br />INTELIGENTE
          </h3>
        </div>
      </div>

    </div>
  );
}
