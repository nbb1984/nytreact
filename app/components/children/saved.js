// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var moment = require("moment");

var Saved = React.createClass({
  getInitialState: function () {
    return {arts: []};
  },
  
  componentDidMount: function() {

    var that = this;
    helpers.getSavedArticles().then(function(arts) {
      if (arts){
        that.setState({arts: arts.data});
        //console.log(this.state.arts);
      }
    });
  },

  handleDelete: function (event) {

    var that = this;
    console.log(event.target.value);
    helpers.deleteSavedArticle(event.target.value).then(function(result){
      that.setState({arts: result.data});
    });
  }, 

  render: function() {
    var that = this;
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Saved</h3>
            </div>
             <div className="panel-body text-center">
                {/* Here we use a map function to loop through an array in JSX */}
                {that.state.arts.map(function(art, i) {
                  console.log(art);
                  return (
                    <div className="panel-body text-center" key = {i}>
                        <p>{art.title}</p>
                        <p><a href={art.url}>{art.url}</a></p>
                        <p>{moment().format(art.date)}</p>
                        <button type="button" className="btn btn-default" onClick={that.handleDelete}  value={art._id}>Delete</button>
                    </div>
                  );
                })}
              </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Saved;