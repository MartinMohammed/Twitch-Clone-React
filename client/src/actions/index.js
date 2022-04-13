import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// --------------- ACTIONS FOLLOWING REST CONVENTIONS FOR REST-API ------------
export const createStream = (formValues) => async (dispatch, getState) => {
  // response.data contains the information we passed/posted over to the "restful api"
  // ------------ ASSOCIATING STREAMS WITH USERS ------------
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  // REPONSE DATA AUTOMATICALLY GOT AN UNIQUE ID FOR THE RECORED STORED INSIDE THE "REST API"
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // do some programmatic navigation to
  // get the user back to the root route
  history.push("/");
};
// responsible for getting our streams inside our components because it is updating the state from the API!!!
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (streamId) => async (dispatch) => {
  const response = await streams.get(`/streams/${streamId}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  // any any time -> try edit / update it provide both the id and the update we're trying to make to that stream.
  const response = await streams.patch("/streams/" + id, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete("/streams/" + id);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
