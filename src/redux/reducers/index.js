import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { allJobs } from "./allJobs-reducer";
import { notificationsReducer } from "./notifications-reducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { singleJobReducer } from "./singleJob-reducer";
import { profilesReducer } from "./profilesReducer";
import { createJobReducer } from "./createJob-reducer";
import { searchPhotographerReducer } from "./searchPhotographer-reducer";
import { privateJobReducer } from "./privateJob-reducer";
import { acceptDeclinePrivateJob } from "./acceptDeclinePrivateJob-reducer";
import { generalLoadingErrorSucces } from "./generalLoadingErrorSucces-reducer";

const MainReducer = combineReducers({
  user,
  allJobs,
  notifications: notificationsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  singleJob: singleJobReducer,
  profiles: profilesReducer,
  createJob: createJobReducer,
  photographers: searchPhotographerReducer,
  privateJobRequest: privateJobReducer,
  acceptDeclinePrivateJob: acceptDeclinePrivateJob,
  generalLoadingErrorSucces: generalLoadingErrorSucces
});

export default MainReducer;
