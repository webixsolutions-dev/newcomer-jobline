/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f7",
          100: "#d5dfeb",
          200: "#aebfd6",
          300: "#7f9abd",
          400: "#4f739f",
          500: "#325682",
          600: "#25436a",
          700: "#1b3253",
          800: "#12233d",
          900: "#0B2545",
          950: "#071733",
        },
        gold: {
          50: "#fef9ec",
          100: "#fdf0c9",
          200: "#fbdf8f",
          300: "#f9cb54",
          400: "#f6b62c",
          500: "#F5A623",
          600: "#dc8113",
          700: "#b65e12",
          800: "#934a16",
          900: "#793e16",
        },
        teal: {
          50: "#eafaf5",
          100: "#cdf2e5",
          200: "#9fe4cf",
          300: "#67cdb5",
          400: "#38b096",
          500: "#22947e",
          600: "#1a7a68",
          700: "#1F7A6C",
          800: "#16463d",
          900: "#123a33",
        },
      },
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(11, 37, 69, 0.18)",
        card: "0 4px 20px rgba(11, 37, 69, 0.08)",
        glow: "0 0 0 4px rgba(245, 166, 35, 0.15)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle, rgba(11,37,69,0.08) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(135deg, #0B2545 0%, #12335c 55%, #1b3253 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        "grid-16": "16px 16px",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}
