import type { NextApiRequest, NextApiResponse } from 'next'
// 👉 importas supabase
import { supabase } from '../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, message, celular } = req.body; // 👉 ahora incluye celular

  console.log("✅ Nuevo mensaje recibido:");
  console.log("Nombre:", name);
  console.log("Email:", email);
  console.log("Mensaje:", message);
  console.log("Celular:", celular);

  // 👉 insertar en Supabase (tabla Contacto)
  const { data, error } = await supabase
    .from("Contacto")
    .insert([
      { nombre: name, correo: email, mensaje: message, celular }
    ]);

  if (error) {
    console.error("❌ Error al insertar en Supabase:", error);
    return res.status(500).json({ error: "Error guardando en BD" });
  }

  return res.status(200).json({ success: true, data });
}
