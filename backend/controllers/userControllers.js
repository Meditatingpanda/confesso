const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const updateUser = asyncHandler(async (req, res) => {
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
});


const deleteUser=asyncHandler(async (req, res) => {
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

  module.exports={updateUser,deleteUser}