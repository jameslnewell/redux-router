import React from 'react';
import Nav from './Nav';

export default class Home extends React.Component {
  render() {
    return (
      <section>
        <Nav/>
        <h1>Hello World!</h1>
      </section>
    );
  }
}
