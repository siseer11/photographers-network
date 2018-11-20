import fire from "../../config/Fire";

const database = fire.database();
const storage = fire.storage();

// -------------------- ACTION TYPES -------------------- //
export const REMOVE_IMAGE_ERROR = "REMOVE_IMAGE_ERROR";
export const SUBMIT_WORK = "SUBMIT_WORK";
export const SUBMIT_WORK_ERROR = "SUBMIT_WORK_ERROR";

// -------------------- ACTION CREATORS -------------------- //
export const removeImageError = err => ({
  type: REMOVE_IMAGE_ERROR,
  message: err.message
});

export const submitWorkSuccess = images => ({
  type: SUBMIT_WORK,
  images
});

export const submitWorkError = err => ({
  type: SUBMIT_WORK_ERROR,
  message: err.message
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const removeImgFromDBandStore = (jobId, id) => {
  return (dispatch, getState) => {
    const auth = getState().firebase.auth;
    return database
      .ref(`photographer/${auth.uid}/applied-jobs/${jobId}/submitted-work/`)
      .child(id)
      .remove()
      .then(() =>
        storage
          .ref(`${auth.uid}/submitted-works/${jobId}`)
          .child(id)
          .delete()
      )
      .catch(err => dispatch(removeImageError(err)));
  };
};

export const submitWork = (jobId, images) => {
  return dispatch => {
    database
      .ref("requests")
      .child(jobId)
      .update({ "submitted-work": images })
      .then(() => dispatch(submitWorkSuccess(images)))
      .catch(err => dispatch(submitWorkError(err)));
  };
};
