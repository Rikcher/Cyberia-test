export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #24252F 0%, #31313F 36%, #242530 100%)',
      },
      textColor: {
        'light-gray': '#C4D2E3', 
        'medium-gray': '#9AA8BA', 
        'darker-gray': '#C7C7C7'
      },
      backgroundColor: {
        'custom-blue': '#313341', // Custom background color
      },
    },
  },
  plugins: [
    
  ],
};
