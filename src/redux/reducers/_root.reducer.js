import { combineReducers } from "redux";

// Used to store shows returned from the server
const shows = (state = [], action) => {
  switch (action.type) {
    case "SET_SHOWS":
      return action.payload;
    default:
      return state;
  }
};



const rootReducer = combineReducers({
  shows

});

export default rootReducer;