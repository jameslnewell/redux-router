import React from 'react';
import {Route} from '../..';

import Home from './Home';
import About from './About';

export default [
  <Route name="home" pattern="/" handler={Home}/>,
  <Route name="about" pattern="/about" handler={About}/>
]