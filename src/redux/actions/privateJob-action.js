import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const FETCH_OPEN_JOBS_STARTED = "FETCH_OPEN_JOBS_STARTED";
export const FETCH_OPEN_JOBS_SUCCES = "FETCH_OPEN_JOBS_SUCCES";
export const FETCH_OPEN_JOBS_ERROR = "FETCH_OPEN_JOBS_ERROR";
export const PUSH_NOTIFICATION_STARTED = "PUSH_NOTIFICATION_STARTED";
export const PUSH_NOTIFICATION_ERROR = "PUSH_NOTIFICATION_ERROR";
export const PUSH_NOTIFICATION_SUCCES = "PUSH_NOTIFICATION_SUCCES";

// -------------------- ACTION CREATORS -------------------- //

export const fetchOpenJobsStart = () => ({
  type: FETCH_OPEN_JOBS_STARTED
});

export const fetchOpenJobsSucces = jobsData => ({
  type: FETCH_OPEN_JOBS_SUCCES,
  jobsData: jobsData
});

export const fetchOpenJobsError = err => ({
  type: FETCH_OPEN_JOBS_ERROR,
  error: err
});

export const pushNotificationStarted = () => ({
  type: PUSH_NOTIFICATION_STARTED
});

export const pushNotificationError = err => ({
  type: PUSH_NOTIFICATION_ERROR,
  error: err
});

export const pushNotificationSucces = (jobId, photographerId) => ({
  type: PUSH_NOTIFICATION_SUCCES,
  jobId,
  photographerId
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const pushNotification = (
  photographerId,
  company,
  jobId,
  newCreatedJob = false
) => {
  return (dispatch, getState) => {
    dispatch(pushNotificationStarted());
    database
      .ref("users")
      .child(`${photographerId}/notifications`)
      .push({
        link: `/private/job/${jobId}?user=${photographerId}`,
        read: false,
        title: `You got a new private job request from ${company.displayName}`,
        time: new Date().getTime()
      })
      .then(() => {
        if (newCreatedJob) {
          return true;
        } else {
          return database.ref(`requests/${jobId}`).update({
            sentToPrivate: true,
            sentTo: photographerId
          });
        }
      })
      .then(() => {
        console.log("Notification pushed");
        dispatch(pushNotificationSucces(jobId, photographerId));
      })
      .catch(err => {
        dispatch(pushNotificationError(err));
      });
  };
};

export const fetchCreatedJobs = company => {
  return (dispatch, getState) => {
    dispatch(fetchOpenJobsStart());

    database
      .ref("company")
      .child(company.uid)
      .once("value")
      .then(snap => {
        let postedJobsIds = snap.val().postedJobs;
        postedJobsIds = postedJobsIds ? Object.values(postedJobsIds) : [];
        return postedJobsIds;
      })
      .then(postedJobs => {
        if (postedJobs.length == 0) {
          dispatch(fetchOpenJobsSucces([]));
          return;
        }

        let promises = postedJobs.map(el =>
          fire
            .database()
            .ref("requests")
            .child(el.jobId)
            .once("value")
        );

        //wait for all the jobs to be fetched
        return Promise.all(promises).then(values => {
          return values
            .map(job => job.val())
            .filter(jobValue => {
              return jobValue.status === "open" && !jobValue.sentToPrivate;
            });
        });
      })
      .then(filteredJobs => {
        dispatch(fetchOpenJobsSucces(filteredJobs));
      })
      .catch(err => {
        return dispatch(fetchOpenJobsError(err));
      });
  };
};

export const pushPrivateJob = (jobData, company, photographerId) => {
  return (dispatch, getState) => {
    //Loading screen
    dispatch(pushNotificationStarted());
    const jobId = database.ref("requests").push().key;

    // Push the new created job to the database
    database
      .ref("requests")
      .child(jobId)
      .set({
        ...jobData,
        status: "open",
        payment: "soooooon",
        phootgrapher: "none",
        companyId: company.uid,
        companyName: company.displayName,
        sentTo: photographerId,
        jobId: jobId,
        sentToPrivate: true,
        private: true
      })
      .then(() => {
        return database
          .ref("company")
          .child(`${company.uid}/postedJobs/${jobId}`)
          .set({
            jobId: jobId,
            private: true
          });
      })
      .then(() => {
        //dispatch something on succes
        dispatch(pushNotification(photographerId, company, jobId, true));
      })
      .catch(err => {
        //dispatch some sort of error on creating the job
        dispatch(pushNotificationError(err));
      });
  };
};
