import tailwindcss from "@headlessui/tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";





export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E7ECFC",
          100: "#CED9FA",
          200: "#9DB3F5",
          300: "#6D8EEF",
          400: "#3C68EA",
          500: "#0B42E5",
          600: "#0935B7",
          700: "#072889",
          800: "#B4F9C7",
          900: "#94cca3",
          DEFAULT: "#B4F9C7",
        },
        "primary-dark": {
          50: "#E8EBF3",
          100: "#D2D7E6",
          200: "#A5AFCD",
          300: "#7786B4",
          400: "#4A5E9B",
          500: "#1D3682",
          600: "#172B68",
          700: "#11204E",
          800: "#0C1634",
          900: "#060B1A",
          DEFAULT: "#1D3682",
        },
        "primary-white": {
          50: "#FEFEFF",
          100: "#FDFEFF",
          200: "#FCFCFF",
          300: "#FAFBFF",
          400: "#F9F9FF",
          500: "#F7F8FF",
          600: "#C6C6CC",
          700: "#949599",
          800: "#636366",
          900: "#505050",
          DEFAULT: "#F7F8FF",
        },
        "secondary-purple": {
          50: "#F2EDFB",
          100: "#E5DAF7",
          200: "#CAB5EF",
          300: "#B091E6",
          400: "#956CDE",
          500: "#7B47D6",
          600: "#6239AB",
          DEFAULT: "#7B47D6",
        },
        "secondary-pink": {
          50: "#FADEE6",
          100: "#FADEE6",
          200: "#F5BDCD",
          300: "#EF9BB4",
          400: "#EA7A9B",
          500: "#E55982",
          600: "#BB486A",
          DEFAULT: "#E55982",
        },
        "secondary-orange": {
          50: "#FDF0EC",
          100: "#FBE1D8",
          200: "#F7C3B1",
          300: "#F3A48B",
          400: "#EF8664",
          500: "#EB683D",
          600: "#BC5331",
          DEFAULT: "#EB683D",
        },
        "secondary-green": {
          50: "#EDFBF3",
          100: "#DCF7E7",
          200: "#B8F0CF",
          300: "#95E8B6",
          400: "#71E19E",
          500: "#4ED986",
          600: "#3EAE6B",
          DEFAULT: "#4ED986",
        },
        "neutrals-dark": {
          200: "#677499",
          300: "#4C5879",
          400: "#313B59",
          500: "#161F39",
          DEFAULT: "#161F39",
        },
        "neutrals-medium": {
          200: "#DBDFEB",
          300: "#C9CFE1",
          400: "#B7BFD7",
          500: "#A5AFCD",
          DEFAULT: "#A5AFCD",
        },
        "neutrals-light": {
          200: "#E8E8EB",
          300: "#DDDDE0",
          400: "#D1D1D6",
          500: "#C6C6CC",
          DEFAULT: "#C6C6CC",
        },
        "alert-success": {
          100: "#B8EFD2",
          500: "#00C760",
          800: "#008E45",
          DEFAULT: "#00C760",
        },
        "alert-error": {
          100: "#FAD2D7",
          500: "#E71D36",
          800: "#AE0016",
          DEFAULT: "#E71D36",
        },
        secondary: {
          100: "#FCFDFE",
          200: "#F8FAFD",
          300: "#F4F7FC",
          400: "#F0F4FB",
          500: "#ECF1FA",
          600: "#E8EEF9",
          700: "#E4EBF8",
          800: "#E0E9F7",
          900: "#DCE5F6",
          DEFAULT: "#D8E3F5",
        },
        black: {
          100: "#EDEEEF",
          200: "#D6D9DC",
          300: "#C0C3C8",
          400: "#A9AEB4",
          500: "#9298A0",
          600: "#7B838D",
          700: "#646E79",
          800: "#4E5865",
          900: "#374351",
          DEFAULT: "#1b1d21",
        },
        white: "#FFFFFF",
        transparent: "transparent",
        gray: {
          50: "#FEFEFF",
          600: "#7C7B7A",
          700: "#697079",
          800: "#535A63",
        },
        cream: {
          100: "#F8F6F3",
          200: "#EBE7E1",
          300: "#DEDBD7",
        },
        "cloud-silver": {
          DEFAULT: "#c6ccd4",
        },
        "ice-silver": {
          DEFAULT: "#EDF1F5",
        },
        red: {
          300: "#FCA5A5",
          500: "#EF4444",
          DEFAULT: "#FC0B0B",
        },
        "electric-blue": {
          DEFAULT: "#1DBBFF",
        },
        skun: {
          DEFAULT: "#252525",
        },
        "skun-mid": {
          DEFAULT: "#535659",
        },
      },
      strokeWidth: {
        5: "5px",
      },
      fontFamily: {
        nobel: "nobel",
        grand: "grand",
        nunito: "'Nunito'",
        "new-hero": [
          "New Hero",
          "system-ui, -apple-system, BlinkMacSystemFont",
        ],
      },
    },
  },
  plugins: [typography, forms, tailwindcss],
} satisfies Config;
