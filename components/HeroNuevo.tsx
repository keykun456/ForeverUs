// components/HeroNuevo.tsx

import { useEffect, useState } from "react";
import { Heart, Gift, Calendar } from "lucide-react";
import { useRouter } from "next/router";

// ✅ Componente personalizado de Botón con estilo elegante
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="border border-white text-white font-medium px-6 py-2 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 transition shadow"
    {...props}
  >
    {children}
  </button>
);

// 👉 Lista de imágenes que se usarán como fondo
const images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg"];

export default function HeroNuevo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // 🔄 Solo hacer scroll al inicio si no hay hash en la URL
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [router.asPath]);

  // 🎲 Elegir una imagen aleatoria solo en cliente (después de montar)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  }, []);

  return (
    <section
      // 📏 Ajuste de altura para evitar solapamiento con la navbar fija
      className="relative w-full min-h-[calc(100vh-4rem)] bg-cover bg-center flex flex-col justify-between text-white px-4 pt-4 pb-28"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      {/* 🔲 Capa oscura encima de la imagen para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🌟 Contenido centrado con título, subtítulo y botón */}
      <div className="relative z-10 text-center mt-20 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">ForeverUs</h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow-md">Hacemos del amor un momento sublime</p>
        <div className="mt-6">
          <Button>Ver servicios</Button>
        </div>
      </div>

      {/* 🎯 Botones de servicios en grid responsiva con navegación */}
      <div className="relative z-10 grid grid-cols-3 gap-3 w-full max-w-3xl text-center mx-auto">
        <ServiceIcon icon={<Heart size={40} />} label={"Experiencias\nrománticas"} href="#services" />
        <ServiceIcon icon={<Gift size={40} />} label={"Detalles\núnicos"} href="#services" />
        <ServiceIcon icon={<Calendar size={40} />} label={"Eventos a la\nmedida"} href="#contact" />
      </div>
    </section>
  );
}

// 🔧 Componente reutilizable como botón animado para íconos con etiquetas y navegación
function ServiceIcon({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <button
      onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })} // 🧭 Scroll suave a la sección correspondiente
      className="flex flex-col items-center justify-center text-white hover:bg-white/10 active:bg-white/20 p-4 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-pink-400"
    >
      {icon}
      <span className="mt-2 text-sm md:text-lg leading-snug whitespace-pre-line drop-shadow-md text-center">
        {label}
      </span>
    </button>
  );
}
