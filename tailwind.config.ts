import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myColor: "#8e44ad",
      },
    },
  },
  plugins: [],
} satisfies Config;
