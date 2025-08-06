// components/AboutUs.tsx

import { motion } from "framer-motion";
import { Heart, Sparkles, Handshake, Flame, ShieldCheck, Star } from "lucide-react"; // ✨ Iconos desde lucide-react

/**
 * Componente AboutUs:
 * Muestra una sección informativa con mensaje emocional, misión, visión y valores.
 */
const AboutUs = () => {
  const valores = [
    {
      title: "Empatía",
      desc: "Nos ponemos en el lugar de nuestros clientes para entender sus emociones y necesidades.",
      icon: Heart
    },
    {
      title: "Creatividad",
      desc: "Diseñamos momentos con originalidad y belleza para sorprender y emocionar.",
      icon: Sparkles
    },
    {
      title: "Compromiso",
      desc: "Nos dedicamos a cada detalle como si fuera el más importante.",
      icon: Handshake
    },
    {
      title: "Pasión",
      desc: "Hacemos todo con amor, porque creemos que es la fuerza que transforma.",
      icon: Flame
    },
    {
      title: "Confianza",
      desc: "Creamos relaciones basadas en la transparencia y el respeto.",
      icon: ShieldCheck
    },
    {
      title: "Excelencia",
      desc: "Buscamos superar expectativas con cada experiencia.",
      icon: Star
    }
  ];

  return (
    <section id="aboutus" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* 🧠 Título principal */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sobre Nosotros
        </motion.h2>

        {/* 💡 Texto emocional */}
        <motion.p
          className="text-lg text-gray-700 leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          En <span className="font-semibold text-pink-600">ForeverUs</span> creemos que cada instante puede transformarse en un recuerdo eterno. Nuestro equipo de expertos en experiencias personalizadas se dedica a crear momentos únicos, románticos e inolvidables.
        </motion.p>

        {/* 🎯 Misión y Visión en grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Nuestra Misión</h3>
            <p className="text-gray-700">
              Crear experiencias personalizadas que celebren el amor y fortalezcan los lazos emocionales entre personas, mediante eventos y detalles únicos que dejen huella.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Nuestra Visión</h3>
            <p className="text-gray-700">
              Ser la marca referente en la creación de recuerdos memorables, reconocida por conectar emociones con experiencias que trascienden el tiempo.
            </p>
          </motion.div>
        </div>

        {/* 🌈 Valores y Principios con íconos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-pink-600 mb-6">Nuestros Valores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {valores.map(({ title, desc, icon: Icon }, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="text-pink-600 w-5 h-5" />
                  <h4 className="text-lg font-semibold text-pink-600">{title}</h4>
                </div>
                <p className="text-gray-700 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
