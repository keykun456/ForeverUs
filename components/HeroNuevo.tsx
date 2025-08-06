// components/HeroNuevo.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Calendar } from "lucide-react";

// 👉 Lista de rutas de las imágenes que rotarán
const images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg"];

export default function HeroNuevo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 🔄 índice de la imagen actual

  // 🔁 Cambia la imagen cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 6000 ms = 6 segundos

    return () => clearInterval(interval); // 🧼 Limpia el intervalo al desmontar
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-end items-center text-white p-4"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }} // 🎯 Fondo dinámico
    >
      {/* 🔲 Capa oscura encima de la imagen para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🧠 Contenido principal: título, subtítulo y botón */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-5xl font-bold text-pink-400 animate-pulse">ForeverUs</h1>
        <p className="mt-4 text-lg md:text-xl">Hacemos del amor un momento sublime</p>
        <Button className="mt-6 text-lg px-6 py-2">Ver servicios</Button>
      </div>

      {/* ❤️ Íconos de servicios alineados en columnas */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 w-full max-w-4xl text-center">
        <ServiceIcon icon={<Heart size={32} />} label="Experiencias románticas" />
        <ServiceIcon icon={<Gift size={32} />} label="Detalles únicos" />
        <ServiceIcon icon={<Calendar size={32} />} label="Eventos a la medida" />
      </div>
    </section>
  );
}

// ✅ Componente reutilizable para cada ícono con texto
function ServiceIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      {icon}
      <span className="mt-2 text-sm md:text-base">{label}</span>
    </div>
  );
}


export default HeroNuevo;
