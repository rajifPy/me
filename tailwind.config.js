/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#011627',
          secondary: '#011221',
          border: '#1E2D3D',
          text: '#607B96',
        },
        light: {
          bg: '#FFFFFF',
          secondary: '#F5F5F5',
          border: '#E0E0E0',
          text: '#4A5568',
        },
        accent: {
          teal: '#43D9AD',
          blue: '#4D5BCE',
          orange: '#FEA55F',
          pink: '#E99287',
        }
      },
      fontFamily: {
        mono: ['var(--font-fira-code)', 'monospace'],
      },
    },
  },
  plugins: [],
}