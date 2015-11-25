import {NAVIGATE} from '../lib/types';

export function navigate(name, params, routes) {
  return (dispatch) => {
    dispatch({
      type: NAVIGATE,
      payload: {
        name,
        params
      }
    });
    return Promise.resolve();
  };
}
