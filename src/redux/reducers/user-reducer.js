/* Import action-types */
import { USER_INFO_UPDATED_SUCCESSFULLY } from "../actions/profile-action";

/* Declare initialState */
const initialState = {
  userDataLoading: true,
  userData: {},
  userOn: false
};

/* Reducer */
export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_UPDATED_SUCCESSFULLY:
      return {
        ...state,
        userDataLoading: false,
        userData: { ...state.userData, ...action.userData },
        userOn: true
      };
    default:
      return state;
  }
};
