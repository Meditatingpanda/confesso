import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../features/authSlice";
import { Alert } from "@mui/material";
import { LinearProgress } from "@mui/material";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const onChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const state = useSelector((state) => state.auth);
  const Dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();

    setErr(false);
    if (login.email === "" || login.password === "") {
      setErr(true);
    } else {
      Dispatch(loginStart(login));
    }
  };
  return (
    <>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid sx={{ width: "85%" }} container spacing={6}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography variant="h1">Confesso</Typography>
              <Typography sx={{ ml: 1.4 }} variant="body1">
                Let your Imposter Syndrome come from your brain
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              onSubmit={handleLogin}
              component={"form"}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: 380,
                mx: "auto",
                p: 2,
                gap: 2,
              }}
            >
              <TextField
                name="email"
                variant="outlined"
                type="email"
                label="Email"
                value={login.email}
                onChange={onChange}
              />
              <TextField
                name="password"
                variant="outlined"
                type="password"
                label="Password"
                value={login.password}
                onChange={onChange}
              />

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
              <Button component={Link} to="/register">
                Create New Account
              </Button>
              {state.isFetching && <LinearProgress sx={{ height: 10 }} />}
              {state.error && <Alert severity="error">{state.error}</Alert>}
              {err && <Alert severity="error">All fields are required</Alert>}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
