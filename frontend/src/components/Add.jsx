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
import PropTypes from "prop-types";
import { Add as AddIcon, Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import axios from "axios";
import api from "../helpers/baseUrl";
import storage from "../helpers/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
// Create a single supabase client for interacting with your database
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
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
  const [percent, setPercent] = useState(0);
  const [postData, setPostData] = useState({
    userId: user._id,
    desc: "",
    img: "",
  });

  const handleImageUpload = async (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
        console.log(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setPostData({ ...postData, img: url });
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.img.length) {
      alert("Please wait for the upload to finish");
    } else {
      try {
        console.log(postData);
        await axios.post(`${api}/posts/`, postData);
        setOpen(false);
         window.location.reload();
      } catch (error) {
        console.log(error);
      }
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
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            ) : (
              <>
                <Alert severity="success">Image Added</Alert>
                <CircularProgressWithLabel value={percent} />
              </>
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
