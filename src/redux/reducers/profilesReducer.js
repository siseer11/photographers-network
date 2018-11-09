import {
  PROFILE_FETCHING_STARTED,
  PROFILE_FETCHING_SUCCES,
  PROFILE_FETCHING_ERROR, USER_INFO_UPDATED_SUCCESSFULLY, PHOTOURL_UPDATED_SUCCESSFULLY
} from "../actions/profile-action";

const initialState = {
  data: {},
  error: null,
  fetchingProfile: true
};

export const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCHING_STARTED:
      return {
        ...state,
        error: null,
        fetchingProfile: true
      };
    case PROFILE_FETCHING_SUCCES:
      return {
        error: null,
        fetchingProfile: false,
        data: {
          ...state.data,
          [action.profileId]: action.profileData
        }
      };
    case PROFILE_FETCHING_ERROR:
      return {
        ...state,
        error: action.error,
        fetchingProfile: false
      };
    case USER_INFO_UPDATED_SUCCESSFULLY: case PHOTOURL_UPDATED_SUCCESSFULLY:
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
