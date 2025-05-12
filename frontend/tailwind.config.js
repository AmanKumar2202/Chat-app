import daisyui from 'daisyui';
import themes from 'daisyui/theme/object';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // Default primary color (blue-600)
          50: "#E0F2FE",      // Lightest shade
          100: "#BAE6FD",
          200: "#7DD3FC",
          300: "#38BDF8",
          400: "#0EA5E9",
          500: "#0284C7",
          600: "#1D4ED8",  // Main primary color
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#172554",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
}
