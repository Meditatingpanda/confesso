import { CardMedia } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import React from "react";

function ProfileBio() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://image.shutterstock.com/image-photo/green-background-people-who-want-260nw-1165812823.jpg"
        sx={{objectFit:'cover'}}
        alt="green iguana"
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
          src="https://avatars.githubusercontent.com/u/83230804?v=4"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Gyana Ranjan Panda
          </Typography>
          <Typography
            sx={{ textAlign: "center" }}
            variant="body2"
            color="text.secondary"
          >
            Hello World
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default ProfileBio;
