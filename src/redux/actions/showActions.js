import axios from 'axios';

export const addShow = (show) => async (dispatch) => {
  try {
    await axios.post('/api/tv', show);
    dispatch({ type: 'ADD_SHOW', payload: show });
  } catch (error) {
    console.error('Error adding show:', error);
  }
};
