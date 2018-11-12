import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { allJobs } from "./allJobs-reducer";
import { notificationsReducer } from "./notifications-reducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore';
import { singleJobReducer } from "./singleJob-reducer";
import { profilesReducer } from "./profilesReducer";
import { signUpReducer } from "./signUp-reducer";
import { createJobReducer } from "./createJob-reducer";
import { searchPhotographerReducer } from "./searchPhotographer-reducer";
import { privateJobReducer } from "./privateJob-reducer";
import { acceptDeclinePrivateJob } from "./acceptDeclinePrivateJob-reducer";

const MainReducer = combineReducers({
  user,
  allJobs,
  notifications: notificationsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  singleJob: singleJobReducer,
  profiles: profilesReducer,
  signUp: signUpReducer,
  createJob: createJobReducer,
  photographers: searchPhotographerReducer,
  privateJobRequest: privateJobReducer,
  acceptDeclinePrivateJob: acceptDeclinePrivateJob
});

export default MainReducer;
