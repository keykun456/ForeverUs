// components/HeroNuevo.tsx
import { useEffect, useState } from "react";
import { Heart, Gift, Calendar } from "lucide-react";

// ✅ Componente personalizado de Botón sin dependencia externa
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="bg-white text-black font-medium px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
    {...props}
  >
    {children}
  </button>
);

// 👉 Lista de imágenes que se usarán como fondo (rotación solo al cargar)
const images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg"];

export default function HeroNuevo() {
  // 🔢 Escoge una imagen aleatoria solo una vez al cargar
  const [currentImageIndex] = useState(() => Math.floor(Math.random() * images.length));

  // 🔄 Siempre vuelve al inicio (top de la página) al recargar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-end items-center text-white p-4"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }} // 🎯 Aplica la imagen actual como fondo
    >
      {/* 🔲 Capa oscura encima de la imagen para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🌟 Contenido centrado con título, subtítulo y botón */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-bold text-pink-400 animate-pulse">ForeverUs</h1>
        <p className="mt-4 text-lg md:text-xl">Hacemos del amor un momento sublime</p>
        <Button className="mt-6 text-lg px-6 py-2">Ver servicios</Button>
      </div>

      {/* 🎯 Íconos de servicios en grid responsiva */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 w-full max-w-4xl text-center">
        <ServiceIcon icon={<Heart size={32} />} label="Experiencias románticas" />
        <ServiceIcon icon={<Gift size={32} />} label="Detalles únicos" />
        <ServiceIcon icon={<Calendar size={32} />} label="Eventos a la medida" />
      </div>
    </section>
  );
}

// 🔧 Componente reutilizable para mostrar íconos con etiquetas
function ServiceIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      {icon}
      <span className="mt-2 text-sm md:text-base">{label}</span>
    </div>
  );
}

