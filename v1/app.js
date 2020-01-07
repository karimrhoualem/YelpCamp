var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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

app.get("/campgrounds", function(req,res){	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The YelpCamp Server has Started!");
});