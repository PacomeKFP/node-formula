const userRouter = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models/user.mdl");
const { Education } = require("../models/education.mdl");

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
    res.setHeader("Type-Content", "application/json");
    // res.status(200).json({
    //   status: "Success",
    //   data: user,
    // });
    res.redirect(`/education/${user._id}`);
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
    { $push: { education: ObjectId(field_id) } },
    { upsert: true },
    (err, doc) => {
      return res.send(doc);
    }
  );
});

//get an user
userRouter.get("/:id", (req, res) => {
  const matchUser = { $match: { _id: ObjectId(req.params.id) } };

  let fields = ['education', 'experience', 'certificates', 'competences']
  //il faudra itterer sur ce lookup pour fablriquer tous les autres
  var lookups = [
    {
      $lookup: {
        from: "education" + "s",
        localField: "education",
        foreignField: "_id",
        as: "education",
      },
    },
    
  ];
  User.aggregate([matchUser, ...lookups], (err, doc) => {
    res.send(doc);
  });
});

module.exports = { userRouter };
