// Include React
var React = require("react");
var Query = React.createClass({
    // Here we set a generic state associated with the text being searched for

  render: function() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Query</h3>
        </div>
            <div className="panel-body text-center">
                <p>{this.props.searchTerm}</p>

            </div>
      </div>
    );
  }
});
module.exports = Query;