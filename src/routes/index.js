import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../contents/shared/Dashboard";
import SignIn from "../contents/SignIn";
import Home from "../contents/Home";
import SignUp from "../contents/SignUp";
import Profile from "../contents/shared/Profile";
import SearchPhotographer from "../contents/company/SearchPhotographer";
import CreateJobb from "../contents/company/CreateJobb";
import MyJobOffers from "../contents/company/my-jobs/MyJobOffers";
import Jobs from "../contents/shared/Jobs";
import ProfileEdit from "../contents/shared/ProfileEdit";
import GbNavBar from "../components/nav-footer/gbNav";
import { PrivateJobRequest } from "../components/PrivateJobRequests";
import { DeclinedPrivateJob } from "../components/DeclinedPrivateJob";
import SubmitWork from "../contents/photographer/single-job/SubmitWork";
import ProgressSingleJob from "../contents/shared/single-job/ProgressSingleJob";
import OpenSingleJob from "../contents/shared/single-job/OpenSingleJob";
import { GbFooter } from "../components/nav-footer/Footer";

export default ({
  user,
  loading,
  setLoadingTrue,
  updateUserInfo,
  userOn,
  userType
}) => (
  <BrowserRouter>
    <React.Fragment>
      <GbNavBar />
      <Switch>
        <Route
          exact
          path="/declined-private-job/:jobId"
          render={props => (
            <DeclinedPrivateJob {...props} user={user} loading={loading} />
          )}
        />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/signIn"
          render={props =>
            !userOn ? (
              <SignIn {...props} setLoadingTrue={setLoadingTrue} />
            ) : (
              <Redirect to="/dashboard" />
            )
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
            userOn ? (
              <ProfileEdit {...props} updateUserInfo={updateUserInfo} />
            ) : (
              <Redirect to="/signin" />
            )
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
            userType == "company" ? (
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
            userType == "company" ? (
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
            userOn ? <PrivateJobRequest {...props} /> : <Redirect to="signin" />
          }
        />
        <Redirect to="/home" />
      </Switch>
      <GbFooter />
    </React.Fragment>
  </BrowserRouter>
);

/*
      <Route
        exact
        path="/open-job/:jobid"
        render={props => (
          <OpenSingleJob {...props} />
        )}
      />
      <Route
        exact
        path="/progress-job/:jobid"
        render={props => (
          <ProgressSingleJob {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path="/submit-work/:jobid"
        render={props => (
          <SubmitWork {...props} user={user} loading={loading} />
        )}
      />
      */
