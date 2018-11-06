import { combineReducers } from "redux";
import { user } from "./user-reducer";
import { allJobs } from "./allJobs-reducer";

const MainReducer = combineReducers({ user, allJobs });

export default MainReducer;
