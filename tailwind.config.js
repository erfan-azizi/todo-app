/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16233A',
        surface: '#F7F8FA',
        card: '#FFFFFF',
        teal: '#0EA5A5',
        'teal-dark': '#0B8181',
        muted: '#6B7686',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(22, 35, 58, 0.12)',
      },
    },
  },
  plugins: [],
}
