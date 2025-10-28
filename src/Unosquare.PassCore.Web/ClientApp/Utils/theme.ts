import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'dark', // This one line enables dark mode
    primary: {
      main: '#304FF3', // Your brand color from the AppBar
    },
    secondary: {
      main: '#ffffff', // Your icon/text color
    },
    background: {
      paper: '#242424', // A slightly lighter dark for surfaces
    },
  },
});