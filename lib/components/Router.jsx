import React from 'react';
import RouteContext from './RouteContext';

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

class Router extends React.Component {

  render() {
    const {route} = this.props;

    //extract the routes
    const routes = []
      .concat(extract(this.props.children))
      .concat(extract(this.props.routes))
    ;

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
  children: React.PropTypes.node
};

Router.defaultProps = {
  route: defaultRoute
};

export default Router;
