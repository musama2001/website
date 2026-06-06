module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        neonPurple: '#b026ff',
        cyberBlue: '#00f0ff',
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at center, rgba(176,38,255,0.12), rgba(0,0,0,0))',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(176,38,255,0.5), 0 0 60px rgba(176,38,255,0.2)',
        'neon-blue': '0 0 20px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(176,38,255,0.4), 0 0 60px rgba(176,38,255,0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(176,38,255,0.6), 0 0 80px rgba(176,38,255,0.25)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
