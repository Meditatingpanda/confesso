const express = require("express");
const app = express();
const colors = require("colors");
const PORT = process.env.PORT || 5500;
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDb = require("./config/db");
connectDb();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(helmet());
app.use(morgan("common")); //logger

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`.cyan);
});
