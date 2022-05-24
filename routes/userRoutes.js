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

//get a user by id
router.get('/:id',asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
      res.status(400)
      throw new Error('user not found');
    }
    const {password,createdAt,updatedAt,...others}=user._doc
    res.status(200).json(others);

}))

//follow a user
router.put('/:id/follow',asyncHandler(async(req,res)=>{
   

}))

//unfollow a user

module.exports = router;
