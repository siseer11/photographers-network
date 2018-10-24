import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "../contents/shared/Dashboard";
import SignIn from "../contents/SignIn";
import Home from "../contents/Home";
import SignUp from "../contents/SignUp";
import {ProfileWithNav} from "../contents/shared/Profile";
import SearchPhotographer from "../contents/company/SearchPhotographer";
import CreateJobb from "../contents/company/CreateJobb";
import MyJobOffers from "../contents/company/MyJobOffers";
import {JobsWithFooter} from "../contents/shared/Jobs";
import SingleJob from '../contents/shared/SingleJob';
import { ProfileEdit } from '../contents/shared/ProfileEdit';

export default ({user, loading, setLoadingTrue , updateUserInfo}) => (
  <BrowserRouter basename='/app/'>
    <Switch>
      <Route
        exact
        path="/home"
        render={props => (
          <Home
            {...props}
            user={user}
            loading={loading}
          />
        )}
      />
      <Route exact path="/signIn" 
        render={props => 
          <SignIn {...props} 
          setLoadingTrue={setLoadingTrue} 
          loading={loading}
          user={user}
          />}
        />
      <Route exact path="/signUp" render={props => <SignUp {...props} />}/>
      <Route
        exact
        path="/signUp/:type"
        render={props => (
        <SignUp {...props}
        loading={loading}
        user={user}
        />
        )
      }
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
      <Route exact path="/ProfileEdit" render={props => (
        <ProfileEdit
        {...props}
        user={user}
      />)}/>
      <Route exact path="/profile/:uid" render={props => (
        <ProfileWithNav
          {...props}
          user={user}
          loading={loading}
        />)}/>
      <Route exact path="/search-photographers" render={props => <SearchPhotographer {...props} user={user}/>}/>
      <Route
        exact
        path="/createJob"
        render={props => (
          <CreateJobb
            {...props}
            user={user}
            loading={loading}
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
            loading={loading}
          />
        )}
      />
      <Route 
				exact
				path='/job/:jobid'
				render={
					props=>(
						<SingleJob
						{...props}
						user={user}
						loading={loading}
						/>
					)
				}/>
      <Route exact path='/jobs' render={
					props=>(
						<JobsWithFooter
						{...props}
						user={user}
						loading={loading}
						/>
					)
				}/>
      <Redirect to="/home"/>
    </Switch>
  </BrowserRouter>
);
