// components/ContactForm.tsx

import { useState } from "react";
import { z } from "zod"; // 👉 Importa Zod para validación robusta

// 👉 Define el esquema de validación incluyendo honeypot
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico no válido"),
  celular: z
    .string()
    .regex(/^\d{8,15}$/, "El número debe tener entre 8 y 15 dígitos"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  empresa: z.string().max(0, "Campo inválido"), // 🕵️ Honeypot: debe estar vacío
});

/**
 * Componente ContactForm:
 * Muestra un formulario de contacto con validación en tiempo real usando Zod.
 * Incluye campo honeypot para prevenir bots.
 */
const ContactForm = () => {
  // 👉 Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    celular: "",
    message: "",
    empresa: "", // 🕵️ Campo oculto para detectar bots
  });

  // 👉 Estado para errores por campo
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  // 👉 Estado del envío
  const [status, setStatus] = useState("");

  // 👉 Maneja cambios en campos con validación por campo
  const handleChange = (
	  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
	  const { name, value } = e.target;

	  // 👉 Cast explícito para que TS entienda que name es una key válida
	  const field = name as keyof typeof formData;

	  // Actualiza los datos del formulario
	  setFormData((prev) => ({
		...prev,
		[field]: value,
	  }));

	  // Validación individual con Zod
	  if (contactSchema.shape[field]) {
		const singleFieldSchema = contactSchema.shape[field];

		const result = singleFieldSchema.safeParse(value);

		if (!result.success) {
		  setErrors((prev) => ({
			...prev,
			[field]: result.error.issues[0].message,
		  }));
		} else {
		  // Elimina el error si el campo se validó correctamente
		  setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[field];
			return newErrors;
		  });
		}
	  }
	};

  // 👉 Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 👉 Validación total
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
      const zodErrors = result.error.flatten().fieldErrors;
      for (const key in zodErrors) {
        const field = key as keyof typeof formData;
        if (zodErrors[field]?.length) {
          fieldErrors[field] = zodErrors[field]![0];
        }
      }
      setErrors(fieldErrors);
      setStatus("Por favor revisa los campos marcados.");
      return;
    }

    setErrors({});
    setStatus("Enviando...");

    try {
      const { empresa, ...payload } = formData; // 👈 Excluye honeypot antes de enviar
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setStatus("¡Mensaje enviado con éxito!");
      setFormData({ name: "", email: "", celular: "", message: "", empresa: "" });
    } catch (err) {
      console.error(err);
      setStatus("Ocurrió un error al enviar.");
    }
  };

  return (
    <section id="contact" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Contáctanos</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Campo Celular */}
          <div>
            <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Celular</label>
            <input
              type="tel"
              name="celular"
              id="celular"
              pattern="[0-9]{8,15}"
              required
              placeholder="Ej. 5544332211"
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.celular}
              onChange={handleChange}
            />
            {errors.celular && <p className="text-sm text-red-600 mt-1">{errors.celular}</p>}
          </div>

          {/* Campo Mensaje */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
          </div>

          {/* 🕵️ Campo Honeypot oculto */}
          <div className="hidden">
            <label htmlFor="empresa">Empresa</label>
            <input
              type="text"
              name="empresa"
              id="empresa"
              autoComplete="off"
              tabIndex={-1}
              value={formData.empresa}
              onChange={handleChange}
            />
          </div>

          {/* Botón de envío */}
          <div>
            <button
              type="submit"
              disabled={status === "Enviando..."}
              className="w-full py-3 px-6 border shadow-sm text-lg font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar mensaje
            </button>
          </div>
        </form>

        {/* Mensaje dinámico de estado */}
        {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
