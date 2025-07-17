// components/Navbar.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Componente Navbar:
 * Muestra una barra de navegación fija en la parte superior que se oculta al hacer scroll hacia abajo
 * y aparece nuevamente al hacer scroll hacia arriba.
 * Incluye navegación para escritorio y menú hamburguesa para móviles.
 */
const Navbar = () => {
  // Estado para mostrar u ocultar la navbar según el scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Estado para abrir/cerrar el menú hamburguesa en modo móvil
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect para detectar el scroll y alternar visibilidad de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // ocultar si hace scroll hacia abajo
      } else {
        setShowNavbar(true); // mostrar si hace scroll hacia arriba
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* 🚀 Navbar fijo con animación de entrada/salida */}
      <nav
        className={`h-16 bg-white shadow-md fixed w-full z-50 transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          
          {/* 🎨 Logo animado letra por letra con Framer Motion */}
          <motion.a
            href="#home"
            key={showNavbar.toString()}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="text-2xl font-bold text-pink-600 flex"
          >
            {"Forever".split("").map((char, i) => (
              <motion.span
                key={`forever-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            {"Us".split("").map((char, i) => (
              <motion.span
                key={`us-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.a>

          {/* 🖱️ Navegación para escritorio con animación de subrayado */}
          <div className="space-x-4 hidden md:flex">
            {["Sobre nosotros", "Servicios", "Contacto"].map((label, idx) => {
              const href = ["#about", "#services", "#contact"][idx];
              return (
                <a
                  key={label}
                  href={href}
                  className="relative group text-gray-700 hover:text-pink-600"
                >
                  {label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
                </a>
              );
            })}
          </div>

          {/* 📱 Botón hamburguesa visible solo en dispositivos móviles */}
          <div className="md:hidden flex items-center h-full">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none text-3xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 📋 Menú móvil que aparece al tocar el botón hamburguesa */}
        {menuOpen && (
          <div className="flex flex-col mt-2 space-y-2 px-4 pb-4 md:hidden bg-white bg-opacity-95 shadow-md rounded-b-md">
            {["Sobre nosotros", "Servicios", "Contacto"].map((label, idx) => {
              const href = ["#about", "#services", "#contact"][idx];
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-pink-600"
                >
                  {label}
                </a>
              );
            })}
          </div>
        )}
      </nav>

      {/* 🛑 Espaciador para que el navbar no cubra el contenido al inicio */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
