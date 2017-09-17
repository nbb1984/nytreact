// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var helpers = require("../utils/helpers");
var Search = React.createClass({
 // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: ""};
  },
  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getSavedArticles().then(function(response) {
      console.log(response);
      if (response !== this.state.results) {
        console.log("History", response);
        this.setState({ history: response});
      }
    }.bind(this));
  },
    // This function will respond to the user input
  handleChange: function(event) {
    this.setState({ searchTerm: event.target.value });
  },
  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    helpers.runQuery(this.state.searchTerm)
    .then(function(data) {
      if (data !== this.state.results) {
        console.log("search results", data);
        this.setState({ results: data });
      }
    }.bind(this));
  },
  
  render: function() {
    const that = this;
    var kid;
    const children = React.Children.map(this.props.children, function(child) {
            kid = React.cloneElement(child, { results: that.state.results, searchTerm: that.state.searchTerm});
          });
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-primary text-center">
            <div className="panel-heading">
              <h3 className="panel-title">Search</h3>
            </div>
            <div className="panel-body">
            <div className="panel-body text-center">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <h4 className="">
                    <strong>Search for Articles</strong>
                  </h4>
                  {/*
                    Note how each of the form elements has an id that matches the state.
                    This is not necessary but it is convenient.
                    Also note how each has an onChange event associated with our handleChange event.
                  */}
                  <input
                    value={this.state.term}
                    type="text"
                    className="form-control text-center"
                    id="term"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <button
                    className="btn btn-default blue"
                    type="submit"
                    style= {{backgroundColor:"#addfff", color: "#512da8"}}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
              <p>
                <Link to="/Search/Query"><button className="btn btn-warning btn-sm">Query</button></Link>
                <Link to="/Search/Results"><button className="btn btn-success btn-sm">Results</button></Link>
              </p>

             <div>{kid}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Search;