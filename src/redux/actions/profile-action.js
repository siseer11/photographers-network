import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const USER_INFO_UPDATED_SUCCESSFULLY = "USER_INFO_UPDATED_SUCCESSFULLY";
export const PHOTOURL_UPDATED_SUCCESSFULLY = "PHOTOURL_UPDATED_SUCCESSFULLY";

// -------------------- ASYNC ACTIONS THUNK -------------------- //

export const updateUserInfo = (name, location, photoURL, user) => {
  return dispatch => {
    return fire
      .auth()
      .currentUser.updateProfile({
        displayName: name,
        photoURL: photoURL
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
        const userData = {
          location,
          displayName: name,
          photoURL
        };
        dispatch({
          type: USER_INFO_UPDATED_SUCCESSFULLY,
          userData,
          uid: user.uid
        });
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
          .then(downloadURL => updatePhotoURLDB(downloadURL, userId, dispatch));
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
          dispatch({
            type: PHOTOURL_UPDATED_SUCCESSFULLY,
            userData,
            uid: userId
          });
        }
      }
    );
};
