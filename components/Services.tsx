// components/Services.tsx

import { motion } from "framer-motion";
import { Heart, Gift, Calendar } from "lucide-react"; // 🎨 Íconos de ejemplo

/**
 * Componente Services:
 * Muestra una sección con servicios destacados en un grid animado.
 * Cada servicio incluye ícono, título, descripción y CTA.
 */
const Services = () => {
  // 👉 Aquí puedes ampliar los servicios como un array para hacerlo dinámico
  const services = [
    {
      icon: <Heart className="w-10 h-10 text-pink-600" />,
      title: "Experiencias románticas",
      description: "Momentos inolvidables diseñados para enamorar.",
    },
    {
      icon: <Gift className="w-10 h-10 text-pink-600" />,
      title: "Detalles únicos",
      description: "Flores, obsequios y sorpresas con intención.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-pink-600" />,
      title: "Eventos a la medida",
      description: "Creamos y coordinamos experiencias personalizadas.",
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* 🎯 Título de sección */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Servicios
        </motion.h2>

        {/* ✨ Descripción introductoria */}
        <motion.p
          className="text-lg text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Diseñamos cada momento con pasión, detalle y emoción.
        </motion.p>

        {/* 🧩 Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-pink-600">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a
                href="#contact"
                className="inline-block text-pink-600 hover:text-pink-700 font-medium"
              >
                Conocer más →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
