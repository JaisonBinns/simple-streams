import { SIGN_IN, SIGN_OUT } from "../actions/types";
//init a CONST variable for state
const INITAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };

    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};
