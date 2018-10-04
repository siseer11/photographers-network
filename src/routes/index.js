import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import SignIn from "../containers/SignIn";
import Home from "../containers/Home";
import SignUp from "../containers/SignUp";
import {ProfileWithNav} from "../containers/Profile";
import SearchPhotographer from "../containers/SearchPhotographer";
import CreateJobb from "../containers/CreateJobb";
import MyJobOffers from "../containers/MyJobOffers";
import {JobsWithFooter} from "../containers/Jobs";
import SingleJob from '../containers/SingleJob'

<<<<<<< HEAD
export default ({user, loading, type , setLoadingTrue}) => (
||||||| merged common ancestors
export default ({user, loading, type}) => (
=======
export default ({user, loading, type, authenticated}) => (
>>>>>>> 563339a3beada91d55d592de0e5302a977265961
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <Home
            {...props}
            user={user}
            loading={loading}
          />
        )}
      />
      <Route exact path="/signIn" render={props => <SignIn {...props} setLoadingTrue={setLoadingTrue} loading={loading}/>}/>
      <Route exact path="/signUp" render={props => <SignUp {...props} />}/>
      <Route
        exact
        path="/signUp/:type"
        render={props => <SignUp {...props}/>}
      />
      <Route
        exact
        path="/dashboard"
        render={props => (
          <Dashboard
            {...props}
            user={user}
            loading={loading}
            authenticated={authenticated}
          />
        )}
      />
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
      <Route exact path='/jobs' component={JobsWithFooter}/>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>
);
