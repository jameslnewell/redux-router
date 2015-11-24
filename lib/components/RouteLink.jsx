import React from 'react';
import invariant from 'invariant';

function assemble(pattern, params) {
  return pattern;
}

export default class RouteLink extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }

  getHref() {
    const {name, params} = this.props;
    const {routes} = this.context;

    //find the pattern (by name) for the route
    const pattern = routes.reduce((found, nextRoute) => {
      if (nextRoute.name === name) {
        return nextRoute.pattern;
      }
      return found;
    }, null);

    //ensure a route was found with the name
    invariant(pattern, `A route named "${name}" was not found.`);

    return assemble(pattern, params);
  }

  getClassName() {

  }

  handleClick(event) {
    if (this.context.location) {
      event.preventDefault();
      this.context.location.navigate(this.getHref());
    }
  }

  render() {
    const {name, params, ...props} = this.props;
    return <a href={this.getHref()} onClick={this.handleClick} {...props}/>;
  }

}

RouteLink.propTypes = {
  name: React.PropTypes.string.isRequired,
  params: React.PropTypes.object
};

RouteLink.defaultProps = {
  params: {}
};

RouteLink.contextTypes = {

  route: React.PropTypes.shape({
    name: React.PropTypes.string,
    params: React.PropTypes.object
  }).isRequired,

  routes: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    pattern: React.PropTypes.string.isRequired,
    handler: React.PropTypes.func.isRequired
  })).isRequired

};
