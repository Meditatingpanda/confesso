import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  return (
    
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile/:username" element={<Profile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    
  );
}

export default App;
