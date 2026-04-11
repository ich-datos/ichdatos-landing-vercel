/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // <-- ESTA LÍNEA ES CLAVE
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // Si tenés carpetas viejas fuera de src/app, agregalas acá:
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
