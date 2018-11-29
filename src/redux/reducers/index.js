import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { generalLoadingErrorSucces } from "./generalLoadingErrorSucces-reducer";

const MainReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  generalLoadingErrorSucces: generalLoadingErrorSucces
});

export default MainReducer;
