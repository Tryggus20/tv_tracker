import {takeEvery, put, call} from "redux-saga/effects"
import axios from "axios"

// Create the rootSaga generator function
function* watcherSaga() {
    yield takeEvery("FETCH_SHOWS", fetchAllShows)
    // yield takeEvery("ADD_SHOWS", addShowSaga)
  }
  
  function* fetchAllShows() {
    // get all shows from the DB
    try {
      const shows = yield axios.get("/api/tv");
      console.log("get all:", shows.data);
      yield put({ type: "SET_SHOWS", payload: shows.data });
    } catch {
      console.log("get all shows reducer error");
    }
  }

// saga to add new show to the database. 
function* addShowSaga(action) {
    const newShow = action.payload;
    try {
      yield axios.post('/api/tv/new', newShow);
      yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
      console.log('error in addShowSaga', err);
    }
  }
  
  
export default watcherSaga