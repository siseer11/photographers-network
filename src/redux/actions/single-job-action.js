import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const JOB_FETCH_START = "JOB_FETCH_START";
export const JOB_FETCH_SUCCESS = "JOB_FETCH_SUCCESS";
export const JOB_FETCH_ERROR = "JOB_FETCH_ERROR";
export const JOB_EXISTS_ERROR = "JOB_EXISTS_ERROR";
export const APPLY_TO_JOB = "APPLY_TO_JOB";
export const SUBMIT_WORK = "SUBMIT_WORK";
export const ACCEPT_APPLICANT = "ACCEPT_APPLICANT";
export const DECLINE_APPLICANT = "DECLINE_APPLICANT";

// -------------------- ACTION CREATORS -------------------- //
export const singleJobFetchStart = () => ({
  type: JOB_FETCH_START
});

export const singleJobFetchSuccess = job => ({
  type: JOB_FETCH_SUCCESS,
  job
});

export const singleJobFetchError = err => ({
  type: JOB_FETCH_ERROR,
  message: err.message
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const fetchJobInfo = (jobId, type) => {
  return (dispatch, getState) => {
    dispatch(singleJobFetchStart());
    return database.ref("requests")
      .child(jobId)
      .once("value", snap => {
        if (!snap.exists()) {
          dispatch({type: JOB_EXISTS_ERROR});
          return -1;
        }
        const data = snap.val();
        const auth = getState().firebase.auth;
        const job = {
          jobId,
          jobDescription: data,
          openJob: getOpenJobInfo(auth, data, type),
          progressJob: getProgressJobInfo(data)
        };
        dispatch(singleJobFetchSuccess(job));
      }).catch(err => dispatch(singleJobFetchError(err)));
  };
};

export const applyForJob = jobId => {
  return (dispatch, getState) => {
    const auth = getState().firebase.auth;
    return database
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .child(auth.uid)
      .set({
        email: auth.email,
        displayName: auth.displayName
      })
      .then(() => {
        this.database
          .ref("photographer")
          .child(auth.uid)
          .child("applied-jobs")
          .child(jobId)
          .set({
            jobbId: jobId,
            status: "applied"
          });
      })
      .then(() => {
        dispatch({type: APPLY_TO_JOB});
      });
  };
};

export const acceptApplicantForJob = (acceptedApplicant, jobId) => {
  return (dispatch, getState) => {
    return database
      .ref("requests")
      .child(jobId)
      .update({
        phootgrapher: acceptedApplicant,
        payment: "down payment done",
        status: "in progress"
      })
      .then(() => {
      dispatch({type: ACCEPT_APPLICANT, applicant: acceptedApplicant});
        this.setState({downPayment: true});
        this.database.ref("photographer").child(acceptedApplicant.uid).child("applied-jobs").child(jobId).update({
          status: "accepted"
        })
      })
      .catch(err => console.log(err));
  };
};

//-------------------- HELP FUNCTIONS -------------------- //

/**
 * Fetches info of an open job.
 *
 * @param auth
 * @param data
 * @param type
 * @returns {{userApplied: boolean, appliedPhotographers, userIsDeclinedPhotographer: boolean}}
 */
const getOpenJobInfo = (auth, data, type) => {
  const photographersObj = data["photographers-applied"]
    ? data["photographers-applied"]
    : [];
  return {
    userApplied: auth.uid
      ? photographersObj.hasOwnProperty(auth.uid)
      : false,
    appliedPhotographers: getAppliedPhotographers(data),
    userIsDeclinedPhotographer: auth.uid ? userIsDeclinedPhotographer(auth, type) : false
  };
};

/**
 * Fetches info of a progress job.
 *
 * @param data
 * @returns {{submittedWork: Array, acceptedWork: boolean}}
 */
const getProgressJobInfo = data => {
  const workObj = data["submitted-work"] ? data["submitted-work"] : [];
  return {
    submittedWork: Object.values(workObj),
    acceptedWork: data.status === "closed"
  };
};

/**
 * Returns an array of the applied photographers for this job.
 *
 * @param data
 * @returns {Array}
 */
const getAppliedPhotographers = data => {
  const photographersObj = data["photographers-applied"]
    ? data["photographers-applied"]
    : [];
  return Object.keys(photographersObj).map(key => {
    let photographer = photographersObj[key];
    return {
      uid: key,
      ...photographer
    };
  });
};

/**
 * Checks, if a user is a declined photographer.
 *
 * @param auth
 * @param type
 * @param jobId
 */
const userIsDeclinedPhotographer = (auth, type, jobId) => {
  if (type === "photographer") {
    this.database
      .ref("photographer")
      .child(auth.uid)
      .child("applied-jobs")
      .child(jobId)
      .once("value", snap => {
        return snap.exists();
      });
  }
};