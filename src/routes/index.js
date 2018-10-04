import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import SignIn from "../containers/SignIn";
import Home from "../containers/Home";
import SignUp from "../containers/SignUp";
import MyJobs from "../containers/MyJobs";
import Profile from "../containers/Profile";
import SearchPhotographer from "../containers/SearchPhotographer";
import CreateJobb from "../containers/CreateJobb";
import MyJobOffers from "../containers/MyJobOffers";
import Jobs from "../containers/Jobs";
import SingleJob from '../containers/SingleJob'

export default ({ user, loading, authenticated }) => (
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
			<Route exact path="/signIn" render={props => <SignIn {...props} />} />
			<Route exact path="/signUp" render={props => <SignUp {...props} />} />
			<Route
				exact
				path="/signUp/:type"
				render={props => <SignUp {...props}/>}
			/>
			<Route exact path="/my-jobs" component={MyJobs} />
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
			<Route exact path="/profile"
				render={props => (
					<Profile
						{...props}
						user={user}
						loading={loading}
						authenticated={authenticated}
					/>)} />
			<Route exact path="/profile/:uid" render={props => (
					<Profile
						{...props}
						user={user}
						loading={loading}
						authenticated={authenticated}
					/>)} />
			<Route exact path="/search-photographers" render={props => <SearchPhotographer {...props} user={user} />} />
			<Route
				exact
				path="/createJob"
				render={props => (
					<CreateJobb
						{...props}
						user={user}
						loading={loading}
						authenticated={authenticated}
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
						authenticated={authenticated}
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
						authenticated={authenticated}
						/>
					)
				}/>
			<Route exact path='/jobs' component={Jobs} />
			<Redirect to="/" />
		</Switch>
	</BrowserRouter>
);


