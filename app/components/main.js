// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var Main = React.createClass({
  // Here we render the function
  render: function() {
    console.log(this.props.children);
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h2><strong>New York Times React</strong></h2>
          <p><em>Get the Latest News</em></p>
          <hr />
          <p>
            <Link to="/Search"><button className="btn btn-default">Search</button></Link>
            <Link to="/Saved"><button className="btn btn-default">Saved</button></Link>
          </p>
        </div>
        <div className="row">
          {/* This code will dump the correct Child Component */}
          {this.props.children}
        </div>
      </div>

    );
  }
});
// Export the component back for use in other files
module.exports = Main;