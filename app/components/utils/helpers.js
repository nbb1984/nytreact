var axios = require("axios");
var helper = {
  // This logs in.
  searchArticles: function(username, password) {
      // Geocoder API
      var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

      // Helper functions for making API Calls
      var helper = {
        // This function serves our purpose of running the query to geolocate.
        runQuery: function(location) {
          console.log(location);
          // Figure out the geolocation
          var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
                authKey + "&q=";
          return axios.get(queryURL).then(function(response) {
            // If get get a result, return that result's formatted address property
            if (response.data.results[0]) {
              return response.data.results;
            }
            // If we don't get any results, return an empty string
            return "";
          });
      }
    }
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function(article) {
    console.log(username);
    return axios.get("/api/saved");
  },
  deleteSaved: function(article) {
    console.log('register user');
    return axios.post("/api/saved" + article);

  }

};
// We export the API helper
module.exports = helper;