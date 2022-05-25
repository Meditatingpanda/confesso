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
const Post = ({ desc, img, likes }) => {
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
        <IconButton aria-label="add to favorites">
          <Checkbox
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
