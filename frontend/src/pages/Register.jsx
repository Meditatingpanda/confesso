import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerStart } from "../features/authSlice";

function Register() {
  const [signUp, setsignUp] = useState({
    username: "",
    email: "",
    password: "",
    password1: "",
  });

  const onChange = (e) => {
    setsignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const state = useSelector((state) => state.auth);
  const Dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    Dispatch(registerStart(signUp));
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
        <Grid sx={{ width: { xs: "100%", sm: "85%" } }} container spacing={6}>
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
              component={"form"}
              onSubmit={handleRegister}
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
                onChange={onChange}
                name="username"
                variant="outlined"
                label="Username"
                required
              />
              <TextField
                name="email"
                variant="outlined"
                type="email"
                label="Email"
                onChange={onChange}
                required
              />
              <TextField
                name="password"
                variant="outlined"
                type="password"
                onChange={onChange}
                label="Password"
                required
              />
              <TextField
                variant="outlined"
                name="password1"
                type="password"
                onChange={onChange}
                label="Confirm Password"
                required
              />
              <Button type="submit" variant="contained" color="primary">
                {state.isFetching ? (
                  <CircularProgress size="40px" />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Button component={Link} to="/login">
                Login
              </Button>
              {/* {state.isFetching && <LinearProgress sx={{ height: 10 }} />} */}
              {state.error && <Alert severity="error">{state.error}</Alert>}
              {state.success && (
                <Alert severity="success">Account has been created</Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Register;
