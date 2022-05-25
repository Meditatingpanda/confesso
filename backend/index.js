const express = require("express");
const app = express();
const colors = require("colors");
const PORT = process.env.PORT || 5500;
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDb = require("./config/db");
let cors=require('cors');
connectDb();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common")); //logger

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`.cyan);
});
