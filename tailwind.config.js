module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounceSlow: 'bounceSlow 8s linear infinite',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': {
            transform: 'translateY(-5%)'
          },
          '50%': {
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [],
}
