import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types.js";

export default (state = {}, action) => {
  switch (action.type) {
    //action creator to merge list of records
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    //check back to action creator for delete stream
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
