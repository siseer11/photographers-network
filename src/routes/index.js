import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import SignIn from "../containers/SignIn";
import Home from "../containers/Home";
import SignUp from "../containers/SignUp";
import MyJobs from "../containers/MyJobs";
import CreateJobb from "../containers/CreateJobb";
import MyJobOffers from "../containers/MyJobOffers";
import Jobs from "../containers/Jobs";

export default ({ user, loadedResponse, type }) => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <Home
            {...props}
            user={user}
            loadedResponse={loadedResponse}
            type={type}
          />
        )}
      />
      <Route exact path="/signIn" render={props => <SignIn {...props} />} />
      <Route exact path="/signUp" render={props => <SignUp {...props} />} />
      <Route
        exact
        path="/signUp/:type"
        render={props => <SignUp {...props} />}
      />
      <Route exact path="/my-jobs" component={MyJobs} />
      <Route
        exact
        path="/dashboard"
        render={props => (
          <Dashboard
            {...props}
            user={user}
            loadedResponse={loadedResponse}
            type={type}
          />
        )}
      />
      <Route
        exact
        path="/createJob"
        render={props => (
          <CreateJobb
            {...props}
            user={user}
            loadedResponse={loadedResponse}
            type={type}
          />
        )}
      />
      <Route
        exact
        path="/myJobOffers"
        render={props => (
          <MyJobOffers
            {...props}
            user={user}
            loadedResponse={loadedResponse}
            type={type}
          />
        )}
      />
      <Route exact path='/jobs' component={Jobs}/>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
