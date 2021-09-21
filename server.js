const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());


const connect = async () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/movies")
}

const movieSchema = new  mongoose.Schema({
    id : {type : Number, required: true},
    movie_name : {type : String, required : true},
    movie_genre: {type : String, required : true},
    production_year: {type : Number, required : true},
    budget : {type : Number, required : true}
})


const Movie = mongoose.model("movie", movieSchema);



//See all movies

app.get("/show", async (req, res) => {
    const movie = await Movie.find().lean().exec();
    return res.status(200).send({movie});
})


//add a new movie
app.post("/add", async(req, res) => {
    const movie = await Movie.create(req.body);
    return res.status(201).send({movie});
})

// get a single movie 

app.get("/movie/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).send({movie});
})


//update a movie 
app.patch("/updat/:id", async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new : true});
    return res.status(200).send({movie});
})


//delete a movie
app.delete("/delete/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).send(movie);
})




app.listen(1234, async function() {
    await connect();
    console.log("listen on port 1234");
})