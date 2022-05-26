import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimelinePosts } from "../features/timelineSlice";

function Home() {
  // const [mode, setMode] = useState(localStorage.mode || "dark");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const Dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    Dispatch(fetchTimelinePosts(state.user._id));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{ minHeight: "100vh" }}
      >
        <Navbar />
        <Stack
          direction="row"
          spacing={{ sm: 6 }}
          justifyContent="space-between"
        >
          <Sidebar setMode={""} mode={""} />
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
