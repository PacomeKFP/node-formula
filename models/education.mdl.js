const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EducationSchema = new Schema({
  diploma: { type: String },
  domain: { type: String },
  school: { type: String },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date, default: Date.now() },
  date: {
    type: Date,
    default: Date.now(),
  },
});
// Compile model from schema
var Education = mongoose.model("educations", EducationSchema);

module.exports = { Education };
