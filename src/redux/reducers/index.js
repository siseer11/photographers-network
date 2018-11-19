import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { singleJobReducer } from "./singleJob-reducer";
import { profilesReducer } from "./profilesReducer";
import { privateJobReducer } from "./privateJob-reducer";
import { acceptDeclinePrivateJob } from "./acceptDeclinePrivateJob-reducer";
import { generalLoadingErrorSucces } from "./generalLoadingErrorSucces-reducer";

const MainReducer = combineReducers({
  user,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  singleJob: singleJobReducer,
  profiles: profilesReducer,
  privateJobRequest: privateJobReducer,
  acceptDeclinePrivateJob: acceptDeclinePrivateJob,
  generalLoadingErrorSucces: generalLoadingErrorSucces
});

export default MainReducer;
