import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const CREATE_JOB_STARTED = "CREATE_JOB_STARTED";
export const CREATE_JOB_ERROR = "CREATE_JOB_ERROR";
export const CREATE_JOB_SUCCES = "CREATE_JOB_SUCCES";

// -------------------- ACTION CREATORS -------------------- //
export const createJobStarted = () => ({
  type: CREATE_JOB_STARTED
});

export const createJobError = err => ({
  type: CREATE_JOB_ERROR,
  error: err
});

export const createJobSucces = () => ({
  type: CREATE_JOB_SUCCES
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const createJob = (jobData, company, history) => {
  return (dispatch, getState) => {
    const jobId = database.ref("requests").push().key;

    dispatch(createJobStarted());

    //Add the new created job in the database under requests
    database
      .ref("requests")
      .child(jobId)
      .set({
        date: jobData.date,
        title: jobData.jobTitle,
        type: jobData.jobType,
        location: jobData.jobLocation,
        description: jobData.jobDescription,
        price: jobData.jobBudget,
        status: "open",
        payment: "soooooon",
        phootgrapher: "none",
        companyId: company.uid,
        companyName: company.displayName,
        jobId: jobId
      })
      .then(() => {
        return database.ref(`company/${company.uid}/postedJobs/${jobId}`).set({
          jobId: jobId
        });
      })
      .then(() => {
        dispatch(createJobSucces());
        setTimeout(() => {
          history.push(`/dashboard`);
        }, 500);
      })
      .catch(err => {
        dispatch(createJobError(err));
      });
  };
};

/*
checkForm = () => {
  const { jobbTitle, jobbLocation, jobbBudget, jobbDescription } = this.state;
  if (!/^[a-z -]{5,}$/gi.test(jobbTitle)) {
    return "Job title must have at least 5 chars, letters,spaces and -";
  } else if (!jobbLocation) {
    return "The jobb location must be completed.";
  } else if (!jobbBudget || Number(jobbBudget) < 10) {
    return "The job budget must filled and higher then 10$";
  } else if (!/^[a-z -\.]{20,}$/gi.test(jobbDescription)) {
    return "Job description must have at least 20 chars, containing letters,spaces, - and points";
  } else {
    return true;
  }
};
*/
