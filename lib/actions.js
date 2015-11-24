import {NAVIGATE} from '../lib/types';

export function navigate(url) {
  return (dispatch) => {
    return Promise.resolve(dispatch({
      type: NAVIGATE
    }));
  };
}
