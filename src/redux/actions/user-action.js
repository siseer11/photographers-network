import fire from "../../config/Fire";

const database = fire.database();

// -------------------- ACTION TYPES -------------------- //
export const NO_USER_LOGGED_IN = "NO_USER_LOGGED_IN";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_SIGNED_OUT = "USER_LOGGED_OUT";
export const SIGN_USER_IN = "SIGN_USER_IN";

// -------------------- ACTION CREATORS -------------------- //
export const noUserLoggedIn = () => ({
  type: NO_USER_LOGGED_IN
});

export const userLoggedIn = userData => ({
  type: USER_LOGGED_IN,
  userData
});

export const userSignedOut = () => ({
  type: USER_SIGNED_OUT
});

// Just set the loading : true
export const signUserIn = () => ({
  type: SIGN_USER_IN
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export function setAuthListener() {
  return dispatch => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        dispatch(noUserLoggedIn());
      }
    });

    function fetchUserData(uid) {
      database
        .ref("users")
        .child(uid)
        .once("value", snap => {
          let userInfos = snap.val();
          userInfos = {
            ...userInfos,
            uid: uid,
            portofolio: Object.values(userInfos.portofolio || {})
          };
          dispatch(userLoggedIn(userInfos));
        })
        .catch(err => console.log(err));
    }
  };
}

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

export function signUserInAsync(email, password) {
  return dispatch => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        dispatch(signUserIn());
      })
      .catch(err => console.log(err));
  };
}
