import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
       <Login/>
      </ThemeProvider>
    </>
  );
}

export default App;
