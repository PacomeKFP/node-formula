const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
  title: { type: String },
  employer: { type: String },
  employerUrl: { type: String },
  employerContact: { type: String },
  domain: { type: String },
  startDate: { type: String, default: Date.now() },
  endDate: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },
});
// Compile model from schema
var Experience = mongoose.model("experiences", ExperienceSchema);

module.exports = { Experience };
