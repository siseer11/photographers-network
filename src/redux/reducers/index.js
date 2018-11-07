import {combineReducers} from "redux";
import {user} from "./user-reducer";
import {allJobs} from "./allJobs-reducer";
import {notificationsReducer} from "./notifications-reducer";
import {firebaseReducer} from 'react-redux-firebase';
import {singleJobReducer} from "./singleJob-reducer";

const MainReducer = combineReducers({
  user,
  allJobs,
  notifications: notificationsReducer,
  firebase: firebaseReducer,
  singleJob: singleJobReducer
});

export default MainReducer;
