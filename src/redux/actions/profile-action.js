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
  return async (dispatch, getState, { getFirestore, getFIrebase }) => {
    try {
      const storageRef = await fire.storage().ref(`${userId}/avatar`);
      const task = await storageRef.put(file);
      const url = await task.ref.getDownloadURL();
      const response = await getFirestore()
        .collection("users")
        .doc(userId)
        .set({ profileImageUrl: url }, { merge: true });
      return response;
    } catch (err) {
      return new Promise((resolve, reject) => reject(err));
    }
  };
};

//Make a photographer premium, Returns a Promise
export const markAsPremium = uid => (dispatch, getState, { getFirestore }) =>
  getFirestore()
    .collection("users")
    .doc(uid)
    .update({
      premium: true
    });
