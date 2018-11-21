// -------------------- ACTION TYPES -------------------- //
export const ACTION_STARTED = "ACTION_STARTED";
export const ACTION_ERROR = "ACTION_ERROR";
export const ACTION_SUCCESS = "ACTION_SUCCESS";
export const ACTION_RESET = "ACTION_RESET";

// -------------------- ACTION CREATORS -------------------- //

export const actionStarted = () => ({
  type: ACTION_STARTED
});

export const actionError = error => ({
  type: ACTION_ERROR,
  error
});

export const actionSuccess = (data = null) => ({
  type: ACTION_SUCCESS,
  data
});

export const actionReset = () => ({
  type: ACTION_RESET
});
