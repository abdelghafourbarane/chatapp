import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import { UserContextWrapper } from "../context/user/user.context";
import { RoomsContextWrapper } from "../context/rooms/rooms.context";

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
      <UserContextWrapper>
        <RoomsContextWrapper>
          <Component {...pageProps} />
        </RoomsContextWrapper>
      </UserContextWrapper>
    </MuiThemeProvider>
  );
}

export default MyApp;
