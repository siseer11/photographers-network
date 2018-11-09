import {
  SEARCH_PHOTOGRAPHER_STARTED,
  SEARCH_PHOTOGRAPHER_SUCCES,
  SEARCH_PHOTOGRAPHER_ERROR,
  RESET_INITIAL_STATE
} from "../actions/searchPhotographer-action";

const initialState = {
  loading: null,
  photographersData: {},
  error: null
};

export const searchPhotographerReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_INITIAL_STATE:
      return {
        ...state,
        loading: null,
        error: null
      };
    case SEARCH_PHOTOGRAPHER_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCH_PHOTOGRAPHER_SUCCES:
      if (action.location) {
        return {
          loading: false,
          photographersData: {
            ...state.photographersData,
            [action.location]: action.photographersData
          },
          error: null
        };
      } else {
        return {
          ...state,
          loading: false,
          error: null
        };
      }
    case SEARCH_PHOTOGRAPHER_ERROR:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
