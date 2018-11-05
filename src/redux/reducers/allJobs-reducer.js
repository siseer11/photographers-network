import {
  JOBS_FETCH_ERROR,
  JOBS_FETCH_FINISHED,
  JOBS_FETCH_START,
  JOB_DELETED
} from "../actions/jobs-action";

export const allJobs = (
  state = {
    jobsData: {},
    jobsLoading: true,
    fetchedOnce: false,
    availableJobLocations: [],
    availableJobTypes: []
  },
  action
) => {
  switch (action.type) {
    case "JOBS_FETCH_ERROR":
      return {
        ...state,
        error: action.error,
        jobsLoading: false
      };
    case "JOBS_FETCH_START":
      return {
        ...state,
        jobsLoading: true
      };
    case "JOBS_FETCH_FINISHED":
      return {
        ...state,
        fetchedOnce: true,
        jobsData: {
          ...state.jobsData,
          ...action.jobsData
        },
        jobsLoading: false,
        error: false,
        availableJobTypes: [
          ...state.availableJobTypes,
          ...action.availableJobTypes
        ],
        availableJobLocations: action.availableJobLocations
      };
    case "JOB_DELETED":
      const jobId = action.jobId;
      return {
        ...state,
        jobsData: {
          ...state.jobsData,
          [action.jobId]: {
            ...state.jobsData[jobId],
            deleted: true
          }
        }
      };
    default:
      return state;
  }
};
