import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  // 👉 Estado del formulario
  const [formData, setFormData] = useState<{ 
    name: string; 
    email: string; 
    message: string;
    celular: string; // nuevo campo celular
  }>({
    name: "", email: "", message: "", celular: ""
  });

  // 👉 Estado para mensaje de éxito o error tras enviar
  const [status, setStatus] = useState("");

  // 👉 Estado para ocultar o mostrar navbar con scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 👉 Estado para abrir/cerrar menú hamburguesa en móvil
  const [menuOpen, setMenuOpen] = useState(false);

  // 👉 useEffect: detecta scroll para mostrar/ocultar navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // si bajamos, oculta
      } else {
        setShowNavbar(true); // si subimos, muestra
      }
      setLastScrollY(window.scrollY); // actualiza referencia
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 👉 Manejador para actualizar inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 👉 Manejador para enviar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Enviando...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Algo salió mal");
      setStatus("¡Mensaje enviado con éxito!");
      setFormData({ name: "", email: "", message: "", celular: "" });
    } catch (error) {
      console.error(error);
      setStatus("Error al enviar el mensaje.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      

	{/* 🚀 Navbar fijo, oculto al bajar, visible al subir */}
	<nav 
	  className={`
		bg-white/70 backdrop-blur-md border-b border-white/30 
		fixed w-full z-50 
		transition-transform duration-500 
		${showNavbar ? 'translate-y-0' : '-translate-y-full'}
	  `}
	>
	  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
		
		{/* Logo */}
		<div className="text-2xl font-bold text-pink-600">ForeverUs</div>
		
		{/* Links desktop con subrayado animado */}
		<div className="space-x-4 hidden md:flex">
		  <a href="#about" className="relative group text-gray-700 hover:text-pink-600">
			Sobre nosotros
			<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
		  </a>
		  <a href="#services" className="relative group text-gray-700 hover:text-pink-600">
			Servicios
			<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
		  </a>
		  <a href="#contact" className="relative group text-gray-700 hover:text-pink-600">
			Contacto
			<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
		  </a>
		</div>

		{/* Botón ☰ visible solo en móvil */}
		<div className="md:hidden">
		  <button 
			onClick={() => setMenuOpen(!menuOpen)} 
			className="text-gray-700 hover:text-pink-600 focus:outline-none text-3xl"
		  >
			☰
		  </button>
		</div>
	  </div>

	  {/* Menú desplegable mobile */}
	  {menuOpen && (
		<div className="flex flex-col mt-4 space-y-2 px-4 pb-4 md:hidden">
		  <a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Sobre nosotros</a>
		  <a href="#services" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Servicios</a>
		  <a href="#contact" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-600">Contacto</a>
		</div>
	  )}
	</nav>


      {/* Offset para que el navbar fijo no tape contenido */}
      <div className="pt-20"></div>

      {/* 🎉 Hero principal con animaciones */}
      <main className="flex flex-1 min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-6 text-center"
        >
          ¡Bienvenido a mi sitio Marce Diaz! 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl text-center text-gray-200 mb-8"
        >
          Aquí podrás conocer nuestros servicios y contactar para más información.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="#contact"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
        >
          ¡Contáctanos!
        </motion.a>
      </main>

      {/* 📝 Sección del formulario */}
      <section id="contact" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Contáctanos
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text" name="name" id="name" required
                className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.name} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email" name="email" id="email" required
                className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.email} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Celular</label>
              <input
                type="tel" name="celular" id="celular"
                pattern="[0-9]{8,15}" title="Ingresa entre 8 y 15 dígitos sin espacios"
                placeholder="Ej. 5544332211" required
                className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.celular} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                name="message" id="message" rows={4} required
                className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                value={formData.message} onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 border shadow-sm text-lg font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
          {/* Mensaje dinámico con resultado */}
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </div>
      </section>
    </div>
  );
}
