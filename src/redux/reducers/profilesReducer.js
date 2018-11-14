import {
  USER_INFO_UPDATED_SUCCESSFULLY,
  PHOTOURL_UPDATED_SUCCESSFULLY
} from "../actions/profile-action";

const initialState = {
  data: {}
};

export const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_UPDATED_SUCCESSFULLY:
    case PHOTOURL_UPDATED_SUCCESSFULLY:
      return {
        ...state,
        data: {
          ...state.data,
          [action.uid]: {
            ...state.data[action.uid],
            ...action.userData
          }
        }
      };
    default:
      return state;
  }
};
