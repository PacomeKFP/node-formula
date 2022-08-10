const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./models/dbConfig.js");

const { userRouter } = require("./controllers/user.ctrl");
const { educationRouter } = require("./controllers/education.ctrl");
const { experienceRouter } = require("./controllers/experience.ctrl");
const { certificateRouter } = require("./controllers/certificate.ctrl");
const { competenceRouter } = require("./controllers/competence.ctrl"); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/educations", educationRouter);
app.use("/experiences", experienceRouter);
app.use("/certificates", certificateRouter);
app.use("/competences", competenceRouter);
app.get("/download", (req, res)=>{
  res.sendFile('views/download.html', {root : '.'});
})

app.get("/*", (req, res) => {
  res.redirect("/user");
});
app.listen(5500, () => {
  console.log("Server running on port 5500");
});
