import { Stack, Typography, Tabs, Tab, Box } from "@mui/material";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Add from "../components/Add";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import ProfileBio from "../components/ProfileBio";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/profileSlice";
import { fetchPosts } from "../features/postSlice";
import ListPeople from "../components/List";
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
  const params = useParams();

  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(fetchUser(params.username));
    dispacth(fetchPosts(params.username));
  }, []);

  const posts = useSelector((state) => state.post.ownPost);
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
        <Stack direction="row" justifyContent="space-between">
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
                  <Tab label={`${posts.length} Posts`} />
                  <Tab label={`followers`} />
                  <Tab label={`followings`} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Feed profileFeed={true} />
              </TabPanel>
              <TabPanel value={value} index={1}>
              <ListPeople/>
              </TabPanel>
              <TabPanel value={value} index={2}>
               <ListPeople/>
              </TabPanel>
            </Box>
          </Box>
        </Stack>
        <Add />
      </Box>
    </>
  );
}

export default Profile;
