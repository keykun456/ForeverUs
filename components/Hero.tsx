// components/Hero.tsx

import { motion } from "framer-motion";

/**
 * Componente Hero:
 * Muestra el título animado "ForeverUs", subtítulo y botón de llamada a la acción
 * con estilos llamativos y animaciones suaves.
 */
const Hero = () => {
  return (
    <main className="flex flex-1 min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8 space-y-6">

      {/* ✨ Título principal animado letra por letra */}
      <a
        href="#home"
        className="text-6xl md:text-7xl font-extrabold text-pink-400 tracking-tight flex space-x-1 hover:text-pink-300 transition-colors duration-300"
        aria-label="Ir al inicio"
      >
        {"ForeverUs".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </a>

      {/* 🖋️ Subtítulo debajo del título */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        Hacemos del amor un momento sublime
      </motion.h2>

      {/* 💬 Frase descriptiva más pequeña */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl text-center text-gray-200 mb-8"
      >
        Momentos que se vuelven memorias inolvidables
      </motion.p>

      {/* 📞 Botón de llamada a la acción para ir a la sección de contacto */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        href="#contact"
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
      >
        ¡Contáctanos!
      </motion.a>
    </main>
  );
};

export default Hero;
