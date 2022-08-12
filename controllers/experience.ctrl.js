const experienceRouter = require("express").Router();
const { Experience } = require("../models/experience.mdl");

//get All experiences
experienceRouter.get("/", (req, res) => {
  Experience.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});

// go to the experience registration formular for the user_id specified
experienceRouter.get("/:user_id", (req, res) => {
  return res.sendFile("views/experience.html", { root: "." });
});

//add a new experience to an user with the specified id
experienceRouter.post("/:user_id", (req, res) => {
  let experience = new Experience(req.body);
  experience.save();
  return res.redirect(
    `/user/push/${req.params.user_id}/experiences/${experience._id}/${req.body.action}`
  );
});

module.exports = { experienceRouter };
