import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { allJobs } from "./allJobs-reducer";
import { notificationsReducer } from "./notifications-reducer";
import { firebaseReducer } from 'react-redux-firebase';

const MainReducer = combineReducers({ user, allJobs, notifications: notificationsReducer, firebase: firebaseReducer });

export default MainReducer;
