import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("Contacto") // 👈 usa el nombre exacto
    .select("*");

  if (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
}
