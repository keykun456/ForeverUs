import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, message, celular } = req.body;

  console.log("✅ Nuevo mensaje recibido:", { name, email, message, celular });

  // Insertar en Supabase
  const { data, error } = await supabase
    .from("Contacto")
    .insert([{ nombre: name, correo: email, mensaje: message, celular }]);

  if (error) {
    console.error("❌ Error al insertar en Supabase:", error);
    return res.status(500).json({ error: "Error guardando en BD" });
  }

  // Enviar el correo con Resend
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['keykun@gmail.com', 'keykun@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h3>Nuevo contacto recibido</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Celular:</strong> ${celular}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    });

    console.log("📧 EmailData:", emailData);
    if (emailError) {
      console.error("❌ Error al enviar email:", emailError);
      return res.status(500).json({ error: "Guardado, pero falló el envío del correo." });
    }

    return res.status(200).json({ success: true, data, emailData });

  } catch (err) {
    console.error("❌ Error general enviando email:", err);
    return res.status(500).json({ error: "Guardado, pero falló el envío del correo." });
  }
}
