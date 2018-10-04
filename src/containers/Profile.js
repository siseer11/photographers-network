import React, { Component } from 'react';
import LoadingPage from "../components/LoadingPage";
import fire from '../config/Fire';

export default class Profile extends Component {
	state = {
		pageLinks: [
			{ txt: "Facebook", link: "www.facebook.com" },
			{ txt: "Twitter", link: "www.twitter.com" }
		],
		uid: this.props.match.params.uid
	};
	database = fire.database().ref();

	/**
	 * Logs out the user and redirects him to home.
	 */
	logout = () => {
		fire.auth().signOut();
		this.props.history.push('/');
	};

	render() {
		const { user, loading } = this.props;
		const { uid } = this.state;
		return (
			<React.Fragment>
				{
					loading ? (
						<LoadingPage />
					) : (
						user && user.userId==uid ? (
							<MyProfile />
						):(
							<OtherProfile />
						)
					)
				}
			</React.Fragment>
		);
	}
}

const MyProfile = (props) => <h2>MyProfile</h2>

const OtherProfile = (props) => <h2>OtherProfile</h2>