import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const PROFILE_FETCHING_STARTED = "PROFILE_FETCHING_STARTED";
export const PROFILE_FETCHING_SUCCES = "PROFILE_FETCHING_SUCCES";
export const PROFILE_FETCHING_ERROR = "PROFILE_FETCHING_ERROR";
export const USER_INFO_UPDATED_SUCCESSFULLY = "USER_INFO_UPDATED_SUCCESSFULLY";
export const PHOTOURL_UPDATED_SUCCESSFULLY = "PHOTOURL_UPDATED_SUCCESSFULLY";

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
  return dispatch => {
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

export const updateUserInfo = (name, location, photoURL, user) => {
  return dispatch => {
    return fire
      .auth()
      .currentUser.updateProfile({
        displayName: name,
        photoURL: photoURL
      })
      .then(() => {
        if (user.location !== location && location !== "") {
          database
            .ref(`locations/${user.location}/${user.type}/${user.uid}`)
            .remove();

          database
            .ref(`locations/${location}/${user.type}/${user.uid}`)
            .set({
              displayName: name,
              photoURL: photoURL
            });
        }
      })
      .then(() => {
        database
          .ref("users")
          .child(user.uid)
          .update({
            location: location,
            displayName: name,
            photoURL: photoURL
          });
      })
      .then(() => {
        database
          .ref(user.type)
          .child(user.uid)
          .update({
            location: location
          });
      })
      .then(() => {
        const userData = {
          location,
          displayName: name,
          photoURL
        };
        dispatch({type: USER_INFO_UPDATED_SUCCESSFULLY, userData, uid: user.uid});
      });
  };
};

export const updatePhotoURL = (file, userId) => {
  return dispatch => {
    //create storage ref
    let storageRef = fire.storage().ref(`${userId}/avatar`);
    //upload file
    let task = storageRef.put(file);
    return task.on(
      "state_changed",
      function progress(snap) {
        console.log(snap);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        task.snapshot.ref
          .getDownloadURL()
          .then(downloadURL =>
            updatePhotoURLDB(downloadURL, userId, dispatch)
          );
      }
    );
  };
};

const updatePhotoURLDB = (downloadURL, userId, dispatch) => {
  database
    .ref("users")
    .child(userId)
    .update(
      {
        photoURL: downloadURL
      },
      err => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
          const userData = {
            photoURL: downloadURL
          };
          dispatch({type: PHOTOURL_UPDATED_SUCCESSFULLY, userData, uid: userId});
        }
      }
    );
};

export const markAsPremium = () => {
  return (dispatch, getState) => {
    return database
      .ref("users")
      .child(getState().firebase.auth.uid)
      .update(
        {
          premium: true
        });
  };
};


