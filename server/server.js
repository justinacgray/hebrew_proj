require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const port = 8000;

require("./routes/user.routes")(app);
require("./config/mongoose.config")(process.env.DB_NAME);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(process.env.DB_PORT, () =>
  console.log(`Listening on port: ${process.env.DB_PORT}`)
);
