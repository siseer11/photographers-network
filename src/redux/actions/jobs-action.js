import fire from "../../config/Fire";

const database = fire.database();

//ACTION TYPES
export const JOBS_FETCH_START = "JOBS_FETCH_START";
export const JOBS_FETCH_FINISHED = "JOBS_FETCH_FINISHED";
export const JOBS_FETCH_ERROR = "JOBS_FETCH_ERROR";
export const JOB_DELETED = "JOB_DELETED";
export const PHOTOGRAPHER_JOBS_FINISHED = "PHOTOGRAPHER_JOBS_FINISHED";
export const COMPANY_JOBS_FINISHED = "COMPANY_JOBS_FINISHED";

//ACTION CREATORS
export const jobsFetchStart = () => ({
  type: JOBS_FETCH_START
});

export const jobsFetchFinished = (jobsData, types = [], locations = []) => ({
  type: JOBS_FETCH_FINISHED,
  availableJobTypes: types,
  availableJobLocations: locations,
  jobsData
});

export const jobsFetchError = err => ({
  type: JOBS_FETCH_ERROR,
  error: err
});

export const jobDeleted = jobId => ({
  type: JOB_DELETED,
  jobId
});

const populateFilters = (dispatch, jobsData, types = [], locations = []) => {
  for (let key in jobsData) {
    const job = jobsData[key];
    const jobLocation = job.location;
    const jobType = job.type;

    if (types.indexOf(jobType) < 0) types.push(jobType);
    if (locations.indexOf(jobLocation) < 0) locations.push(jobLocation);
  }
  dispatch(jobsFetchFinished(jobsData, types, locations));
};

export const myJobsFetch = () => {
  return (dispatch, getState) => {
    dispatch(jobsFetchStart());
    return database
      .ref("company")
      .child(getState().firebase.auth.uid)
      .once("value", snap => {
        /*After having the keys of the jobs go ahead and get the data about them */
        let jobsIds = Object.keys(snap.val().postedJobs || {});

        jobsIds = jobsIds.map(el =>
          database
            .ref("requests")
            .child(el)
            .once("value")
        );
        Promise.all(jobsIds).then(values => {
          let allJobs = values.map(el => el.val());
          dispatch({type: COMPANY_JOBS_FINISHED, jobs: allJobs});
        });
      });
  };
};

export const appliedJobsFetch = () => {
  return (dispatch, getState) => {
    dispatch(jobsFetchStart());
    let jobs = [];
    return database
      .ref("photographer")
      .child(getState().firebase.auth.uid)
      .child("applied-jobs")
      .once("value", snap => {
        snap.forEach(job => {
          database.ref("requests").child(job.val().jobbId).once("value", jobRequest => {
            jobs.push({...jobRequest.val(), statusPhotographer: job.val().status});
          })
            .then(() => {
              //TODO: change database structure, to avoid dispatching it for each entry!
              dispatch({type: PHOTOGRAPHER_JOBS_FINISHED, jobs});
            });
        });
      });
  }
};

export const fetchJobs = (jobId = "") => {
  return (dispatch, getState) => {
    dispatch(jobsFetchStart());

    const ref = `requests${jobId ? `/${jobId}` : ""}`;

    fire
      .database()
      .ref(ref)
      .once(
        "value",
        snap => {
          const jobsData = snap.val();
          if (!jobId) {
            populateFilters(dispatch, jobsData);
          } else {
            dispatch(jobsFetchFinished(jobsData));
          }
        },
        err => {
          if (err) {
            dispatch(jobsFetchError(err));
          }
        }
      );

    const reqRef = fire.database().ref("requests");

    reqRef.on("child_added", snap => {
      if (!getState().allJobs.fetchedOnce) return;
      let jobData = snap.val();
      jobData = {[jobData.jobbId]: jobData};

      dispatch(jobsFetchFinished(jobData));
    });

    reqRef.on("child_removed", snap => {
      dispatch(jobDeleted(snap.val().jobbId));
    });

    reqRef.on("child_changed", snap => {
      let jobData = snap.val();
      jobData = {[jobData.jobbId]: jobData};
      dispatch(jobsFetchFinished(jobData));
    });
  };
};
