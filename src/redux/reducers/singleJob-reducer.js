import {
  JOB_EXISTS_ERROR,
  JOB_FETCH_ERROR,
  JOB_FETCH_START,
  JOB_FETCH_SUCCESS
} from "../actions/single-job-action";

import {
  APPLY_TO_JOB,
  SUBMIT_WORK,
  SUBMIT_WORK_ERROR
} from "../actions/single-job-action-photographer";

import {
  ACCEPT_APPLICANT,
  ACCEPT_WORK,
  DECLINE_APPLICANT,
  DELETE_JOB,
  DELETE_JOB_ERROR
} from "../actions/single-job-action-company";


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
      return {...state, openJob: {...state.openJob, userApplied: true}};
    case ACCEPT_APPLICANT:
      return {...state, jobDescription: {...state.jobDescription, phootgrapher: action.applicant}, downPayment: true};
    case DECLINE_APPLICANT:
      const appliedPhotographers = [
        ...state.openJob.appliedPhotographers.slice(0, action.uid),
        ...state.openJob.appliedPhotographers.slice(action.uid+1)
      ];
      return {...state, openJob: {...state.openJob, appliedPhotographers }};
    case DELETE_JOB:
      return {...state, ...initialState};
    case DELETE_JOB_ERROR: case SUBMIT_WORK_ERROR:
      return {...state, errorMessage: action.message};
    case ACCEPT_WORK:
      return {...state, progressJob: {...state.progressJob, acceptedWork:true}};
    case SUBMIT_WORK:
      return {...state, progressJob: {...state.progressJob, submittedWork:action.images}};
    default:
      return state;
  }
};