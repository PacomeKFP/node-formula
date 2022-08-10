const competenceRouter = require("express").Router();
const { Competence } = require("../models/competence.mdl");

//get All Competences
competenceRouter.get("/", (req, res) => {
  Competence.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});

// go to the Competence registration formular for the user_id specified
competenceRouter.get("/:user_id", (req, res) => {
  return res.sendFile("views/competence.html", { root: "." });
});

//add a new Competence to an user with the specified id
competenceRouter.post("/:user_id", (req, res) => {
  let competence = new Competence(req.body);
  competence.save();
  return res.redirect(
    `/user/push/${req.params.user_id}/competences/${competence._id}`
  );
});

module.exports = { competenceRouter };
