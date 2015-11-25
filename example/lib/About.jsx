import React from 'react';
import Nav from './Nav';

export default class About extends React.Component {
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
