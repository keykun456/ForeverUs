// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';
import { Resend } from 'resend';
import { z } from 'zod'; // ✅ Validación segura con Zod

const resend = new Resend(process.env.RESEND_API_KEY);

// 👉 Define el esquema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  celular: z.string().regex(/^\d{8,15}$/),
  message: z.string().min(10),
  empresa: z.string().max(0), // 🕵️ Honeypot (debe venir vacío)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ❌ Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // ✅ Asegura que siempre haya un campo 'empresa', aunque no venga en el body
  const safeBody = {
    ...req.body,
    empresa: req.body.empresa ?? "", // 👈 Evita error si no lo mandaron
  };

  // 🔍 Valida la estructura del request con Zod
  const validation = contactSchema.safeParse(safeBody);

  if (!validation.success) {
    console.error('❌ Datos inválidos:', validation.error.format());
    return res.status(400).json({
      error: 'Datos inválidos',
      fields: validation.error.flatten().fieldErrors,
    });
  }

  // ✅ Extrae campos validados
  const { name, email, celular, message } = validation.data;

  // 💾 Guarda los datos en Supabase
  const { data, error } = await supabase
    .from('Contacto')
    .insert([{ nombre: name, correo: email, mensaje: message, celular }]);

  if (error) {
    console.error('❌ Error al insertar en Supabase:', error);
    return res.status(500).json({ error: 'Error al guardar en BD' });
  }

  // 📧 Intenta enviar correo usando Resend
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['keykun@gmail.com'], // 📩 Cambia esto por tu correo real
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
      console.error('❌ Error al enviar email:', emailError);
      return res.status(500).json({ error: 'Guardado, pero falló el envío del correo.' });
    }

    return res.status(200).json({ success: true, data, emailData });

  } catch (err) {
    console.error('❌ Error general enviando email:', err);
    return res.status(500).json({ error: 'Error al enviar correo.' });
  }
}
