import {
  actionStarted,
  actionError,
  actionSucces
} from "./generalLoadingErrorSucces-actions";

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const sigUpUser = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(actionStarted());

    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        let userInformations = {
          type: newUser.type,
          location: newUser.location,
          photoURL:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          uid: resp.user.uid
        };

        if (newUser.type == "photographer") {
          userInformations = {
            ...userInformations,
            firstName: newUser.firstName,
            lastName: newUser.lastName
          };
        } else {
          userInformations = {
            ...userInformations,
            companyName: newUser.companyName
          };
        }

        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set(userInformations);
      })
      .then(() => {
        dispatch(actionSucces());
      })
      .catch(err => {
        dispatch(actionError(err));
      });
  };
};
