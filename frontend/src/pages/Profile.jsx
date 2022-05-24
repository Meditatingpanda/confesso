import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import Add from "../components/Add";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import ProfileBio from "../components/ProfileBio";
import Sidebar from "../components/Sidebar";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function Profile() {
  const [mode, setMode] = useState("dark");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{ minHeight: "100vh" }}
      >
        <Navbar />

        <Stack direction="row"  justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
            <ProfileBio />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="10 Posts" />
                  <Tab label=" 69 followers" />
                  <Tab label="10 followings" />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Feed />
              </TabPanel>
              <TabPanel value={value} index={1}>
                followers
              </TabPanel>
              <TabPanel value={value} index={2}>
                followings
              </TabPanel>
            </Box>
          </Box>
        </Stack>
        <Add/>
      </Box>
    </>
  );
}

export default Profile;
