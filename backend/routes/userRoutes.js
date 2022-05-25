const router = require("express").Router();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
//update user
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    //find the user by id
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      const user = await User.findById({ _id: req.params.id });
      console.log(req.body);
      if (!user) {
        res.status(400);
        throw new Error("User Doesnot Exits");
      }
      if (req.body.password) {
        const hashpwd = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashpwd;
      }

      //update details of user
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(400).json("Account updated");
    } else {
      res.status(403);
      throw new Error("Cant Acces Other A/c");
    }
  })
);

//delete user
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    //find the user by id
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      const user = await User.findById({ _id: req.params.id });
      if (!user) {
        res.status(400);
        throw new Error("User Doesnot Exits");
      }

      //delete ac
      await User.deleteOne({ _id: req.params.id });
      res.status(400).json("Account updated");
    } else {
      res.status(403);
      throw new Error("Cant Acces Other A/c");
    }
  })
);

//get a user by query
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const userName = req.query.userName;

    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: userName });
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
    const { password, createdAt, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  })
);

//follow a user
router.put(
  "/:id/follow",
  asyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id) {
      res.status(403);
      throw new Error("you cant follow yourself");
    } else {
      const currentUser = await User.findById(req.body.userId);
      const user = await User.findById(req.params.id);
      //cu follows user => user followers cu
      if (user.followers.includes(currentUser._id)) {
        res.status(403);
        throw new Error("You already following");
      } else {
        await currentUser.updateOne({
          $push: {
            following: req.params.id,
          },
        });
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        res.status(200).json({ msg: "user has been followed" });
      }
    }
  })
);

//unfollow a user
router.put(
  "/:id/unfollow",
  asyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id) {
      res.status(403);
      throw new Error("you cant unfollow yourself");
    } else {
      const currentUser = await User.findById(req.body.userId);
      const user = await User.findById(req.params.id);
      //cu follows user => user followers cu
      if (user.followers.includes(currentUser._id)) {
        //remove that user from current user followings
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(400);
        throw new Error("First Follow");
      }
    }
  })
);

module.exports = router;
