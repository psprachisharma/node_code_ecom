var React = require('react');

var Error = React.createClass({
  render: function() {
    return <div><h1>{this.props.message}</h1>
    <h2>{this.props.error.status}</h2></div>;
  }
});

module.exports = Error;