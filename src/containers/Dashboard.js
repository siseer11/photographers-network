import React, { Component } from 'react';
import fire from '../config/Fire';
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from '../components/Button';
import LoadingPage from "../components/LoadingPage";
import GbNavBar from '../components/gbNav';

class Dashboard extends Component {
	/**
	 * Logs out the user and redirects him to home.
	 */
	logout = () => {
		fire.auth().signOut();
		this.props.history.push('/');
	};

	render() {
		const { user, type, loadedResponse } = this.props;
		// checks, if there is already a response of the database
		// if not, shows the loading page
		// if yes, checks, if there is actually a user (to avoid to get to the dashboard
		// by just typing dashboard into the url), if there's none, redirects to home
		return (
			<React.Fragment>
				{
					loadedResponse ?
						(user ?
							(
								<div className='dashboard'>
								<GbNavBar
									righLinks={
										[{ txt: 'Logout' , clickHandler: this.logout}]
								}
								loggedIn={false}
								/>
							<div className="section-content" style={{paddingTop:100}}>
								<h1 className='gb-text-white'>Dashboard for {type}</h1>
								<h3 className='gb-text-white'>Welcome to the photographer's network!</h3>
							</div>
							</div>) :
							(<Redirect to="/" />)) : (<LoadingPage />)
				}
			</React.Fragment>
		);
	}
}


export const DashboardWithRouter = withRouter(Dashboard);