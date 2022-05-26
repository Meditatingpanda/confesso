import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const Post = ({ desc, img, likes, _id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    setIsLiked(likes.includes(user._id));
  }, [user._id, likes]);

  const handleLikes = async () => {
    const res = await axios.put(`/posts/${_id}/like`, {
      userId: user._id,
    });
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };
  return (
    <Card sx={{ mb: 4, mt: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            src="https://avatars.githubusercontent.com/u/83230804?v=4"
            sx={{ bgcolor: "red" }}
            aria-label="recipe"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Gyana Ranjan Panda"
        subheader="September 14, 2022"
      />
      <CardMedia component="img" height="20%" image={img} alt="Paella dish" />
      <CardContent>
        <Typography component={"span"} variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikes} aria-label="add to favorites">
          <Typography variant="body2" color="text.secondary">
            {likeCount}
          </Typography>
          <Checkbox
            checked={isLiked}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
