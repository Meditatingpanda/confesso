import { CardMedia } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ProfileBio() {
  const userData=useSelector((state)=>state.auth.user);
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={userData.coverPicture}
        sx={{objectFit:'cover'}}
        alt="cover pic"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "-10%",
        }}
      >
        <Avatar
          sx={{ width: "10rem", height: "10rem" }}
          src={userData.profilePicture}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {userData.username}
          </Typography>
          <Typography
            sx={{ textAlign: "center" }}
            variant="body2"
            color="text.secondary"
          >
            {userData.desc}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default ProfileBio;
