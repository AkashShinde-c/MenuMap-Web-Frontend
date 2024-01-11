import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#27005D",
        
"secondary": "#9400FF",
        
"accent": "#AED2FF",
        
"neutral": "#0a080d",
        
"base-100": "#E4F1FF",
        
"info": "#00ffff",
        
"success": "#008e70",
        
"warning": "#f15f00",
        
"error": "#c1243e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

