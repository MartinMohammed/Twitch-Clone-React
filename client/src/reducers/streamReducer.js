import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types";
import _ from "lodash";

// ---- THIS STATE WILL CONTAIN EVERY STREAM WHICH THE USER ACCESSED - it is basically like a copy of the api "database"
// ----- DEFAULT VALUE IS EMPTY OBJECT !!! - CAN LEAD TO UNDEFINED PROBLEMS

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      // REPONSE DATA AUTOMATICALLY GOT AN UNIQUE ID FOR THE RECORED STORED INSIDE THE "REST API"
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      // action.payload = list of stream objects from the api and convert/transform them to object with stream objects
      // with the id of each stream object as the object key
      // {1: {userId: 1, ...}}
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default streamReducer;
