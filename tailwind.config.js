/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        brand: '#FF9999'
      },
      lineClamp:{
        7:'7'
      },
      backgroundImage:{
        banner:`url('./public/shop.jpg')`
      }
  },
  },
  plugins: [],
}

