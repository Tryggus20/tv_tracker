import axios from 'axios';
import { getAuth } from 'firebase/auth';

export const addShow = (show) => async (dispatch) => {
  dispatch({ type: 'ADD_SHOW_REQUEST' });

  try {
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;

    if (!userEmail) {
      throw new Error("User is not authenticated");
    }

    const showWithUserEmail = { ...show, user_email: userEmail };

    await axios.post('/api/tv', showWithUserEmail, {
      headers: {
        'User-Email': userEmail
      }
    });
    dispatch({ type: 'ADD_SHOW_SUCCESS', payload: showWithUserEmail });
    dispatch(fetchShows(userEmail)); // Refresh the list after adding a new show
  } catch (error) {
    console.error('Error adding show:', error);
    dispatch({ type: 'ADD_SHOW_FAILURE', error });
  }
};

export const fetchShows = (userEmail) => async (dispatch) => {
  try {
    if (!userEmail) {
      const auth = getAuth();
      userEmail = auth.currentUser.email;
    }

    if (!userEmail) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get('/api/tv', {
      headers: {
        'User-Email': userEmail // Include user email in headers
      }
    });

    console.log("showAction", response);
    console.log("setting shows in showActions");
    dispatch({ type: 'SET_SHOWS', payload: response.data });
  } catch (error) {
    console.error('Error fetching shows:', error);
  }
};
