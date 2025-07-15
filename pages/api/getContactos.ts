// pages/api/getContactos.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Inicializa Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitimos GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Hacemos SELECT * de la tabla Contacto
    const { data, error } = await supabase
      .from('Contacto')
      .select('*')
      .order('creado_el', { ascending: false }); // orden opcional, más recientes primero

    if (error) {
      console.error('Error al consultar Supabase:', error);
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }

    // Retornamos los datos en JSON
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error inesperado' });
  }
}
