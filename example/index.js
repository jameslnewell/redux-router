import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import Route from '../lib/components/Route';
import RouteLink from '../lib/components/RouteLink';
import Router from '../lib/components/Router';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <RouteLink name="home">Home</RouteLink>
        <RouteLink name="abouts">About You</RouteLink>
      </nav>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <section>
        <Nav/>
        <h1>Hello World!</h1>
      </section>
    );
  }
}

class About extends React.Component {
  render() {
    const {name} = this.props;
    return (
      <section>
        <Nav/>
        <h1>Tell me more about you {name}!</h1>
      </section>
    );
  }
}

console.log(renderToStaticMarkup(
  <Router route={{name: 'about', params: {name: 'James'}}}>
    <Route name="home" pattern="/" handler={Home}/>
    <Route name="about" pattern="/about" handler={About}/>
  </Router>
));
