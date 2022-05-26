const router = require("express").Router();
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All field are mandetory");
    }

    //find user
    const existUser = await User.findOne({ username });
    if (existUser) {
      res.status(400);
      throw new Error("user already exits");
    }
    //create new user
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPwd,
    });
    res.status(200).json({ user });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields mandetory");
    }
    //find the user
    const user = await User.findOne({ email });

    //user doesnot exits or password not correct
    if (!user) {
      res.status(404);
      throw new Error("User Not Found");
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      res.status(400);
      throw new Error("Bad Credentials");
    } else {
      const { password, ...other } = user._doc;
      res.status(200).json({ ...other });
    }
  })
);

module.exports = router;
