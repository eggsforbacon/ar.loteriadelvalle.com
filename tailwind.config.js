/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      keyframes: {
        "render-bit": {
          "0%, 40%, 100%": { opacity: 0 },
          "60%, 80%": { opacity: 1 },
        },
      },
      animation: {
        "render-bit": "render-bit 5s ease-in-out infinite both",
      },
      colors: {
        primary: {
          50: "#fff1f2",
          100: "#ffe0e2",
          200: "#ffc7cb",
          300: "#ffa0a7",
          400: "#ff6973",
          500: "#f93a47",
          600: "#e21826",
          700: "#c2131f",
          800: "#a0141e",
          900: "#85171f",
          950: "#49060b",
        },
        accent: {
          50: "#fefee8",
          100: "#feffc2",
          200: "#fffe88",
          300: "#fff544",
          400: "#fee503",
          500: "#eecd04",
          600: "#cea000",
          700: "#a47204",
          800: "#87590c",
          900: "#734910",
          950: "#432605",
        },
        background: "#FFFFFF",
        surface: "#F7F2FA",
        "on-surface": "#000000",
      },
    },
  },
  plugins: [],
};
