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
        uiyellow: {
          50: "#FEFBE8",
          100: "#FEF7C3",
          200: "#FFEC89",
          300: "#FEDE57",
          400: "#FBC674",
          500: "#EBAD07",
          600: "#CB8403",
          700: "#A25D06",
          800: "#86490D",
          900: "#713C12",
          950: "#421E06"
        },
        uiblue: {
          50: "#F0F8FF",
          100: "#DFF0FF",
          200: "#B9E2FE",
          300: "#7BCDFE",
          400: "#34B3FC",
          500: "#0A9ABED",
          600: "#087ACB",
          700: "#005B9A",
          800: "#055387",
          900: "#0A4470",
          950: "#072B4A"
        },
        uisky: {
          50: "#F2F9FD",
          100: "#E5F2F9",
          200: '#C5E4F2',
          300: "#75C1E1",
          400: "#57B4D9",
          500: "#329BC5",
          600: "#227EA7",
          700: "#1D6487",
          800: "#1C5570",
          900: "#1C485E",
          950: "#132E3E"
        },
        uicream: {
          50: '#FDF8EF',
          100: '#FAEACC',
          200: '#F7DCB1',
          300: '#F1C380',
          400: '#EAA14D',
          500: 'E5862A',
          600: '#D66D20',
          700: '#B2541C',
          800: '#8E431E',
          900: '#73391B',
          950: '#3E1B0C'
      },
    //     test: {
    //       248 250 252;
    // --color-muted-100: 241 245 249;
    // --color-muted-200: 226 232 240;
    // --color-muted-300: 203 213 225;
    // --color-muted-400: 148 163 184;
    // --color-muted-500: 100 116 139;
    // --color-muted-600: 71 85 105;
    // --color-muted-700: 51 65 85;
    // --color-muted-800: 30 41 59;
    // --color-muted-900: 15 23 42;
    // --color-muted-950: 2 6 23;
    //     },
        uimuted: {
          100: "rgb(241, 245, 249)",
          200: "rgb(226 232 240)",
          300: "rgb(203 213 225)",
          400: "rgb(148 163 184)",
          500: "rgb(100 116 139)",
          600: "rgb(71 85 105)",
          700: "rgb(51 65 85)",
          800: "#304159",
          900: "#152342",
          950: "rgb(2 6 23)"
        }
      },
      boxShadow: {
        'custom-focus': '0 0 0 0.2rem rgba(165, 243, 252, 0.5)'
      }
    },
  },
  plugins: [],
};
export default config;
