import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import {Router, RouteContext} from '..';

import routes from './lib/routes';
import Home from './lib/Home';
import About from './lib/About';

console.log(renderToStaticMarkup(
  <Router route={{name: 'about', params: {name: 'James'}}} routes={routes}/>
));
