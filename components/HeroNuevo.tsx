// components/HeroNuevo.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Gift, Calendar } from "lucide-react";

/**
 * HeroNuevo:
 * Sección inicial con animación de "ForeverUs",
 * fondo romántico aleatorio y acceso directo a secciones clave.
 */
const HeroNuevo = () => {
  // 🎲 Selecciona una imagen de fondo aleatoria al cargar
  const backgroundImage = useMemo(() => {
    const images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg"];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* 🔳 Fondo oscuro sobre imagen para legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* 🧠 Contenido principal animado */}
      <div className="relative z-10 max-w-3xl">
        <motion.a
          href="#home"
          className="text-6xl md:text-7xl font-extrabold text-pink-400 tracking-tight flex justify-center mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {"ForeverUs".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.a>

        <motion.p
          className="text-xl md:text-2xl mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Hacemos del amor un momento sublime
        </motion.p>

        <motion.a
          href="#services"
          className="inline-block bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-pink-100 transition"
          whileHover={{ scale: 1.05 }}
        >
          Ver servicios
        </motion.a>
      </div>

      {/* 🌟 Servicios clicables */}
      <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-white">
        <a href="#experiencias" className="flex flex-col items-center hover:text-pink-300 transition">
          <Heart className="w-8 h-8 mb-2" />
          <span className="font-semibold">Experiencias románticas</span>
        </a>
        <a href="#detalles" className="flex flex-col items-center hover:text-pink-300 transition">
          <Gift className="w-8 h-8 mb-2" />
          <span className="font-semibold">Detalles únicos</span>
        </a>
        <a href="#eventos" className="flex flex-col items-center hover:text-pink-300 transition">
          <Calendar className="w-8 h-8 mb-2" />
          <span className="font-semibold">Eventos a la medida</span>
        </a>
      </div>
    </section>
  );
};

export default HeroNuevo;
