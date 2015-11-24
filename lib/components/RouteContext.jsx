import React from 'react';

export default class RouteContext extends React.Component {

  getChildContext() {
    const {route, routes} = this.props;
    return {
      route,
      routes,
      navigate: url => dispatch(navigate(url, routes))
    };
  }

  render() {
    const {handler: Handler, route: {params}} = this.props;
    return <Handler {...params}/>;
  }

}

RouteContext.propTypes = {

  route: React.PropTypes.shape({
    name: React.PropTypes.string,
    params: React.PropTypes.object
  }).isRequired,

  routes: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    pattern: React.PropTypes.string.isRequired,
    handler: React.PropTypes.func.isRequired
  })).isRequired,

  handler: React.PropTypes.func.isRequired

};

RouteContext.childContextTypes = {

  route: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    params: React.PropTypes.object.isRequired
  }),

  routes: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    pattern: React.PropTypes.string.isRequired,
    handler: React.PropTypes.func.isRequired
  })).isRequired,

  navigate: React.PropTypes.func.isRequired

};

