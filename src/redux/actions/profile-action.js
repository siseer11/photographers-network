import {
  actionError,
  actionStarted,
  actionSuccess
} from "./generalLoadingErrorSucces-actions";

// -------------------- ASYNC ACTIONS THUNK -------------------- //
/**
 * Updates concerning user info, depending,
 * if company or photographer.
 *
 * @param firstName
 * @param lastName
 * @param location
 * @param companyName
 * @param type
 * @returns {function(*, *, {getFirestore: *})}
 */
export const updateUserInfo = (
  firstName,
  lastName,
  location,
  companyName,
  type
) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch(actionStarted());
    const firestore = getFirestore();
    const userInfo =
      type === "company"
        ? {
            companyName,
            location
          }
        : {
            firstName,
            lastName,
            location
          };
    return firestore
      .collection("users")
      .doc(getState().firebase.auth.uid)
      .update({
        ...userInfo
      })
      .then(() => {
        dispatch(actionSuccess(userInfo));
      })
      .catch(err => dispatch(actionError(err)));
  };
};

/**
 * Updates the profile picture.
 *
 * @param file
 * @param userId
 * @returns {function(*, *, {getFirestore: *})}
 */
export const updatePhotoURL = (file, userId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const storageRef = await getFirebase()
        .storage()
        .ref(`${userId}/avatar`);
      const task = await storageRef.put(file);
      const url = await task.ref.getDownloadURL();
      return await getFirestore()
        .collection("users")
        .doc(userId)
        .set({ profileImageUrl: url }, { merge: true });
    } catch (err) {
      return new Promise((resolve, reject) => reject(err));
    }
  };
};

/**
 * Make a photographer premium
 * @param uid
 */
export const markAsPremium = uid => (dispatch, getState, { getFirestore }) =>
  getFirestore()
    .collection("users")
    .doc(uid)
    .update({
      premium: true
    });
