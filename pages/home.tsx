import React from "react";

import Navbar from "@/components/Navbar"; // 👉 Importa el navbar reutilizable
import Hero from "@/components/Hero"; // 👉 Importa el Hero reutilizable
import ContactForm from "@/components/ContactForm"; // 👉 Componente de formulario
import Services from "@/components/Services"; // 🧩 Importa la nueva sección de servicios
import AboutUs from "@/components/AboutUs"; // 🧠 Sección informativa


/**
 * Página principal Home:
 * Renderiza la estructura base reutilizando componentes para navbar, hero y contacto.
 */
export default function Home() {
  return (
    <div id="home" className="min-h-screen flex flex-col scroll-smooth">

		{/* 🚀 Navbar reutilizado como componente */}
		<Navbar />

		{/* 🎉 Hero animado como componente */}
		<Hero />
		
		{/* 🧠 Nueva sección de confianza */}
		<AboutUs />       
		
		{/* 🎯 Nueva sección de servicios */}
		<Services />  
		
		{/* 📝 Formulario como componente separado */}
		<ContactForm />
      
    </div>
  );
}
