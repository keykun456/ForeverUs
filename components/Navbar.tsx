// components/Navbar.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✨ Importamos AnimatePresence para animación condicional

/**
 * Componente Navbar:
 * Muestra una barra de navegación fija que desaparece al hacer scroll hacia abajo.
 * Incluye navegación para escritorio y menú móvil tipo overlay animado.
 */
const Navbar = () => {
  // 👉 Control de visibilidad según el scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 👉 Control del menú móvil
  const [menuOpen, setMenuOpen] = useState(false);

  // 🎯 Efecto para ocultar la navbar al hacer scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ❌ Bloquea el scroll del fondo cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      {/* 🚀 Barra de navegación fija con animación */}
      <nav
        className={`h-16 bg-white shadow-md fixed w-full z-50 transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* 🎨 Logo animado letra por letra */}
          <motion.a
            href="#home"
            key={showNavbar.toString()}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
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

          {/* 🖱️ Navegación escritorio */}
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

          {/* 📱 Botón hamburguesa */}
          <div className="md:hidden flex items-center h-full">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none text-3xl"
              aria-label="Abrir menú móvil"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 📱 Menú móvil tipo overlay con animación */}
		<AnimatePresence>
		  {menuOpen && (
			<motion.div
			  initial={{ opacity: 0, scale: 0.98 }}
			  animate={{ opacity: 1, scale: 1 }}
			  exit={{ opacity: 0, scale: 0.95 }}
			  transition={{ duration: 0.3 }}
			  // 🎯 Fondo sólido, sin transparencia y z-index muy alto
			  className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center space-y-8 px-6 py-12 md:hidden"
			>
			  {/* ❌ Botón cerrar menú */}
			  <button
				onClick={() => setMenuOpen(false)}
				className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-pink-600"
				aria-label="Cerrar menú"
			  >
				&times;
			  </button>

			  {/* 📋 Enlaces del menú, ahora bien visibles */}
			  {["Sobre nosotros", "Servicios", "Contacto"].map((label, idx) => {
				const href = ["#about", "#services", "#contact"][idx];
				return (
				  <a
					key={label}
					href={href}
					onClick={() => setMenuOpen(false)}
					className="text-2xl font-semibold text-gray-900 hover:text-pink-600 transition"
				  >
					{label}
				  </a>
				);
			  })}
			</motion.div>
		  )}
		</AnimatePresence>

		
		
		
      </nav>

      {/* 🧱 Espaciador para compensar navbar fija */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
