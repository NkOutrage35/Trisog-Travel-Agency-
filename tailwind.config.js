// tailwind.config.js
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      
      fontFamily: {
        body: ["Roboto"],
        accent: ["Nothing You Could Do", "cursive"],
      },
      // 1. Keyframes Definition
      keyframes: {
        "move-anim-1": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50px)" },
        },
      },
      // 2. Animation Utility Definition (Fixed!)
      animation: {
        "move-anim-1": "move-anim-1 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./*.html"],
  safelist: [
    {
      pattern: /bg-\[url\(.*\)\]/,
    },
  ],
  theme: { extend: {} },
  plugins: [],
};
