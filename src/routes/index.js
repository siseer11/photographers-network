import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {DashboardWithRouter} from "../containers/Dashboard";
import {LogInWithRouter} from '../containers/Login';
import Home from '../containers/Home';
import {RegisterWithRouter} from '../containers/Register';
import MyJobs from "../containers/MyJobs";

export default ({user, loadedResponse, type}) =>
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" render={() => <Home user={user} loadedResponse={loadedResponse} type={type}/>}/>
                <Route exact path="/login" component={LogInWithRouter}/>
                <Route exact path="/register" component={RegisterWithRouter}/>
                <Route exact path="/register/:type" component={RegisterWithRouter}/>
                <Route exact path="/my-jobs" component={MyJobs}/>
                <Route exact path="/dashboard"
                       render={() => <DashboardWithRouter user={user} loadedResponse={loadedResponse} type={type}/>}/>
                <Redirect to='/'/>
            </Switch>
        </div>
    </BrowserRouter>