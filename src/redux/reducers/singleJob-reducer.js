import {
  ACCEPT_APPLICANT,
  APPLY_TO_JOB, JOB_EXISTS_ERROR, JOB_FETCH_ERROR, JOB_FETCH_START,
  JOB_FETCH_SUCCESS
} from "../actions/single-job-action";

const initialState = {
  jobExists: false,
  jobId: '',
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
  errorMessage: ''
};

export const singleJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_FETCH_START:
      return {...state, jobLoading: true};
    case JOB_FETCH_SUCCESS:
      return {...state, ...action.job, jobLoaded: true, jobLoading: false, jobExists: true};
    case JOB_FETCH_ERROR:
      return {...state, jobLoaded: false, jobLoading: false, errorMessage: action.message};
    case JOB_EXISTS_ERROR:
      return {...state, jobLoaded: true, jobLoading: false, jobExists: false};
    case APPLY_TO_JOB:
      return {...state, openJob: {...this.state.openJob, userApplied: true}};
    case ACCEPT_APPLICANT:
      return {...state, jobDescription: {...state.jobDescription, phootgrapher: action.applicant}, downPayment: true};
    default:
      return state;
  }
};