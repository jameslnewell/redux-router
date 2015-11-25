import React from 'react';
import RouteContext from './RouteContext';

import match from '../match';

/**
 * Extract the route data
 * @param   {object} elements
 * @returns {Array<object>}
 */
function extract(elements) {
  return React.Children.map(elements, element => {
    if (React.isValidElement(element)) {

      //TODO: check element is type of Route

      return {
        name: element.props.name,
        pattern: element.props.pattern,
        handler: element.props.handler
      };

    }
  }) || [];
}

const defaultRoute = {
  name: '',
  params: {}
};

class Router extends React.Component { //TODO: connect the form here

  constructor(...args) {
    super(...args);

    //initialise the location
    if (this.props.location) {
      this.location = this.props.location;
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentWillMount() {

    //start listening for location changes
    if (this.location) {
      this.location
        .register()
        .on('changed', this.handleLocationChange)
      ;
    }

  }

  componentWillUnmount() {

    //stop listening for location changes
    if (this.location) {
      this.location
        .off('changed', this.handleLocationChange)
        .unregister()
      ;
    }

  }

  getRoutes() {
    return []
      .concat(extract(this.props.children))
      .concat(extract(this.props.routes))
    ;
  }

  handleLocationChange(url) {
    console.log(match(url, this.getRoutes())); //TODO: dispatch here
  }

  render() {
    const {route} = this.props;

    //extract the routes
    const routes = this.getRoutes();

    //find the handler (by name) for the current route
    const handler = route ? routes.reduce((found, nextRoute) => {
      if (nextRoute.name === route.name) {
        return nextRoute.handler;
      }
      return found;
    }, null) : null;

    //check if a handler for the current route was found
    if (!handler) {
      return <div>Route not found</div>;
    }

    //render the handler for the current route
    return <RouteContext route={{...defaultRoute, ...route}} routes={routes} handler={handler}/>;
  }

}

Router.propTypes = {
  route: React.PropTypes.shape({
    name: React.PropTypes.string,
    params: React.PropTypes.object
  }),
  routes: React.PropTypes.node,
  children: React.PropTypes.node,
  location: React.PropTypes.object
};

Router.defaultProps = {
  route: defaultRoute
};

export default Router;
