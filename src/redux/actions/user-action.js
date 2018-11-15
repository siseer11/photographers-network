import fire from "../../config/Fire";
import {
  actionStarted,
  actionError,
  actionSucces,
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
        //Instead of actionSucces we call actionReset since there is a problem , from the redirect
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
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const uniqueId = new Date().getTime();
    const portfolio = photographerData.portfolio || [];

    //create storage ref
    let storageRef = getFirebase()
      .storage()
      .ref(`${uid}/portfolio/${uniqueId}`);
    //upload file
    let task = storageRef.put(imageFile);

    task.on(
      "state_changed",
      function progress(snap) {
        console.log(snap);
      },
      function error(err) {
        console.log("EROROROROROR");
        return err;
      },
      function complete() {
        return task.snapshot.ref.getDownloadURL().then(downloadURL =>
          getFirestore()
            .collection("users")
            .doc(uid)
            .set(
              {
                ...photographerData,
                portfolio: [
                  ...portfolio,
                  { imgLink: downloadURL, imgDescription: imageDescription }
                ]
              },
              { merge: true }
            )
        );
      }
    );
  };
}
