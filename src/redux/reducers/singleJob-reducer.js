import {
  SUBMIT_WORK,
  SUBMIT_WORK_ERROR
} from "../actions/single-job-action-photographer";

const initialState = {
  jobExists: false,
  jobId: "",
  jobDescription: {},
  downPayment: false,
  openJob: {
    userApplied: false,
    appliedPhotographers: [],
    isDeclinedPhotographer: false
  },
  progressJob: {
    submittedWork: [],
    acceptedWork: false
  },
  jobLoaded: false,
  jobLoading: false,
  errorMessage: ""
};

export const singleJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_WORK_ERROR:
      return { ...state, errorMessage: action.message };
    case SUBMIT_WORK:
      return {
        ...state,
        progressJob: { ...state.progressJob, submittedWork: action.images }
      };
    default:
      return state;
  }
};
