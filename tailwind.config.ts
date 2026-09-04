import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Alebrije Mizton Shop
        "primary": "#0A7B83",                // Turquesa / Teal artesanal (cuerpo del gato)
        "primary-dark": "#07595F",           // Turquesa profundo
        "primary-container": "#E0F4F5",      // Fondo turquesa suave
        "on-primary": "#ffffff",
        "on-primary-container": "#043B3F",
        "primary-fixed": "#6DF0EB",
        "primary-fixed-dim": "#2DD4BF",

        "secondary": "#D81B60",              // Rosa Mexicano / Magenta Pitaya (manchas y detalles)
        "secondary-container": "#FCE4EC",    // Rosa pastel suave
        "on-secondary": "#ffffff",
        "on-secondary-container": "#560027",

        "tertiary": "#F5A623",               // Oro Azteca / Cempasúchil (collar y espirales)
        "tertiary-container": "#FEF3C7",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#78350F",

        // Acentos directos
        "accent-gold": "#F5A623",
        "accent-magenta": "#D81B60",
        "accent-teal": "#0A7B83",
        "accent-mint": "#2DD4BF",
        "dark-teal": "#08262C",

        // Superficies y fondos con calidez alabastro
        "surface": "#FAF9F6",
        "surface-container": "#F0F5F5",
        "surface-container-low": "#F6FAF9",
        "surface-container-high": "#E2ECEC",
        "surface-container-highest": "#D5E3E4",
        "surface-container-lowest": "#ffffff",
        "surface-bright": "#FAF9F6",
        "surface-dim": "#E5EBEA",
        "surface-variant": "#E2ECEC",
        "surface-tint": "#0A7B83",

        "background": "#FAF9F6",
        "on-background": "#182224",
        "on-surface": "#182224",
        "on-surface-variant": "#495D60",

        "outline": "#6F8A8C",
        "outline-variant": "#D0DFE1",

        "inverse-surface": "#1E2A2C",
        "inverse-on-surface": "#F0F5F5",
        "inverse-primary": "#2DD4BF",

        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#ffffff",
        "on-error-container": "#93000A",
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "64px",
        "md": "16px",
        "max-width": "1280px",
        "base": "4px",
        "lg": "24px",
        "xs": "4px",
        "margin-mobile": "16px",
        "gutter": "20px",
        "sm": "8px",
        "xl": "40px"
      },
      fontFamily: {
        "headline-lg": ["var(--font-inter)", "sans-serif"],
        "headline-lg-mobile": ["var(--font-inter)", "sans-serif"],
        "body-md": ["var(--font-inter)", "sans-serif"],
        "label-md": ["var(--font-inter)", "sans-serif"],
        "headline-md": ["var(--font-inter)", "sans-serif"],
        "body-lg": ["var(--font-inter)", "sans-serif"],
        "display-lg": ["var(--font-inter)", "sans-serif"],
        "label-sm": ["var(--font-inter)", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "34px", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "20px", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }]
      }
    },
  },
  plugins: [],
};
export default config;
