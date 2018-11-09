import {
  CREATE_JOB_STARTED,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCES
} from "../actions/createJob-action";

let initialState = {
  error: null,
  loading: false,
  succes: null
};

export const createJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB_STARTED:
      return {
        error: null,
        loading: true,
        succes: null
      };
    case CREATE_JOB_ERROR:
      return {
        error: action.error,
        loading: false,
        succes: false
      };
    case CREATE_JOB_SUCCES:
      return {
        error: null,
        loading: false,
        succes: true
      };
    default:
      return state;
  }
};
