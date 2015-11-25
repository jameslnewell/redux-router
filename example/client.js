import React from 'react';
import {render} from 'react-dom';
import {Router, HistoryLocation} from '..';

import routes from './lib/routes';

const location = new HistoryLocation();

render(
  <Router route={{name: 'about', params: {name: 'James'}}} routes={routes} location={location}/>,
  document.getElementById('content')
);

location.navigate('/about');
