import {
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR
} from "../actions/signUp-action";

const initialState = {
  error: false,
  signUpLoading: false
};

export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_START:
      return {
        ...state,
        signUpLoading: true,
        error: false
      };
    case SIGNUP_USER_SUCCESS:
      return state;
    case SIGNUP_USER_ERROR:
      return {
        ...state,
        signUpLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
