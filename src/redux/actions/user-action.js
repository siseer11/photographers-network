import fire from "../../config/Fire";
import {
  actionStarted,
  actionError,
  actionSuccess,
  actionReset
} from "./generalLoadingErrorSucces-actions";

// -------------------- ACTION TYPES -------------------- //
export const USER_SIGNED_OUT = "USER_LOGGED_OUT";

// -------------------- ACTION CREATORS -------------------- //
export const userSignedOut = () => ({
  type: USER_SIGNED_OUT
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
//Signs user out
export function signOutUser() {
  return dispatch => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("ouuuuuuuuut");
        dispatch(userSignedOut());
      })
      .catch(err => {
        console.log("some error with the signOut, in action");
        console.error(err);
      });
  };
}

//Signs user in
export function signUserInAsync(email, password) {
  return dispatch => {
    //Set loading to true
    dispatch(actionStarted());

    //Send the request to firebase, and wait for response
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //If it succed turn succes to true and loading false
        //Instead of actionSuccess we call actionReset since there is a problem , from the redirect
        dispatch(actionReset());
      })
      .catch(() => dispatch(actionError()));
  };
}

//Switch hireable for photographers , returns Promise
export function switchHireable(to, photographerId) {
  return (dispatch, getState, { getFirestore }) => {
    return getFirestore()
      .collection("users")
      .doc(photographerId)
      .update({ hireable: to });
  };
}

//Add photo to portfolio
export function uploadPortofolioPhoto(
  imageFile,
  imageDescription,
  uid,
  photographerData
) {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const uniqueId = new Date().getTime();
    const portfolio = photographerData.portfolio || [];

    //create storage ref
    let storageRef = getFirebase()
      .storage()
      .ref(`${uid}/portfolio/${uniqueId}`);

    //upload file
    try {
      const snap = await storageRef.put(imageFile);
      const downloadUrl = await snap.ref.getDownloadURL();
      return getFirestore()
        .collection("users")
        .doc(uid)
        .set(
          {
            portfolio: [
              ...portfolio,
              {
                imageUrl: downloadUrl,
                imageDescription: imageDescription,
                id: uniqueId
              }
            ]
          },
          { merge: true }
        );
    } catch (err) {
      return new Promise((resolve, reject) => reject(err));
    }
  };
}
