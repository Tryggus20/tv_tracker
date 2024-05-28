import axios from 'axios';

export const addShow = (show) => async (dispatch) => {
  dispatch({ type: 'ADD_SHOW_REQUEST' });
  try {
    await axios.post('/api/tv', show);
    dispatch({ type: 'ADD_SHOW_SUCCESS', payload: show });
    dispatch({ type: 'FETCH_SHOWS' }); // Refresh the list after adding a new show
  } catch (error) {
    console.error('Error adding show:', error);
    dispatch({ type: 'ADD_SHOW_FAILURE', error });
  }
};

export const fetchShows = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/tv');
    dispatch({ type: 'SET_SHOWS', payload: response.data });
  } catch (error) {
    console.error('Error fetching shows:', error);
  }
};