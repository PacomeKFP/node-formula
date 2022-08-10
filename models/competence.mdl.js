const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CompetenceSchema = new Schema({
  title: { type: String },
  domain: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },
});
// Compile model from schema
var Competence = mongoose.model("competences", CompetenceSchema);

module.exports = { Competence };
