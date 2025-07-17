// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';
import { Resend } from 'resend';
import { z } from 'zod';

// 👉 Inicializa Resend con tu API key del entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// 👉 Esquema Zod para validar los datos del formulario, incluyendo honeypot
const contactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Correo no válido"),
  celular: z.string().regex(/^\d{8,15}$/, "Celular inválido"),
  message: z.string().min(10, "Mensaje demasiado corto"),
  empresa: z.string().max(0, "Campo no permitido"), // 🕵️ Honeypot anti bots
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 👉 Solo permite POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // 👉 Valida los datos con Zod
  const validation = contactSchema.safeParse(req.body);
  if (!validation.success) {
    console.error("❌ Datos inválidos:", validation.error.format());
    return res.status(400).json({
      error: "Datos inválidos",
      fields: validation.error.flatten().fieldErrors,
    });
  }

  const { name, email, celular, message } = validation.data;

  // 👉 Inserta en Supabase
  const { data, error } = await supabase
    .from("Contacto")
    .insert([{ nombre: name, correo: email, mensaje: message, celular }]);

  if (error) {
    console.error("❌ Error al insertar en Supabase:", error);
    return res.status(500).json({ error: "Error al guardar en BD" });
  }

  // 👉 Intenta enviar correo con Resend
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['keykun@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h3>Nuevo contacto recibido</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Celular:</strong> ${celular}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    if (emailError) {
      console.error("❌ Error al enviar email:", emailError);
      return res.status(500).json({ error: "Guardado, pero falló el envío del correo." });
    }

    // 👉 Todo salió bien
    return res.status(200).json({ success: true, data, emailData });

  } catch (err) {
    console.error("❌ Error inesperado enviando email:", err);
    return res.status(500).json({ error: "Error al enviar correo." });
  }
}
