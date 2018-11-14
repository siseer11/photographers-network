// -------------------- ACTION TYPES -------------------- //
export const CREATE_JOB_STARTED = "CREATE_JOB_STARTED";
export const CREATE_JOB_ERROR = "CREATE_JOB_ERROR";
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS";

// -------------------- ACTION CREATORS -------------------- //

export const createJobError = err => ({
  type: CREATE_JOB_ERROR,
  error: err
});

export const createJobSucces = () => ({
  type: CREATE_JOB_SUCCESS
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const createJob = jobData => {
  return (dispatch, getState, {getFirestore}) => {
    const firebase = getState().firebase;
    return getFirestore().collection('jobOffers').add({
      startDate: jobData.date,
      title: jobData.jobTitle,
      requestedSkill: jobData.jobType,
      location: jobData.jobLocation,
      description: jobData.jobDescription,
      priceAmount: jobData.jobBudget,
      status: "open",
      downPaymentAmountStatus: "none",
      photographer: "none",
      companyId: firebase.auth.uid,
      companyName: `${firebase.profile.firstName} ${firebase.profile.lastName}`,
      createdAt: new Date(),
    })
      .then(() => createJobSucces())
      .catch(err => createJobError(err));
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
