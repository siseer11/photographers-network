import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../contents/shared/dashboard/Dashboard";
import SignIn from "../contents/shared/sign-in/SignIn";
import Home from "../contents/shared/home/Home";
import SignUp from "../contents/shared/sign-up/SignUp";
import Profile from "../contents/shared/profile/Profile";
import SearchPhotographer from "../contents/company/search-photographer/SearchPhotographer";
import CreateJobb from "../contents/company/create-job/CreateJobb";
import MyJobOffers from "../contents/company/my-jobs/MyJobOffers";
import Jobs from "../contents/shared/jobs/Jobs";
import ProfileEdit from "../contents/shared/profile/ProfileEdit";
import GbNavBar from "../components/nav-footer/gbNav";
import PrivateJobRequest from "../components/PrivateJobRequests";
import DeclinedPrivateJob from "../components/DeclinedPrivateJob";
import SubmitWork from "../contents/photographer/single-job/SubmitWork";
import ProgressSingleJob from "../contents/shared/single-job/ProgressSingleJob";
import OpenSingleJob from "../contents/shared/single-job/OpenSingleJob";
import LocationSearchInput from "./auto";
import { GbFooter } from "../components/nav-footer/Footer";

export default ({ userOn, userType }) => (
  <BrowserRouter>
    <React.Fragment>
      <GbNavBar />
      <Switch>
        <Route
          exact
          path="/autocomplete"
          render={() => <LocationSearchInput />}
        />
        <Route
          exact
          path="/declined-private-job/:jobId"
          render={props =>
            userOn ? (
              <DeclinedPrivateJob {...props} />
            ) : (
              <Redirect to="/signIn" />
            )
          }
        />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/signIn"
          render={props =>
            userOn ? <Redirect to="/dashboard" /> : <SignIn {...props} />
          }
        />
        <Route
          exact
          path="/signUp/:type"
          render={props =>
            !userOn ? <SignUp {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          render={props =>
            userOn ? <Dashboard {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/ProfileEdit"
          render={props =>
            userOn ? <ProfileEdit {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/profile/:uid"
          render={props => <Profile {...props} />}
        />
        <Route
          exact
          path="/search-photographers"
          render={props => <SearchPhotographer {...props} />}
        />
        <Route
          exact
          path="/createJob"
          render={props =>
            userType === "company" ? (
              <CreateJobb {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/myJobOffers"
          render={props =>
            userType === "company" ? (
              <MyJobOffers {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route exact path="/jobs" render={props => <Jobs {...props} />} />
        <Route
          exact
          path="/private/job/:jobId"
          render={props =>
            userOn ? (
              <PrivateJobRequest {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/open-job/:jobid"
          render={props =>
            userOn ? <OpenSingleJob {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/progress-job/:jobid"
          render={props =>
            userOn ? (
              <ProgressSingleJob {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/submit-work/:jobid"
          render={props =>
            userOn ? <SubmitWork {...props} /> : <Redirect to="/signin" />
          }
        />
        <Redirect to="/home" />
      </Switch>
      <GbFooter />
    </React.Fragment>
  </BrowserRouter>
);
