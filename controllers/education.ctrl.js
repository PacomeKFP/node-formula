const educationRouter = require("express").Router();
const path = require("url");
const ObjectId = require("mongoose").Types.ObjectId;

const { Education } = require("../models/education.mdl");
const { User } = require("../models/user.mdl");
const { userRouter } = require("./user.ctrl");

// go to the education registration formular
educationRouter.get("/:id", (req, res) => {
  res.sendFile("views/education.html", { root: "." });
});

//See all users
educationRouter.get("/get", (req, res) => {
  Education.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});

//create new user
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
        // create the new educaion instance and save it
        let education = new Education(req.body);
        education.save();
        //call the method od the UserCtrl router whith the education doc_id

        let id = education._id;
        return res.redirect(`/user/update/${req.params.user_id}/education/${education._id}`)

      }
    } else {
      res.statusCode = 500;
      res.send(err);
    }
  });
});

module.exports = { educationRouter };
