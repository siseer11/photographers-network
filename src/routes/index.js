import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import SignIn from "../containers/SignIn";
import Home from "../containers/Home";
import SignUp from "../containers/SignUp";
import MyJobs from "../containers/MyJobs";
import Profile from "../containers/Profile";
import SearchPhotographer from "../containers/SearchPhotographer";

export default ({user, loadedResponse, type}) => (
    <BrowserRouter>
        <Switch>
            <Route
                exact
                path="/"
                render={props => (
                    <Home {...props} user={user} loadedResponse={loadedResponse} type={type}/>
                )}
            />
            <Route exact path="/signIn" render={props => <SignIn {...props} />}/>
            <Route exact path="/signUp" render={props => <SignUp {...props} />}/>
            <Route exact path="/signUp/:type" render={props => <SignUp {...props} />}/>
            <Route exact path="/my-jobs" component={MyJobs}/>
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
            <Route exact path="/profile"
                   render={props => (
                       <Profile
                           {...props}
                           user={user}
                           loadedResponse={loadedResponse}
                           type={type}
                       />)}/>
            <Route exact path="/profile/:uid" component={Profile}/>
            <Route exact path="/search-photographers" render={props => <SearchPhotographer {...props} user={user}/>}/>
            <Redirect to="/"/>
        </Switch>
    </BrowserRouter>
);
