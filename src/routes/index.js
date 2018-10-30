import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../contents/shared/Dashboard";
import SignIn from "../contents/SignIn";
import Home from "../contents/Home";
import SignUp from "../contents/SignUp";
import { ProfileWithNav } from "../contents/shared/Profile";
import SearchPhotographer from "../contents/company/SearchPhotographer";
import CreateJobb from "../contents/company/CreateJobb";
import { JobsWithFooter } from "../contents/shared/Jobs";
import { PrivateJobRequest } from "../components/PrivateJobRequests";
import { DeclinedPrivateJob } from "../components/DeclinedPrivateJob";
import MyJobOffers from "../contents/company/my-jobs/MyJobOffers";
import SubmitWork from '../contents/photographer/single-job/SubmitWork';
import ProgressSingleJob from "../contents/shared/single-job/ProgressSingleJob";
import SingleJob from '../contents/shared/old/SingleJob';
import OpenSingleJob from "../contents/shared/single-job/OpenSingleJob";

export default ({user, loading, setLoadingTrue, updateUserInfo}) => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/declined-private-job/:jobId"
        render={props => (
          <DeclinedPrivateJob {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path="/home"
        render={props => <Home {...props} user={user} loading={loading} />}
      />
      <Route
        exact
        path="/signIn"
        render={props => (
          <SignIn
            {...props}
            setLoadingTrue={setLoadingTrue}
            loading={loading}
            user={user}
          />
        )}
      />
      <Route exact path="/signUp" render={props => <SignUp {...props} />} />
      <Route
        exact
        path="/signUp/:type"
        render={props => <SignUp {...props} loading={loading} user={user} />}
      />
      <Route
        exact
        path="/dashboard"
        render={props => (
          <Dashboard
            {...props}
            user={user}
            loading={loading}
            updateUserInfo={updateUserInfo}
          />
        )}
      />
      <Route
        exact
        path="/profile/:uid"
        render={props => (
          <ProfileWithNav {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path="/search-photographers"
        render={props => <SearchPhotographer {...props} user={user} />}
      />
      <Route
        exact
        path="/createJob"
        render={props => (
          <CreateJobb {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path="/myJobOffers"
        render={props => (
          <MyJobOffers {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path='/job/:jobid'
        render={
          props => (
            <SingleJob
              {...props}
              user={user}
              loading={loading}
            />
          )
        }/>
      <Route
        exact
        path='/open-job/:jobid'
        render={
          props => (
            <OpenSingleJob
              {...props}
              user={user}
              loading={loading}
            />
          )
        }/>
      <Route
        exact
        path='/progress-job/:jobid'
        render={
          props => (
            <ProgressSingleJob
              {...props}
              user={user}
              loading={loading}
            />
          )
        }/>
      <Route exact path='/submit-work/:jobid' render={props =>
        <SubmitWork {...props} user={user} loading={loading}/>}
      />
      <Route
        exact
        path="/submit-work/:jobid"
        render={props => (
          <SubmitWork {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path="/jobs"
        render={props => (
          <JobsWithFooter {...props} user={user} loading={loading} />
        )}
      />
      <Route
        exact
        path="/private/job/:jobId"
        render={props => (
          <PrivateJobRequest {...props} user={user} loading={loading} />
        )}
      />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>
);
