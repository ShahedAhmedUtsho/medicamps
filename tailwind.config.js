/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  presets: [keepPreset],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/plugin.cjs")
  ],
}

