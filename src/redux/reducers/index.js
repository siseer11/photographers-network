import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { allJobs } from "./allJobs-reducer";
import { notificationsReducer } from "./notifications-reducer";
import { firebaseReducer } from "react-redux-firebase";
import { singleJobReducer } from "./singleJob-reducer";
import { profilesReducer } from "./profilesReducer";

const MainReducer = combineReducers({
  user,
  allJobs,
  notifications: notificationsReducer,
  firebase: firebaseReducer,
  singleJob: singleJobReducer,
  profiles: profilesReducer
});

export default MainReducer;
