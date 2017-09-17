// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
// Geocoder API
var authKey = "773715afedf64e6e892dc4d4f8b41ebd";
// Helper functions for making API Calls
var helper = {
  // This function serves our purpose of running the query to geolocate.
  runQuery: function(search) {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
          authKey + "&q=" + search;

    return axios.get(queryURL).then(function(res) {
      console.log(res);
      console.log(res.data.response.docs);
      return res.data.response.docs;
    });

  },
  saveArticle: function(headline, url, date) {
    console.log(headline, url, date);
    return axios.post("api/saved/", {title: headline, url: url, date: date});
  },
  // This function hits our own server to retrieve the record of query results
  getSavedArticles: function() {
    return axios.get("/api/saved");
  },
  // This function posts new searches to our database.
  deleteSavedArticle: function(id) {
    console.log(id);
    return axios.delete("/api/saved/delete/" + id);
  }
};
// We export the API helper
module.exports = helper;