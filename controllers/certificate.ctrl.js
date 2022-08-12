const certificateRouter = require("express").Router();
const { Certificate } = require("../models/certificate.mdl");

//get All Certificates
certificateRouter.get("/", (req, res) => {
  Certificate.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});

// go to the Certificate registration formular for the user_id specified
certificateRouter.get("/:user_id", (req, res) => {
  return res.sendFile("views/certificate.html", { root: "." });
});

//add a new Certificate to an user with the specified id
certificateRouter.post("/:user_id", (req, res) => {
  let certificate = new Certificate(req.body);
  certificate.save();
  return res.redirect(
    `/user/push/${req.params.user_id}/certificates/${certificate._id}/${req.body.action}`
  );
});

module.exports = { certificateRouter };
