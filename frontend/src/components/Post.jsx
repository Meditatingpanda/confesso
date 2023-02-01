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
import api from "../helpers/baseUrl";
import { useNavigate } from "react-router-dom";
const Post = ({ desc, img, likes, _id, userId, createdAt }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [postUserData, setPostUserData] = useState({});
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLiked(likes.includes(user._id));
  }, [user._id, likes]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${api}/users/`, {
        params: {
          userId,
        },
      });

      setPostUserData(res.data);
    };
    fetchData();
  }, []);

  const handleLikes = async () => {
    const res = await axios.put(`${api}/posts/${_id}/like`, {
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
            src={postUserData.profilePicture}
            sx={{ bgcolor: "red", cursor: "pointer" }}
            onClick={() => navigate(`/profile/${postUserData.username}`)}
            aria-label="profile picture"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={postUserData.username}
        subheader={new Date(createdAt).toLocaleDateString()}
      />
      <CardMedia component="img" height="20%" image={img} alt="post image" />
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
