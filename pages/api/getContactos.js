import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("Contacto")
    .select("*")
    .order("creado_el", { ascending: false });

  if (error) {
    console.error("❌ Error al obtener contactos:", error);
    return res.status(500).json({ error: "Error al obtener datos" });
  }

  console.log("✅ Contactos obtenidos:", data);
  return res.status(200).json(data);
}
