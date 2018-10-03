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
            {txt: "Facebook", link: "www.facebook.com"},
            {txt: "Twitter", link: "www.twitter.com"}
        ],
        uid: this.props.match.params.uid || '',
        fetchedUserData: false,
        userData: null,
    };
    database = fire.database().ref();

    componentDidMount() {
        this.fetchUserInformation();
    }

    /**
     * Logs out the user and redirects him to home.
     */
    logout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    };

    /**
     * Fetches user information from the database with the uid-param.
     */
    fetchUserInformation = () => {
        const {uid} = this.state;
        let userData = {};
        this.database.child('users').child(uid).once('value')
            .then(snap => {
                let data = snap.val();
                userData = {
                    displayName: data.displayName,
                    email: data.email,
                    photoURL: data.photoURL,
                };
                //TODO: check, if it's your own profile
                //if(snap.key !== this.props.user.uid) {
                this.setState({userData: userData, fetchedUserData: true}, () => {
                    console.log("loaded:" + this.state.fetchedUserData);
                });
                //}
            });
    };

    render() {
        const {user, type, loadedResponse, authenticated} = this.props;
        const {fetchedUserData, userData, uid} = this.state;
        console.log(user);
        let otherUser = true;
        let loaded = false;
        let currUser = null;
        if (loadedResponse && fetchedUserData) {
            if (user.uid === uid || uid === '') {
                otherUser = false;
                currUser = user;
            } else {
                currUser = userData;
            }
            loaded = true;
            console.log("loaded everything!");
            console.log(currUser);
        }

        return (
            <React.Fragment>
                {
                    loaded ?
                        (user ?
                            (
                                <div className='profile'>
                                    <GbNavBar
                                        righLinks={
                                            [{txt: 'Sign out', clickHandler: this.logout}]
                                        }
                                        loggedIn={false}
                                    />
                                    <ProfileCard
                                        backgroundImg='https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340'
                                        profileImg="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
                                        type={type}
                                    >
                                        {currUser.displayName}
                                    </ProfileCard>
                                    <div className="profile-content">
                                        <LinkLists links={this.state.pageLinks}
                                                   txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
                                                   liClasses="footer-nav-item"/>
                                    </div>
                                    {otherUser ? (<div>Not your own profile</div>) : (
                                        type === "photographer" ? (<PhotographerContent/>) : (<CompanyContent/>)
                                    )}

                                    <GbFooter
                                        socialMedias={[
                                            {
                                                icon: <InstagramSVG
                                                    classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>, link: '#'
                                            },
                                            {
                                                icon: <TwitterSVG
                                                    classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
                                                link: '#'
                                            },
                                            {
                                                icon: <FacebookSVG
                                                    classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
                                                link: '#'
                                            }]}
                                    />
                                </div>) :
                            (<Redirect to="/"/>)) : (<LoadingPage/>)
                }
        );
    }
}

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