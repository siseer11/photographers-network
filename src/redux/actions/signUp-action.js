import fire from "../../config/Fire";

// -------------------- ACTION TYPES -------------------- //
export const SIGNUP_USER_START = "SIGNUP_USER_START";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";
// -------------------- ACTION CREATORS -------------------- //
export const signUpStart = () => ({
  type: SIGNUP_USER_START
});

export const singUpSuccess = () => ({
  type: SIGNUP_USER_SUCCESS
});

export const signUpError = err => ({
  type: SIGNUP_USER_ERROR,
  error: err
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //
export const sigUpUser = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(signUpStart());

    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        type: newUser.type,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        location: newUser.location,
        photoURL: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
      });
    }).then(() => {
      dispatch(singUpSuccess());
    }).catch((err) => {
      dispatch(signUpError(err));
    });
  }
};

/*
export const sigUpUser = data => {
  return (dispatch, getState) => {
    dispatch(signUpStart());

    const { name, email, password, password2, type, location } = data;
    let uid = "";
    if (password === password2) {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(snap => {
          uid = snap.user.uid;
          return true;
        })
        .then(() => {
          return fire
            .database()
            .ref("users")
            .child(uid)
            .set({
              type: type,
              email: email,
              displayName: name,
              location: location,
              photoURL:
                "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
            });
        })
        .then(() => {
          return fire
            .database()
            .ref(type)
            .child(uid)
            .set({
              email: email,
              location: location
            });
        })
        .then(() => {
          return fire
            .database()
            .ref("locations")
            .child(`/${location}/${type}/${uid}`)
            .set({
              displayName: name,
              photoURL:
                "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
            });
        })
        .then(() => {
          dispatch(singUpSuccess());
        })
        .catch(err => {
          dispatch(signUpError(err));
        });
    } else {
      dispatch(signUpError("Passwords does not match."));
    }
  };
};*/
