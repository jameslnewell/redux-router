import React from 'react';
import {RouteLink} from '../..';

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <RouteLink name="home">Home</RouteLink>
        <RouteLink name="about">About You</RouteLink>
      </nav>
    );
  }
}
