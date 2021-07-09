var express = require ("express");
var path = require("path"); 
var Workout = require("./models");
var mongoose = require("mongoose");
const { request } = require("http");

//var dbUrl = "mongodb://localhost/workoutdb"; 
var dbUrl =
  "mongodb+srv://clouis:ahPADMcfGATqrtjp@cluster0.4m8lm.mongodb.net/test"; 

var app = express(); 
let PORT = process.env.PORT || 80; 
mongoose.connect(dbUrl); 


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use (express.static("public"));

let count = 0; 


app.get("/stats", (req, res) => {
 res.sendFile(path.join(__dirname, "public/stats.html"));
}); 

app.get("/exercise", (req, res) => {
    res.sendFile( path.join(__dirname,"public/exercise.html")); 
}); 


app.get("/api/workouts/range", (req, res) => {
  console.log(req.body);
  res.json({ exercises: [{ completed: true }] });

});
 app.get("/api/workouts", (req, res) => {
  console.log(req.body);
    Workout.find({}).exec(function(err,workouts){
        console.log([workouts[workouts.length-1]]); 
        res.json([workouts[workouts.length - 1]]);
    })
}); 

app.post("/api/workouts", (req, res) => {
    console.log("ADDING WORKOUT");
    let newWorkout = new Workout(); 
    newWorkout.day = new Date(); 
    newWorkout.exercises = []; 
   newWorkout.save((err, workout) => {

     if (err){

         console.log(err); 
         res.send("Error in saving workout"); 
     }else {
         console.log("workout was added"); 
         console.log(workout); 
         res.send(workout);

     }
   }); 
}); 

app.put("/api/workouts/:id", (req, res) => {
    const id_p = req.params.id; 
    console.log("ID FOR THIS WORKOUT", id_p); 
    let newExercise = req.body; 
    console.log("Exercise data to be added", newExercise); 
   // let existingWorkout = Workout.findById(id_p);
    ///console.log(existingWorkout.exercises); 

    //existingWorkout.exercises.push(newExercise); // adds new exercise 
    let updatedDoc = Workout.findByIdAndUpdate(id_p, {$push: {"exercises": newExercise}}, {
        safe: true, 
        upsert: true, 
        rawResult: true
    }, (err, updatedWk) => {

        console.log("UPDATED DOC", updatedWk);
        res.json(updatedWk);
    } ); 
}); 



app.get("/:var", (req, res) => {
    res.json({"date": new Date(), "count": ++count ,"var": req.params.var}); 
}); 


app.listen(PORT, ()=> {
    console.log(`application using ${PORT} is running.`); 
}); 