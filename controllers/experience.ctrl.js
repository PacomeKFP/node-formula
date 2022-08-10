const educationRouter = require("express").Router();
const path = require("url");
const ObjectId = require("mongoose").Types.ObjectId;

const { Education } = require("../models/education.mdl");
const { User } = require("../models/user.mdl");
const { userRouter } = require("./user.ctrl");

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
  User.findById(req.params.user_id, (err, docs) => {
    if (!err) {
      if (docs == null) {
        res.statusCode = 400;
        res.statut(400).json({
          statuts: "not found",
          data: "Unable to reach user with id " + req.params.user_id,
        });
      } else {
        let education = new Education(req.body);
        education.save();
        return res.redirect(
          `/user/push/${req.params.user_id}/education/${education._id}`
        );
      }
    } else {
      res.statusCode = 500;
      res.send(err);
    }
  });
});

module.exports = { educationRouter };
