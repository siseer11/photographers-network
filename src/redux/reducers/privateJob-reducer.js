import {
  FETCH_OPEN_JOBS_STARTED,
  FETCH_OPEN_JOBS_SUCCES,
  FETCH_OPEN_JOBS_ERROR,
  PUSH_NOTIFICATION_STARTED,
  PUSH_NOTIFICATION_ERROR,
  PUSH_NOTIFICATION_SUCCES
} from "../actions/privateJob-action";

const initialState = {
  loadingOpenJobs: true,
  fetchingOpenJobsError: null,
  openJobsData: [],
  loadingPushingNotification: null,
  errorPushingNotification: false
};

export const privateJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPEN_JOBS_STARTED:
      return {
        ...state,
        loadingOpenJobs: true,
        fetchingOpenJobsError: null
      };
    case FETCH_OPEN_JOBS_SUCCES:
      return {
        ...state,
        openJobsData: action.jobsData,
        loadingOpenJobs: false,
        fetchingOpenJobsError: null
      };
    case FETCH_OPEN_JOBS_ERROR:
      return {
        ...state,
        loadingOpenJobs: false,
        fetchingOpenJobsError: action.error,
        openJobsData: {}
      };
    case PUSH_NOTIFICATION_STARTED:
      return {
        ...state,
        loadingPushingNotification: true,
        errorPushingNotification: false
      };
    case PUSH_NOTIFICATION_ERROR:
      return {
        ...state,
        loadingPushingNotification: false,
        errorPushingNotification: action.error
      };
    case PUSH_NOTIFICATION_SUCCES:
      let filteredJobs = [];
      if (state.openJobsData.length > 0) {
        filteredJobs = state.openJobsData.filter(
          el => el.jobId !== action.jobId
        );
      }

      return {
        ...state,
        openJobsData: filteredJobs,
        loadingPushingNotification: false,
        errorPushingNotification: false
      };
    default:
      return state;
  }
};
