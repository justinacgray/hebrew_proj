require("dotenv").config();

//bringing in packages/libraries
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
// const multer3 = require("multer-s3");
// const aws = require("aws-sdk");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "public");
//   },
//   filename: (req, file, callback) => {
//     const parts = file.mimetype.split("");
//     callback(null, `${(file, fieldname)}-${Date.now()}.${parts[1]}`);
//   },
// });
// const upload = multer({ storage });

// app.use(express.static("public"));
// const port = 8000;

//configure things
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./config/mongoose.controller")(process.env.DB_NAME);
//routes should be one of the last things used
require("./routes/user.routes")(app);

app.listen(process.env.DB_PORT, () =>
  console.log(`Listening on port: ${process.env.DB_PORT}`)
);
