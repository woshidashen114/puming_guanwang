/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06131f',
        'bg-soft': '#0a2134',
        ink: '#f5fbff',
        'ink-dim': '#8daabb',
        accent: '#17c8f6',
        'accent-2': '#49e3ce',
        line: 'rgba(145, 207, 229, 0.18)',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
