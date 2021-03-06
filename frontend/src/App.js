import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function App() {
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  useEffect(() => {
    if (state.user) {
      navigate("/");
    }
  }, [state.user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route exact path="/" element={state.user ? <Home /> : <Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
