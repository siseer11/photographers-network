// -------------------- ACTION TYPES -------------------- //
export const SUBMIT_WORK = "SUBMIT_WORK";
export const SUBMIT_WORK_ERROR = "SUBMIT_WORK_ERROR";
export const SET_INSURANCE = "SET_INSURANCE";
export const SET_INSURANCE_ERROR = "SET_INSURANCE_ERRO";

// -------------------- ACTION CREATORS -------------------- //

export const submitWorkSuccess = () => ({
  type: SUBMIT_WORK,
});

export const submitWorkError = err => ({
  type: SUBMIT_WORK_ERROR,
  message: err.message
});

export const setInsuranceSuccess = () => ({
  type: SET_INSURANCE
});

export const setInsuranceError = err => ({
  type: SET_INSURANCE_ERROR,
  message: err.message
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
/**
 * Updates the delivery date and status of the submitted work.
 * deliverStatus makes work visible for companies.
 *
 * @param jobId
 * @returns {function(*, *, {getFirestore: *})}
 */
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

export const setInsurancePaymentStatus = jobId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore.collection("jobOffers").doc(jobId).update({
      insurancePaymentStatus: "done"
    })
      .then(() => dispatch(setInsuranceSuccess()))
      .catch(err => dispatch(setInsuranceError(err)));
  };
};
