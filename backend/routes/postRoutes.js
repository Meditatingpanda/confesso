const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/posts");
const User = require("../models/user");
//create a post
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newPosts = await Post.create(req.body);
    res.status(200).json({ msg: "new post creared!" });
  })
);

//update a post
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    //find the post by id
    const post = await Post.findById(req.params.id);
    if (req.body.userId !== post.userId) {
      res.status(401);
      throw new Error("Can not update others post");
    } else {
      await post.updateOne({
        $set: req.body,
      });

      res.status(200).json({ msg: "post updated" });
    }
  })
);

//delete a post
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    //find the post by id
    const post = await Post.findById(req.params.id);
    if (req.body.userId !== post.userId) {
      res.status(401);
      throw new Error("Can not delete others post");
    } else {
      await post.deleteOne();
      res.status(200).json({ msg: "post delated" });
    }
  })
);

//like a post
router.put(
  "/:id/like",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      //remove like
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      res.status(200).json("The post has been disliked");
    } else {
      //add likes

      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      res.status(200).json("The post has been liked");
    }
  })
);

//get a post
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  })
);

//get  all timeline posts
router.get(
  "/timeline/all",
  asyncHandler(async (req, res) => {
    //get posts from the followings and own posts
    const user = await User.findById(req.body.userId);
    const friendPosts = await Promise.all(
      user.following.map((id) => {
        return Post.find({ userId: id });
      })
    );

    const ownPosts = await Post.find({ userId: req.body.userId });
    res.status(200).json(ownPosts.concat(...friendPosts));
  })
);

//get user's post
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    if (username) {
      const user = await User.findOne({ username });
      const post = await Post.find({ userId: user._id });
      res.status(200).json(post);
      console.log(username,1)
    } else {
      console.log(userId)
      const post = await Post.find({ userId });
      res.status(200).json(post);
    }
  })
);

module.exports = router;
