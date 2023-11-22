import createTheme from "@mui/material/styles/createTheme";

// Utilized https://maketintsandshades.com/ and 
// grabbed every other color from white toward black
export const theme = createTheme({
  palette: {
    primary: {
      main: '#9525BB',
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
    text: {
      primary: "#F1F1F1",
      secondary: "#999"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#F1F1F1',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderBottomColor: '#F1F1F1',
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          maxWidth: 'unset',
          minWidth: 'unset',
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'unset'
        }
      }
    },
  }
});
