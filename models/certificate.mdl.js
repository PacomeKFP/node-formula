const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CertificateSchema = new Schema({
  name: { type: String },
  domain: { type: String },
  emitter: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },
});
// Compile model from schema
var Certificate = mongoose.model("certificates", CertificateSchema);

module.exports = { Certificate };
