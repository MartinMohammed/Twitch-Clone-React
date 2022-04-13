import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

// for redux store
export default combineReducers({
  // my store keys
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});
