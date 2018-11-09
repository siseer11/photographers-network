/* Import action-types */
import {
  NO_USER_LOGGED_IN,
  USER_LOGGED_IN,
  SIGN_USER_IN
} from "../actions/user-action";

/* Declare initialState */
const initialState = {
  userDataLoading: true,
  userData: {},
  userOn: false
};

/* Reducer */
export const user = (state = initialState, action) => {
  switch (action.type) {
    case NO_USER_LOGGED_IN:
      return {
        userDataLoading: false,
        userData: {},
        userOn: false
      };
    case USER_LOGGED_IN:
      return {
        userDataLoading: false,
        userData: action.userData,
        userOn: true
      };
    case SIGN_USER_IN:
      return {
        userDataLoading: true,
        userData: {},
        userOn: true
      };
    default:
      return state;
  }
};

/*

/*

 UserDataLoading : ;
 UserData : ;
 userOn : ;

*/
