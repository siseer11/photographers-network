// -------------------- ACTION TYPES -------------------- //
export const SUBMIT_WORK = "SUBMIT_WORK";
export const SUBMIT_WORK_ERROR = "SUBMIT_WORK_ERROR";

// -------------------- ACTION CREATORS -------------------- //

export const submitWorkSuccess = () => ({
  type: SUBMIT_WORK,
});

export const submitWorkError = err => ({
  type: SUBMIT_WORK_ERROR,
  message: err.message
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const submitWork = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore.collection("jobOffers").doc(jobId).update({
      deliveryDate: new Date(),
      deliveryStatus: "delivered"
    })
      .then(()=> dispatch(submitWorkSuccess()))
      .catch(err => dispatch(submitWorkError(err)));
  };
};
