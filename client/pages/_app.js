import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import "../styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4E95A6",
    },
    secondary: {
      main: "#F28177",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

export default MyApp;
