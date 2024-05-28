import axios from 'axios';

export const addShow = (show) => (dispatch) => {
  dispatch({ type: 'ADD_SHOW', payload: show });
};
