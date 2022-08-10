const userRouter = require("express").Router();
const fs = require("fs");
const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models/user.mdl");

let fields = Array("educations", "experiences", "certificates", "competences");
let lookups = fields.map((field) => {
  return {
    $lookup: {
      from: field,
      localField: field,
      foreignField: "_id",
      as: field,
    },
  };
});

// go to the user registration formular
userRouter.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: "." });
});

//See all users
userRouter.get("/get", (req, res) => {
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Error occured" + err);
  });
});

//create new user
userRouter.post("/", (req, res) => {
  try {
    let user = new User(req.body);
    user.save();
    res.redirect(`/${fields[0]}/${user._id}`);
  } catch (err) {
    res.send(err);
  }
});

userRouter.get("/push/:user_id/:field/:field_id", (req, res) => {
  // let field = req.params.field;
  let { user_id, field, field_id } = req.params;
  if (!ObjectId.isValid(user_id) || !ObjectId.isValid(field_id))
    return res
      .status(400)
      .send(`Not valid Id user-> ${user_id} OR ${field}-> ${field_id}`);

  User.updateOne(
    { _id: ObjectId(user_id) },
    { $push: { [field]: ObjectId(field_id) } },
    { upsert: true },
    (err, doc) => {
      if (err) return res.send(err.status).send("An error occured : \n" + err);
      let index = fields.indexOf(field);
      console.log(index);
      index++;
      if (index == fields.length) {
        let matchUser = { $match: { _id: ObjectId(user_id) } };

        User.aggregate([matchUser, ...lookups], (err, doc) => {
          fs.writeFile(`data/user.json`, JSON.stringify(doc), (err) => {
            if (err) console.log(err);
          });
        });

        index = 0;
      }
      return res.redirect(`/${fields[index]}/${user_id}`);
    }
  );
});

//get an user
userRouter.get("/:id", (req, res) => {
  let matchUser = { $match: { _id: ObjectId(req.params.id) } };

  User.aggregate([matchUser, ...lookups], (err, doc) => {
    res.send(doc);
  });
});

module.exports = { userRouter };
