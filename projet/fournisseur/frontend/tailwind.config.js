export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f2',
          100: '#f5ede0',
          500: '#1e9bbd',
          600: '#0f6b63',
          700: '#0b4f4a',
          900: '#052f2b'
        },
        ink: '#10201a',
        'ink-2': '#2b4b46',
        bg: '#f7f2eb',
        cream: '#fdf8f2',
        sand: '#ede0cc',
        'orange-bright': '#ff8800',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Sora', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}