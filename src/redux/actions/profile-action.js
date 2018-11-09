import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const PROFILE_FETCHING_STARTED = "PROFILE_FETCHING_STARTED";
export const PROFILE_FETCHING_SUCCES = "PROFILE_FETCHING_SUCCES";
export const PROFILE_FETCHING_ERROR = "PROFILE_FETCHING_ERROR";

// -------------------- ACTION CREATORS -------------------- //
export const profileFetchingStart = () => ({
  type: PROFILE_FETCHING_STARTED
});

export const profileFetchingSucces = (profileId, profileData) => ({
  type: PROFILE_FETCHING_SUCCES,
  profileId: profileId,
  profileData: profileData
});

export const profileFetchingError = err => ({
  type: PROFILE_FETCHING_ERROR,
  error: err
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //

export const fetchProfileInfos = uid => {
  return (dispatch, getState) => {
    //Fetching procces started
    dispatch(profileFetchingStart());

    database
      .ref("users")
      .child(uid)
      .once("value")
      .then(snap => {
        const data = snap.val();

        const portofolio = data.portofolio
          ? Object.values(data.portofolio)
          : [];

        //Fetching procces succed
        dispatch(
          profileFetchingSucces(uid, {
            ...data,
            portofolio: portofolio,
            uid: uid
          })
        );
      })
      .catch(err => {
        //Fetching procces did not succed
        dispatch(profileFetchingError(err));
      });
  };
};
