import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const SEARCH_PHOTOGRAPHER_STARTED = "SEARCH_PHOTOGRAPHER_STARTED";
export const SEARCH_PHOTOGRAPHER_SUCCES = "SEARCH_PHOTOGRAPHER_SUCCES";
export const SEARCH_PHOTOGRAPHER_ERROR = "SEARCH_PHOTOGRAPHER_ERROR";
export const RESET_INITIAL_STATE = "RESET_INITIAL_STATE";

// -------------------- ACTION CREATORS -------------------- //

export const resetSearchState = () => ({
  type: RESET_INITIAL_STATE
});

export const searchPhotographerStarted = () => ({
  type: SEARCH_PHOTOGRAPHER_STARTED
});

export const searchPhotographerSucces = (
  photographersData = null,
  location = null
) => ({
  type: SEARCH_PHOTOGRAPHER_SUCCES,
  photographersData: photographersData,
  location: location
});

export const searchPhotographerError = err => ({
  type: SEARCH_PHOTOGRAPHER_ERROR,
  error: err
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //

export const searchPhotographer = location => {
  return (dispatch, getState) => {
    dispatch(searchPhotographerStarted());

    const state = getState();

    if (state.photographers.photographersData[location]) {
      dispatch(searchPhotographerSucces());
    } else {
      let photographers = [];

      database
        .ref(`locations/${location}/photographer`)
        .once("value")
        .then(snapshots => {
          snapshots.forEach(snap => {
            let data = snap.val();
            photographers.push({
              uid: snap.key,
              photoURL: data.photoURL,
              displayName: data.displayName,
              location: location
            });
          });
          dispatch(searchPhotographerSucces(photographers, location));
        })
        .catch(err => {
          dispatch(searchPhotographerError(err));
        });
    }
  };
};
