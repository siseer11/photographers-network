import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPage from "../components/LoadingPage";
import GbNavBar from '../components/gbNav';
import { ProfileCard } from "../components/ProfileCard";
import { LinkLists } from "../components/LinkLists";
import PhotographerContent from "./PhotographerContent";
import CompanyContent from "./CompanyContent";
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
		const { user, type, loading, authentificated } = this.props;
		const { pageLinks , uid } = this.state;
		console.log(authentificated);
		return (
			<React.Fragment>
				{
					loading ? (
						<LoadingPage />
					) : (
						authentificated && user.userId==uid ? (
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




















/*
<ProfileView {...this.props} logoutHandler={this.logout} pageLinks={pageLinks} uid={uid} />


const ProfileView = ({ type, user, logoutHandler, pageLinks, uid }) => (
	<div className='profile'>
		<GbNavBar
			righLinks={
				[{ txt: 'Sign out', clickHandler: logoutHandler }]
			}
			loggedIn={false}
		/>
		<ProfileCard
			backgroundImg='https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340'
			profileImg="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
			type={type}
		>
			{user.displayName}
		</ProfileCard>

		<div className="profile-content">
			<LinkLists links={pageLinks}
				txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
				liClasses="footer-nav-item" />
		</div>

	</div>
)

*/
/*
		{uid ? (
			<div>Not your own profile</div>
		) : (
				type === "photographer" ? (
					<PhotographerContent />
				) : (
						<CompanyContent />
					)
			)
		}
		*/