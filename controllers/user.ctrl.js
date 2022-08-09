const userRouter = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;
const {db} = require('../models/dbConfig')
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

userRouter.get("/update/:user_id/:field/:field_id", (req, res) => {
  // let field = req.params.field;
  let { user_id, field, field_id } = req.params;
  if (!ObjectId.isValid(user_id) || !ObjectId.isValid(field_id))
    return res
      .status(400)
      .send(`Not valid Id user-> ${user_id} OR ${field}-> ${field_id}`);
  
      User.findById(user_id, (err, docs) => {
    try {
      let user = docs;
      user.education.push(ObjectId(field_id));
      User.findByIdAndUpdate(
        user_id,
        { $set: user },
        { upsert: true },
        (err, docs) => {
          var response = docs;
          console.log(response);
          response.educations = new Array();
          let a = new Array(); 
          for (let i = 0; i < docs.education.length; i++) {
            if (ObjectId.isValid(docs.education[i])) {
              console.log("valid");
              
              Education.findById(docs.education[i], (err, doc) => {
                response.educations.push(doc);
                a.push(doc);
                // console.log(response.educations);
                console.log(a);
              });
            }
          }
          console.log(a);
          console.log(response.educations);
          if (!err) res.send(response);
          else console.log(err);
        }
      );
      // console.log(user);
      // User.aggregate(
      //   [
      //     {
      //       $lookup: {
      //         from: "educations",
      //         localField: "education",
      //         foreignField: "_id",
      //         as: "educations",
      //       },
      //     },
      //   ],
      //   (err, docs) => {
      //     console.log("docs");
      //     if (!err) res.send(docs);
      //     else console.log(err);
      //   }
      // );
    } catch (err) {
      return res.send(err);
    }
  });
});


userRouter.get("/agregation", (req, res) => {
   User.aggregate([
    {
      $lookup: {
        from: "educations",
        localField: "education",
        foreignField: "_id",
        as: "educations",
      },
    },
  ], (err, docs)=>{
    res.send(docs)
    console.log(err)
  })
}); 
module.exports = { userRouter };
