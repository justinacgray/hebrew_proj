const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require("./routes/hebrew_app");
require("./config/mongoose.config");

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
const port = 8000;

routes(app);
app.listen(port, () => console.log(`Listening on port: ${port}`));




