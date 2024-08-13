export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #24252F 0%, #31313F 36%, #242530 100%)',
        'hover-gradient': 'linear-gradient(to top, #090B21 0%, rgba(49, 51, 65, 0) 100%)'
      },
      textColor: {
        'light-gray': '#C4D2E3', 
        'medium-gray': '#9AA8BA', 
        'darker-gray': '#C7C7C7'
      },
      backgroundColor: {
        'custom-blue': '#313341', 
        'deep-blue': '#252631'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'], 
        'fira': ['Fira Sans', 'sans-serif'], 
      },
      screens: {
        'xxm': '300px',
      },
      rotate: {
        '42': '42deg',
      }
    },
  },
  plugins: [
    
  ],
};
