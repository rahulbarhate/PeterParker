import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
const initialState = {
  data: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGED_IN": {
      return Object.assign({}, state, {
        data: action.payload
      });
    }
    case "USER_LOGGED_OUT": {
      return Object.assign({}, state, {
        data: null
      });
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer
});

export default reducer;
