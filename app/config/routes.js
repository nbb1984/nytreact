// Inclue the React library
var React = require("react");
// Include the react-router module
var router = require("react-router");
// Include the Route component for displaying individual routes
var Route = router.Route;
// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;
// Including router.Redirect so that we can change pages after certain conditions are met.
var Redirect = router.Redirect;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;
// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;
// Reference the high-level components
var Main = require("../components/Main");
var Saved = require("../components/children/Saved");
var Search = require("../components/children/Search");

// Export the Routes
module.exports = (
  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      {/* If user selects Search then show the appropriate component*/}
      <Route path="Search" component={Search}>
      </Route>
      {/* If user selects Search then show the appropriate component*/}
      <Route path="Saved" component={Saved} />
      {/* If user selects any other path... we get the Home Route */}
      <IndexRoute component={Search} />
    </Route>
  </Router>
);
