import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const ACCEPT_APPLICANT = "ACCEPT_APPLICANT";
export const ACCEPT_APPLICANT_ERROR = "ACCEPT_APPLICANT_ERROR";
export const DECLINE_APPLICANT = "DECLINE_APPLICANT";
export const ACCEPT_WORK = "ACCEPT_WORK";
export const DELETE_JOB = "DELETE_JOB";
export const DELETE_JOB_ERROR = "DELETE_JOB_ERROR";

// -------------------- ACTION CREATORS -------------------- //

export const acceptApplicantSuccess = applicant => ({
  type: ACCEPT_APPLICANT,
  applicant
});

export const acceptApplicantError = err => ({
  type: ACCEPT_APPLICANT_ERROR,
  message: err.message
});

export const declineApplicantSuccess = uid => ({
  type: DECLINE_APPLICANT,
  uid
});

export const deleteJobSuccess = () => ({
  type: DELETE_JOB
});

export const deleteJobError = err => ({
  type: DELETE_JOB_ERROR,
  message: err.message
});

export const acceptWorkSuccess = () => ({
  type: ACCEPT_WORK
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //

/* DONE */
export const acceptApplicantForJob = (acceptedApplicant, jobId) => {
  return dispatch => {
    return database
      .ref("requests")
      .child(jobId)
      .update({
        phootgrapher: acceptedApplicant,
        payment: "down payment done",
        status: "in progress"
      })
      .then(() => {
        database
          .ref("photographer")
          .child(acceptedApplicant.uid)
          .child("applied-jobs")
          .child(jobId)
          .update({
            status: "accepted"
          })
          .then(() => {
            dispatch(acceptApplicantSuccess(acceptedApplicant));
          });
      })
      .catch(err => dispatch(acceptApplicantError(err)));
  };
};

/* DONE */
export const declineApplicantForJob = (uid, jobId) => {
  return dispatch => {
    database
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .child(uid)
      .remove()
      .then(() => {
        database
          .ref("photographer")
          .child(uid)
          .child("applied-jobs")
          .child(jobId)
          .update({
            status: "declined"
          })
          .then(() => {
            dispatch(declineApplicantSuccess(uid));
          });
      });
  };
};

/* DONE */
export const deleteCurrentJob = (jobId, companyId) => {
  return dispatch => {
    return database
      .ref("requests")
      .child(jobId)
      .remove()
      .then(() => {
        database
          .ref("company")
          .child(companyId)
          .child("postedJobs")
          .child(jobId)
          .remove()
          .then(async () => {
            try {
              let photographers = await database
                .ref("photographer")
                .once("value");
              photographers.forEach(async photographer => {
                try {
                  await this.database
                    .ref("photographer")
                    .child(photographer.key)
                    .child("applied-jobs")
                    .child(jobId)
                    .remove();
                } catch (err) {
                  dispatch(deleteJobError(err));
                }
              });
              dispatch(deleteJobSuccess());
            } catch (err) {
              dispatch(deleteJobError(err));
            }
          });
      })
      .catch(err => dispatch(deleteJobError(err)));
  };
};

export const acceptWork = (jobId, acceptedApplicant) => {
  return dispatch => {
    return database
      .ref("requests")
      .child(jobId)
      .update({
        status: "closed"
      })
      .then(() => {
        database
          .ref("photographer")
          .child(acceptedApplicant.uid)
          .child("applied-jobs")
          .child(jobId)
          .update({
            status: "finished"
          })
          .then(() => {
            dispatch(acceptWorkSuccess());
          });
      });
  };
};
