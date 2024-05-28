import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* watcherSaga() {
  yield takeEvery('FETCH_SHOWS', fetchAllShows);
  yield takeEvery('ADD_SHOW', addShowSaga);
  yield takeEvery('UPDATE_SHOW', updateShowSaga); // Add new saga for updating show
}

function* fetchAllShows() {
  // get all shows from the DB
  try {
    const shows = yield call(axios.get, '/api/tv');
    yield put({ type: 'SET_SHOWS', payload: shows.data });
  } catch (err) {
    console.log('get all shows reducer error', err);
  }
}

// Saga to add new show to the database. 
function* addShowSaga(action) {
  const newShow = action.payload;
  try {
    yield call(axios.post, '/api/tv', newShow);
    yield put({ type: 'FETCH_SHOWS' });
  } catch (err) {
    console.log('error in addShowSaga', err);
  }
}

// Saga to update show (increment/decrement season/episode)
function* updateShowSaga(action) {
  const { id, data } = action.payload;
  try {
    yield call(axios.put, `/api/tv/${id}`, data);
    yield put({ type: 'FETCH_SHOWS' }); // Fetch updated shows after updating
  } catch (err) {
    console.log('error in updateShowSaga', err);
  }
}

export default watcherSaga;
