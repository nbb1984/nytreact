// Include React
var React = require("react");
var helpers = require("../../utils/helpers");
var Results = React.createClass({
  // When a user submits...
  handleSave: function(event) {
    var that = this;
    var i = event.target.value;
    var res = this.props.results[i];
    var headline = res.headline.main;    
    var url = res.web_url;
    var date = res.pub_date;    
    helpers.saveArticle(headline, url, date).then(function(msg) {
      document.getElementById(i).setAttribute("style", "color:pink");
    });
  },

  render: function() {
    var that = this;
    var results = that.props.results;
    console.log(results);
    if (results.length === 0) {
        results= [];
    }
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Results - {this.props.searchTerm}</h3>
        </div>
         <div className="panel-body text-center">
            {/* Here we use a map function to loop through an array in JSX */}
            {results.map(function(search, i) {
              console.log(search.headline.web_url);
              return (
                <div className="panel-body text-center" key = {i}>
                    <p>{search.headline.main}</p>
                    <p><a href={search.web_url}>{search.web_url}</a></p>
                    <p>{search.pub_date}</p>
                    <button type="button" className="btn btn-default" id = {i} onClick= {that.handleSave} value={i}>Save</button>
                </div>
              );
            })}
          </div>
      </div>
    );
  }
});
module.exports = Results;