import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
        background: {
          default: '#ffffff',
          paper: '#f5f5f5',
        },
        text: {
          primary: '#000000',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
        },
        secondary: {
          main: '#f48fb1',
        },
        background: {
          default: '#121212',
          paper: '#1d1d1d',
        },
        text: {
          primary: '#ffffff',
        },
      },
    },
  },
});

export default theme;
