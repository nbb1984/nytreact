// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Require Article Schema
var Article = require("./models/Article");
// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('public'));
// -------------------------------------------------
// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://admin:codingrocks@ds023664.mlab.com:23664/reactlocate");
var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// -------------------------------------------------
// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {
  // We will find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).sort([
    ["date", "descending"]
  ]).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("got this far");
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each article.
app.post("/api/saved/", function(req, res) {
  Article.create(req.body, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Article Saved");
    }
  });
});
// Code to delete all of the articles.  
app.delete("/api/saved/delete/:id", function(req, res) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(req.params.id);
      // Remove all articles from the database
       Article.findByIdAndRemove(req.params.id, function(err, doc){
        console.log(doc);
            // Send any errors to the browser
            if (err) {
              res.send(err);
            }
            // Or send the doc to the browser
            else {
              Article.find({}).exec(function(error, newdoc){
                if (error) {
                  res.send(error);
                } 
                else {
                  res.json(newdoc);
                }
              });
                
            }
            
          });        
});
// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});