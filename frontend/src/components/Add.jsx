import {
  Avatar,
  Button,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon, Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import supabase from "../helpers/connectBucket";
import axios from "axios";
import api from '../helpers/baseUrl'
// Create a single supabase client for interacting with your database

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState(null);
  const [postData, setPostData] = useState({
    userId: user._id,
    desc: "",
    img: "https://wallpaperaccess.com/full/36626.jpg",
  });

  const handleImageUpload = async (e) => {
    setImage(e.target.files[0]);
    const avatarFile = e.target.files[0];
    console.log(avatarFile);
    const { data, error } = await supabase.storage
      .from("confesso-storage")
      .upload(avatarFile.name, avatarFile);
      if(error){
        setImage(null)
      }  
      console.log(data,error);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/posts/`, postData);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={"auto"}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          component={"form"}
          borderRadius={5}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar src={user.profilePicture} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              {user.username}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            onChange={(e) => setPostData({ ...postData, desc: e.target.value })}
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
          />

          <Stack direction="row" gap={1} mt={2} mb={3}>
            {!image ? (
              <Button component="label" startIcon={<Image color="secondary" />}>
                Add Image
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
            ) : (
              <Alert severity="success">Image Added</Alert>
            )}
          </Stack>
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "70%" }}
              color="primary"
            >
              Post
            </Button>
            <Button
              onClick={(e) => setOpen(false)}
              variant="contained"
              sx={{ width: "30%" }}
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
