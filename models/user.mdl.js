const { json } = require("express");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  surname: { type: String, required :true },
  name: { type: String },
  username: { type: String },
  birthday: { type: Date},
  email: { type: String, required :true },  
  // password: { type: String },
  username: { type: String },
  biography: { type: String },
  interest: [{ type: String }],
  language: { type: String },
  educations : [{type: mongoose.Types.ObjectId}],
  experiences : [{type: mongoose.Types.ObjectId}],
  certificates : [{type: mongoose.Types.ObjectId}],
  competences : [{type: mongoose.Types.ObjectId}],


  date: {
    type: Date,
    default: Date.now(),
  },
});
// Compile model from schema
var User = mongoose.model("users", UserSchema);

module.exports = { User };
