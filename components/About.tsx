// components/About.tsx

import { motion } from "framer-motion";

/**
 * Componente About:
 * Muestra una sección informativa con mensaje emocional e identidad clara.
 */
const About = () => {
  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
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
          className="text-lg text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          En <span className="font-semibold text-pink-600">ForeverUs</span> creemos que cada instante puede transformarse en un recuerdo eterno. Nuestro equipo de expertos en experiencias personalizadas se dedica a crear momentos únicos, románticos e inolvidables, hechos a la medida de quienes más amas.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
