import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import supabase from "../helpers/connectBucket";

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
  const handleImageUpload = async (e) => {
    setImage(e.target.files[0]);
    const avatarFile = e.target.files[0]
    console.log(avatarFile)
    const { data, error } = await supabase.storage
      .from("confesso-storage")
      .upload(
        "/Users/travelingmonk/Desktop/Screenshot 2022-05-24 at 3.39.33 PM.png",
        avatarFile
      );

    console.log(data, error);
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
          borderRadius={5}
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
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            {/* <EmojiEmotions color="primary" /> */}
            {!image ? (
              <Button component="label" startIcon={<Image color="secondary" />}>
                Add Image{" "}
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
            ) : (
              <Alert severity="success">Image Added</Alert>
            )}

            {/* <VideoCameraBack color="success" /> */}
            {/* <PersonAdd color="error" /> */}
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
