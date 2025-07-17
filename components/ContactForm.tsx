// components/ContactForm.tsx

import { useState } from "react";
import { z } from "zod"; // 👉 Importa Zod

// 👉 Define el esquema de validación
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico no válido"),
  celular: z
    .string()
    .regex(/^\d{8,15}$/, "El número debe tener entre 8 y 15 dígitos"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});


/**
 * Componente ContactForm:
 * Muestra un formulario de contacto con validación HTML5.
 * Envía datos a una ruta API y muestra mensajes de estado.
 */
const ContactForm = () => {
  // 👉 Estado para guardar los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    celular: "",
  });

  // 👉 Estado para mostrar el estado del envío (éxito o error)
  const [status, setStatus] = useState("");

  // 👉 Actualiza los valores del formulario al escribir
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 👉 Envía los datos al backend usando fetch
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
	
	// 👉 Validar datos con Zod
	const result = contactSchema.safeParse(formData);

	if (!result.success) {
	  // 👉 Mostrar errores en consola por ahora (más adelante los mostramos en pantalla)
	  console.error(result.error.format());
	  setStatus("Por favor revisa los campos marcados.");
	  return;
	}

	
    setStatus("Enviando...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setStatus("¡Mensaje enviado con éxito!");
      setFormData({ name: "", email: "", message: "", celular: "" });
    } catch (error) {
      console.error(error);
      setStatus("Ocurrió un error al enviar.");
    }
  };

  return (
    <section id="contact" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Contáctanos
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.name}
              onChange={handleChange}
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
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
              Celular
            </label>
            <input
              type="tel"
              name="celular"
              id="celular"
              pattern="[0-9]{8,15}"
              title="Ingresa entre 8 y 15 dígitos sin espacios"
              placeholder="Ej. 5544332211"
              required
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.celular}
              onChange={handleChange}
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
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.message}
              onChange={handleChange}
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

        {/* 🟡 Mensaje de estado dinámico (éxito o error) */}
        {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
