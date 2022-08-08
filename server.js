const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { User } = require("./models/userModel");
require("./models/dbConfig.js");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/get", (req, res) => {
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});
app.post("/", (req, res) => {
  try {
    let user = new User(req.body);
    // user.save(); 
    res.setHeader('Type-Content', 'application/json')
    res.status(200).json({
      status: "Success",
      data: user,
    });  
  } catch (err) {
    res.send(err);
  }
});
app.listen(5500, () => {
  console.log("Server running on port 5500");
});
