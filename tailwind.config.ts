import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "#6b7280",
      },
      boxShadow: {
        tv: "0 20px 60px rgba(0,0,0,0.15)",
        iphone: "0 12px 40px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      }
    },
  },
  plugins: [],
};
export default config;