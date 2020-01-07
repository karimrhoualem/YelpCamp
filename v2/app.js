var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Beaver Lake", 
// 	image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg",
// 	description: "This is a blah b;lah"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND");
// 		console.log(campground);
// 	}
// });

var campgrounds = [
	{name: "Salmon Creek", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Beaver Lake", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Lakota River", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Bear Nile", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Moose Ridge", image: "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Eagle Camp", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Bear Nile", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Moose Ridge", image: "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"},
	{name: "Eagle Camp", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277adc9744c25e_340.jpg"}
];

app.get("/", function(req, res){
	res.render("landing")
});

//INDEX -  show all campgrounds
app.get("/campgrounds", function(req,res){	
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});		
		}
	});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");	
		}
	})
});

app.get("/campgrounds/new", function(req,res){
	res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
	//find the camground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The YelpCamp Server has Started!");
});