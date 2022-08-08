const mongoose = require("mongoose");


//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://pacomekfp:shopapp@cluster0.dcp8x.mongodb.net/dataclevers";
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
