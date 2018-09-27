import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {DashboardWithRouter} from "../containers/Dashboard";
import {LogInWithRoute} from '../containers/Login';
import Home from '../containers/Home';
import Register from '../containers/Register';

export default ({userState}) =>
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={LogInWithRoute}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/dashboard" component={() => <DashboardWithRouter userState={userState}/>}/>
                <Redirect to='/'/>
            </Switch>
        </div>
    </BrowserRouter>