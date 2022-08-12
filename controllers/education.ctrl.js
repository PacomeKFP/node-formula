const educationRouter = require("express").Router();
const { Education } = require("../models/education.mdl");

//get All educations
educationRouter.get("/", (req, res) => {
  Education.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});

// go to the education registration formular for the user_id specified
educationRouter.get("/:user_id", (req, res) => {
  return res.sendFile("views/education.html", { root: "." });
});

//add a new education to an user with the specified id
educationRouter.post("/:user_id", (req, res) => {
  let education = new Education(req.body);
  education.save();
  return res.redirect(
    `/user/push/${req.params.user_id}/educations/${education._id}/${req.body.action}`
  );
});

module.exports = { educationRouter };
