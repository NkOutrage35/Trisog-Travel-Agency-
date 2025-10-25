// tailwind.config.js
module.exports = {
  content: [
    "./**/*.{html,js}", // Tells Tailwind to scan all .html files in the current folder
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto"],
        accent: ["Nothing You Could Do", "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
