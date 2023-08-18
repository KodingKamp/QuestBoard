import { extendTheme } from "@mui/joy";

// Utilized https://maketintsandshades.com/ and 
// grabbed every other color from white toward black
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          // Purple
          50: '#FFFFFF',
          100: '#F4E9F8',
          200: '#DFBEEB',
          300: '#CA92DD',
          400: '#B566CF',
          500: '#A03BC2',
          600: '#9525BB', // Main color
          700: '#771E96',
          800: '#591670',
          900: '#3C0F4B',
        },
      },
    },
  },
});
