import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { singleJobReducer } from "./singleJob-reducer";
import { privateJobReducer } from "./privateJob-reducer";
import { acceptDeclinePrivateJob } from "./acceptDeclinePrivateJob-reducer";
import { generalLoadingErrorSucces } from "./generalLoadingErrorSucces-reducer";

const MainReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  singleJob: singleJobReducer,
  privateJobRequest: privateJobReducer,
  acceptDeclinePrivateJob: acceptDeclinePrivateJob,
  generalLoadingErrorSucces: generalLoadingErrorSucces
});

export default MainReducer;
