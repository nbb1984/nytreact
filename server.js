/* Showing Mongoose's "Populated" Method
 * =============================================== */
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Comment and Article models
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  // extended: false
}));
// Make public a static dir
app.use(express.static("public"));
// Database configuration with mongoose
mongoose.connect("mongodb://heroku_pl9c1s4h:4tn9t6src5l18f8ie9gp7070hr@ds129394.mlab.com:29394/heroku_pl9c1s4h");
var db = mongoose.connection;
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// Routes
// ==============================

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/api/saved", function(req, res) {
  //Remove all articles except for the saved ones 
      Article.find({}, function(error, doc) {
          // Log any errors
          if (error) {
            console.log(error);
          }
          // Or send the doc to the browser as a json object
          else {
            // Render the handlebars template
            res.json(doc);
          }
      });
  });

app.post("/api/saved", function(req, res) {

        var newArticle = new Article(req.body);
        newArticle.save(function(error, doc) {
          // Log any errors
          if (error) {
            console.log(error);
          }
          // Or send the doc to the browser as a json object
          else {
            res.json(doc);
          }
      });
  });

// Code to delete all of the articles.  
app.get("/clear/:title", function(req, res) {
      // Remove all articles from the database
       Article.remove({title: req.params.title}).exec(function(err, doc) {
            // Send any errors to the browser
            if (err) {
              res.send(err);
            }
            // Or send the newdoc to the browser
            else {
              res.json(doc);
            }
            
          });
    });

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});