import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E88E5',
          light: '#64B5F6',
          dark: '#1565C0',
        },
        accent: {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
          dark: '#FFC107',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          light: '#7FE0D9',
          dark: '#45B7AF',
        },
      },
    },
  },
  plugins: [],
}

export default config 