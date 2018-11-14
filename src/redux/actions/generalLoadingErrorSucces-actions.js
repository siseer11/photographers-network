// -------------------- ACTION TYPES -------------------- //
export const ACTION_STARTED = "ACTION_STARTED";
export const ACTION_ERROR = "ACTION_ERROR";
export const ACTION_SUCCES = "ACTION_SUCCES";
export const ACTION_RESET = "ACTION_RESET";

// -------------------- ACTION CREATORS -------------------- //

export const actionStarted = () => ({
  type: ACTION_STARTED
});

export const actionError = error => ({
  type: ACTION_ERROR,
  error
});

export const actionSucces = (data = null) => ({
  type: ACTION_SUCCES,
  data
});

export const actionReset = () => ({
  type: ACTION_RESET
});
