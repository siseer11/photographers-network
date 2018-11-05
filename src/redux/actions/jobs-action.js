import fire from "../../config/Fire";

//ACTION TYPES
export const JOBS_FETCH_START = "JOBS_FETCH_START";
export const JOBS_FETCH_FINISHED = "JOBS_FETCH_FINISHED";
export const JOBS_FETCH_ERROR = "JOBS_FETCH_ERROR";
export const JOB_DELETED = "JOB_DELETED";

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
      jobData = { [jobData.jobbId]: jobData };

      dispatch(jobsFetchFinished(jobData));
    });

    reqRef.on("child_removed", snap => {
      dispatch(jobDeleted(snap.val().jobbId));
    });

    reqRef.on("child_changed", snap => {
      let jobData = snap.val();
      jobData = { [jobData.jobbId]: jobData };
      dispatch(jobsFetchFinished(jobData));
    });
  };
};
