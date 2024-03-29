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

//ACTION CREATOR FOR CREATE FORM SENT OVER TO API SERVER
//pulls userId from getState argument
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  //turns formValues into object and adds userId
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  //implement programmatic navigation to get user back to root route
  //refactor of BrowserRouter was needed. Creation of history object was needed.
  history.push("/");
};

//action creator for list of all records
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

//action creator for selecting a stream record
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

//action creator for editing stream record
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

//action creator for deleting a stream record
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
