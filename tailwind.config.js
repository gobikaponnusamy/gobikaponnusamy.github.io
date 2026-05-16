/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        heading: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      },
      colors: {
        obsidian: "#0a0a0f",
        paper: "#f0ede8",
        muted: "#8b8680",
        electric: "#6366f1",
        carbon: "#12121a"
      },
      boxShadow: {
        bloom: "0 28px 80px rgba(99, 102, 241, 0.22)"
      }
    }
  },
  plugins: []
};
