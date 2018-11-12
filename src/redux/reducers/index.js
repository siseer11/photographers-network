import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { allJobs } from "./allJobs-reducer";
import { notificationsReducer } from "./notifications-reducer";
import { firebaseReducer } from "react-redux-firebase";
import { singleJobReducer } from "./singleJob-reducer";
import { profilesReducer } from "./profilesReducer";
import { signUpReducer } from "./signUp-reducer";

const MainReducer = combineReducers({
  user,
  allJobs,
  notifications: notificationsReducer,
  firebase: firebaseReducer,
  singleJob: singleJobReducer,
  profiles: profilesReducer,
  signUp: signUpReducer
});

export default MainReducer;
