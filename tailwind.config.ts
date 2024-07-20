import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-primary': '#5a5a9b',
        'custom-secondary': '#061a2b'
      },
      boxShadow: {
        'custom-focus': '0 0 0 0.2rem rgba(165, 243, 252, 0.5)'
      }
    },
  },
  plugins: [],
};
export default config;
