/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean:     { 500: 'var(--ocean-500)',     900: 'var(--ocean-900)' },
        parchment: { 50:  'var(--parchment-50)',  100: 'var(--parchment-100)', 200: 'var(--parchment-200)' },
        forest:    { 500: 'var(--forest-500)',    700: 'var(--forest-700)' },
        earth:     { 500: 'var(--earth-500)',     700: 'var(--earth-700)' },
        stamp:     { red: 'var(--stamp-red)',     gold: 'var(--stamp-gold)' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        ui:      ['var(--font-ui)',      'sans-serif'],
        numeric: ['var(--font-numeric)', 'serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      boxShadow: {
        'ds-sm':          'var(--shadow-sm)',
        'ds-md':          'var(--shadow-md)',
        'ds-glow-correct': 'var(--glow-correct)',
        'ds-glow-wrong':   'var(--glow-wrong)',
      },
    },
  },
  plugins: [],
}
