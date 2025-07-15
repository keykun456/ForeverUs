import { motion } from "framer-motion";

export default function Home() {

  // Este componente muestra la página principal

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-600">ForeverUs</div>
          <div className="space-x-4 hidden md:block">
            <a href="#about" className="text-gray-700 hover:text-pink-600">Sobre nosotros</a>
            <a href="#services" className="text-gray-700 hover:text-pink-600">Servicios</a>
            <a href="#contact" className="text-gray-700 hover:text-pink-600">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Tu diseño actual */}
      <main className="flex flex-1 min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-6 text-center"
        >
          ¡Bienvenido a mi sitio Marce Diaz¡¡ 🚀!
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
          href="#"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
        >
          ¡Contáctanos!
        </motion.a>
      </main>



{/* Sección del formulario de contacto */}

  <section id="contact" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Contáctanos
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </section>




    </div>
  );
}
