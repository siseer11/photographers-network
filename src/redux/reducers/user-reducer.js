/* Import action-types */
import {
  NO_USER_LOGGED_IN,
  USER_LOGGED_IN,
  SIGN_USER_IN
} from "../actions/user-action";
import {USER_INFO_UPDATED_SUCCESSFULLY} from "../actions/profile-action";

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
        ...state,
        userDataLoading: false,
        userData: {},
        userOn: false
      };
    case USER_LOGGED_IN: case USER_INFO_UPDATED_SUCCESSFULLY:
      return {
        ...state,
        userDataLoading: false,
        userData: {...state.userData, ...action.userData},
        userOn: true
      };
    case SIGN_USER_IN:
      return {
        ...state,
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
