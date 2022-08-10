const { json } = require("express");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  surname: { type: String, required :true },
  name: { type: String },
  birthday: { type: Date},
  email: { type: String, required :true },  
  // password: { type: String },
  username: { type: String },
  biography: { type: String },
  interest: [{ type: String }],
  language: { type: String },
  educations : [{type: mongoose.Types.ObjectId}],
  experiences : [{type: mongoose.Types.ObjectId}],

  date: {
    type: Date,
    default: Date.now(),
  },
});
// Compile model from schema
var User = mongoose.model("users", UserSchema);

module.exports = { User };

/**
 * 
 * 
 education: [
    {
      diploma: { type: String },
      domain: { type: String },
      school: { type: String },
      startDate: { type: String, default: Date.now() },
      endDate: { type: String, default: Date.now() },
    },
  ],

  experience: [
    {
      title: { type: String },
      employer: { type: String },
      employerUrl: { type: String },
      employerContact: { type: String },
      domain: { type: String },
      startDate: { type: String, default: Date.now() },
      endDate: { type: String },
    },
  ],

  */