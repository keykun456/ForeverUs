\# Diagrama de flujo del proyecto



```mermaid

flowchart TD

&nbsp;   A\[Usuario visita el sitio] --> B\[Next.js procesa la ruta]

&nbsp;   B --> C\[index.tsx o home.tsx]

&nbsp;   C --> D\[Muestra componentes visuales con TailwindCSS]

&nbsp;   D --> E\[Usuario llena formulario de contacto]

&nbsp;   E --> F\[Llama a /api/contact.ts]

&nbsp;   F --> G\[Validación y procesamiento del mensaje]

&nbsp;   G --> H\[Respuesta: éxito o error]



