import fire from "../../config/Fire";

const database = fire.database();
// -------------------- ACTION TYPES -------------------- //
export const JOB_FETCHING_STARTED = "JOB_FETCHING_STARTED";
export const JOB_FETCHING_SUCCES = "JOB_FETCHING_SUCCES";
export const JOB_FETCHING_ERROR = "JOB_FETCHING_ERROR";
export const PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_START =
  "PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_START";
export const PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_SUCCES =
  "PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_SUCCES";
export const PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_ERROR =
  "PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_ERROR";

// -------------------- ACTION CREATORS -------------------- //
export const jobFetchingStarted = () => ({
  type: JOB_FETCHING_STARTED
});

export const jobFetchingError = err => ({
  type: JOB_FETCHING_ERROR,
  error: err
});

export const jobFetchingSucces = jobData => ({
  type: JOB_FETCHING_SUCCES,
  jobData
});

export const photographerResponsePushToDbStart = () => ({
  type: PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_START
});

export const photographerResponsePushToDbError = err => ({
  type: PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_ERROR,
  error: err
});

export const photographerResponsePushToDbSucces = () => ({
  type: PHOTOGRAPHER_RESPONSE_PUSH_TO_DB_SUCCES
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const fetchPrivateJobInfo = jobId => {
  return (dispatch, getState) => {
    dispatch(jobFetchingStarted());
    database
      .ref("requests")
      .child(jobId)
      .once("value", snap => {
        dispatch(jobFetchingSucces(snap.val()));
      })
      .catch(err => {
        dispatch(jobFetchingError(err));
      });
  };
};

// user
export const acceptJobReq = (user, jobData) => {
  return (dispatch, getState) => {
    const state = getState();
    const jobData = state.acceptDeclinePrivateJob.jobData;
    const user = state.user.userData;

    dispatch(photographerResponsePushToDbStart());

    database
      .ref("requests")
      .child(jobData.jobId)
      .update({
        phootgrapher: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          "photographers-applied": ""
        },
        status: "in progress"
      })
      .then(() => {
        const notificationLink = `/progress-job/${jobData.jobId}`;
        const notificationTitle = `${
          user.displayName
        } accepted you're private req for the job , proceed to the payment!`;
        pushNotificationToCompany(
          jobData.companyId,
          notificationLink,
          notificationTitle
        );
      })
      .catch(err => {
        dispatch(photographerResponsePushToDbError(err));
      });
  };
};

// user
export const rejectJobReq = () => {
  return (dispatch, getState) => {
    const state = getState();
    const jobbInfos = state.acceptDeclinePrivateJob.jobData;
    const user = state.user.userData;

    const isJobPrivate = jobbInfos.private;

    dispatch(photographerResponsePushToDbStart());

    database
      .ref("requests")
      .child(jobbInfos.jobbId)
      .update({
        sentTo: "",
        sentToPrivate: false,
        photographerDeclinedPrivateReq: isJobPrivate ? true : null
      })
      .then(() => {
        const notificationLink = isJobPrivate
          ? `/declined-private-job/${jobbInfos.jobId}?company=${
              jobbInfos.companyId
            }`
          : `/job/${jobbInfos.jobId}`;
        const notificationTitle = `${
          user.displayName
        } has declined you private job req.`;

        pushNotificationToCompany(
          jobbInfos.companyId,
          notificationLink,
          notificationTitle
        );
      })
      .catch(err => {
        dispatch(photographerResponsePushToDbError(err));
      });
  };
};

function pushNotificationToCompany(companyId, link, title) {
  return dispatch => {
    database
      .ref("users")
      .child(`${companyId}/notifications`)
      .push({
        link: link,
        read: false,
        time: new Date().getTime(),
        title: title
      })
      .then(() => {
        dispatch(photographerResponsePushToDbSucces());
      })
      .catch(err => {
        dispatch(photographerResponsePushToDbError(err));
      });
  };
}
