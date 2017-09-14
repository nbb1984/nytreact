// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var helpers = require("../utils/helpers");
var Login = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return {searchTerm: ""};
  },

   // The moment the page renders find out if the user just registered by pulling from sessionStorage
  componentWillMount: function() {

  },


  handleChangeSearch: function(event) {
    this.setState({ searchTerm: event.target.value});
  },
 // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    helpers.searchArticles(this.state.searchTerm);
    // Set the parent to have the search term
    this.setState({ term: "" });
  },
  render: function() {
      return (
        <div className="container">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Log-In Form</h3>
              </div>
              <div className="panel-body">
                  <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    {/*
                      Note how each of the form elements has an id that matches the state.
                      This is not necessary but it is convenient.
                      Also note how each has an onChange event associated with our handleChange event.
                    */}

                    <input
                      value={this.state.searchTerm}
                      type="password"
                      placeholder= "password"
                      className="form-control text-center"
                      id="username"
                      onChange={this.handleChangeSearch}
                      required
                    />
                    <br />
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  
});
module.exports = Login;