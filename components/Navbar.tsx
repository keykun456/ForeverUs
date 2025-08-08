// components/Navbar.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✨ Animaciones suaves con framer-motion

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

  // 🎯 Oculta la navbar al hacer scroll hacia abajo, la muestra si se sube o si está arriba
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY - lastScrollY > 10) {
        setShowNavbar(false);
      } else if (lastScrollY - window.scrollY > 10 || window.scrollY < 20) {
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

  // 🔁 Scroll al top si no hay hash en la URL (evita carga en anchors)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // 🧼 Corrige comportamiento en móviles con anchors activos tras reload
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && window.location.hash) {
      window.scrollTo(0, 0);
      history.replaceState(null, "", window.location.pathname); // 🔁 Limpia el hash
    }
  }, []);

  return (
    <>
      {/* 🚀 Barra de navegación fija animada */}
      <nav
        className={`h-16 bg-white shadow-md fixed w-full z-50 transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full px-6 sm:px-10 flex justify-between items-center h-16">
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
            className="text-3xl font-bold text-pink-600 flex"
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

          {/* 🖥️ Navegación de escritorio alineada a la derecha */}
          <div className="space-x-6 hidden md:flex text-[1.1rem] font-medium">
            {["Sobre nosotros", "Servicios", "Contacto"].map((label, idx) => {
              const href = ["#aboutus", "#services", "#contact"][idx];
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

          {/* 📱 Botón hamburguesa para menú móvil */}
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
      </nav>

      {/* 📱 Menú móvil tipo overlay con animación */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            // Animación de entrada/salida suave
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // Fondo sólido y diseño flexible vertical
            className="fixed inset-0 z-[999] bg-white min-h-screen overflow-y-auto flex flex-col items-center justify-start space-y-8 px-6 pt-24 pb-12 md:hidden"
          >
            {/* ❌ Botón para cerrar menú */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-pink-600"
              aria-label="Cerrar menú"
            >
              &times;
            </button>

            {/* 📋 Enlaces del menú móvil */}
            {["Sobre nosotros", "Servicios", "Contacto"].map((label, idx) => {
              const href = ["#aboutus", "#services", "#contact"][idx];
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[1.5rem] font-semibold text-gray-900 hover:text-pink-600 transition"
                >
                  {label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧱 Espaciador para compensar la altura de la navbar fija */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
