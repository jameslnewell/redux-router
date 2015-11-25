import {NAVIGATE} from './types';

const defaultState = {
  route: null
};

export default function(state = defaultState, action = {}) {
  const {type, payload: {name, params}} = action;

  if (type !== NAVIGATE) {
    return state;
  }

  return {...state, route: {name, params}};
}