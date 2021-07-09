var mongoose = require("mongoose"); 
// ahPADMcfGATqrtjp
// Define schema
var Schema = mongoose.Schema;

var Exercise = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number
});

var Workout = new Schema({
  day: Date,
  exercises: [Exercise],
});

// Compile model from schema
module.exports = mongoose.model("Workout", Workout);
