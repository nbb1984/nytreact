// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Saved = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    console.log('got state?');
    return {savedArticles: []};
  },
  componentWillMount: function() {
    // Get the latest history.
    helpers.getSaved().then(function(response) {
      console.log(response);
        console.log("Saved", response.data);
        this.setState({ savedArticles: response.data });
    }.bind(this));
  },



  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Search Results</h3>
            </div>
            <div className="panel-body">
              <div className="panel-body text-center">
                 {/* Here we use a map function to loop through an array in JSX */}
                  {this.props.history.map(function(search, i) {
                    return (
                    <div className = "results">
                      <p key={i}>{search.title}</p>
                      <p key={i}>{search.date}</p>
                      <p key={i}>{search.url}</p>
                    </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Saved;