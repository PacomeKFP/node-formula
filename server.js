const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./models/dbConfig.js");
const { userRouter } = require("./controllers/user.ctrl");
const { educationRouter } = require("./controllers/education.ctrl");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/education", educationRouter);


app.listen(5500, () => {
  console.log("Server running on port 5500");
});
