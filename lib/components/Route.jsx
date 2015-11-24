import React from 'react';

class Route extends React.Component {

  render() {
    return null;
  }

}

Route.propTypes = {
  name: React.PropTypes.string.isRequired,
  pattern: React.PropTypes.string.isRequired,
  handler: React.PropTypes.func.isRequired
};

Route.defaultProps = {
  name: null
};

export default Route;
