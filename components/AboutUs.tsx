// components/AboutUs.tsx

import { motion } from "framer-motion";

/**
 * Componente AboutUs:
 * Muestra una sección informativa con mensaje emocional, misión y visión.
 */
const AboutUs = () => {
  return (
    <section id="aboutus" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* 🧠 Título principal */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sobre Nosotros
        </motion.h2>

        {/* 💡 Texto emocional con animación suave */}
        <motion.p
          className="text-lg text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          En <span className="font-semibold text-pink-600">ForeverUs</span> creemos que cada instante puede transformarse en un recuerdo eterno. Nuestro equipo de expertos en experiencias personalizadas se dedica a crear momentos únicos, románticos e inolvidables, hechos a la medida de quienes más amas.
        </motion.p>

        {/* 🎯 Misión */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <h3 className="text-xl font-semibold text-pink-600 mb-2">Nuestra Misión</h3>
          <p className="text-gray-700">
            Crear experiencias personalizadas que celebren el amor y fortalezcan los lazos emocionales entre personas, mediante eventos y detalles únicos que dejen huella.
          </p>
        </motion.div>

        {/* 🌟 Visión */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-pink-600 mb-2">Nuestra Visión</h3>
          <p className="text-gray-700">
            Ser la marca referente en la creación de recuerdos memorables, reconocida por conectar emociones con experiencias que trascienden el tiempo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
