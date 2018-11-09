import fire from "../../config/Fire";

// -------------------- ACTION TYPES -------------------- //
export const SIGNUP_USER_START = "SIGNUP_USER_START";
export const SIGNUP_USER_SUCCES = "SIGNUP_USER_SUCCES";
export const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";
// -------------------- ACTION CREATORS -------------------- //
export const signUpStart = () => ({
  type: SIGNUP_USER_START
});

export const singUpSucces = () => ({
  type: SIGNUP_USER_SUCCES
});

export const signUpError = err => ({
  type: SIGNUP_USER_ERROR,
  error: err
});

// -------------------- ASYNC ACTIONS THUNK -------------------- //

/*
SEND THIS DATA, THE PROFILE DATA TO THE PROFILE REDUCER SO IT WILL PUT IT INTO THE STORE
WILL SKIP THE FETCH FROM THE DATABASE ON AUTH STATE CHANGE
*/

export const sigUpUser = data => {
  return (dispatch, getState) => {
    dispatch(signUpStart());

    const { name, email, password, password2, type, location } = data;
    if (password === password2) {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(snap => {
          const user = snap.user;
          fire.database
            .ref("users")
            .child(user.uid)
            .set({
              type: type,
              email: user.email,
              displayName: name,
              location: location,
              photoURL:
                "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
            });
        })
        .then(() => {
          dispatch(singUpSucces());
        })
        .catch(err => {
          dispatch(signUpError(err));
        });
    }
  };
};

/*
signup logic
  signup = e => {
   e.preventDefault();
       .then(snap => {
         let user = snap.user;
         user.updateProfile({
           displayName: name,
           photoURL:
             "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
         });
         //TODO: find better profile url
         this.database
           .child(type)
           .child(user.uid)
           .set({
             email: user.email,
             location: location
           })
           .then(() => {
             this.database
               .child("locations")
               .child(location)
               .child(type)
               .child(user.uid)
               .set({
                 displayName: name,
                 photoURL:
                   "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
               });
           })
           .then(() => {
             
           })
           .then(() => {
             this.props.history.replace("/dashboard");
           })
           .catch(err => console.log(err));
       })
       .catch(error => {
         console.log(error);
       });
   }
 };
 */
