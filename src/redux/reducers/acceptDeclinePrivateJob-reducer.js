import {
  JOB_FETCHING_STARTED,
  JOB_FETCHING_SUCCES,
  JOB_FETCHING_ERROR,
  PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_START,
  PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_SUCCES,
  PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_ERROR
} from "../actions/acceptDeclinePrivateJob-action";

const initialState = {
  fetchingJob: true,
  error: null,
  jobData: {},
  responsePushing: false,
  repsonsePushingError: null,
  responsePushingSucces: null
};

export const acceptDeclinePrivateJob = (state = initialState, action) => {
  switch (action.type) {
    case JOB_FETCHING_STARTED:
      return {
        ...state,
        fetchingJob: true,
        error: null
      };
    case JOB_FETCHING_SUCCES:
      return {
        ...state,
        fetchingJob: false,
        error: null,
        jobData: action.jobData
      };
    case JOB_FETCHING_ERROR:
      return {
        ...state,
        fetchingJob: false,
        error: action.error,
        jobData: {}
      };
    case PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_START:
      return {
        ...state,
        responsePushing: true,
        repsonsePushingError: null,
        responsePushingSucces: null
      };
    case PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_ERROR:
      return {
        ...state,
        responsePushing: false,
        repsonsePushingError: action.error,
        responsePushingSucces: false
      };

    case PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_SUCCES:
      return {
        ...state,
        responsePushing: false,
        repsonsePushingError: null,
        responsePushingSucces: true
      };
    default:
      return state;
  }
};
