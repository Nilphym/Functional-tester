import { createTheme } from '@mui/material/styles';
import { blue, lightGreen } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400]
    },
    secondary: {
      main: lightGreen.A700
    }
  }
});

export default theme;
