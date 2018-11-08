import {
  PROFILE_FETCHING_STARTED,
  PROFILE_FETCHING_SUCCES,
  PROFILE_FETCHING_ERROR
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
    default:
      return state;
  }
};
