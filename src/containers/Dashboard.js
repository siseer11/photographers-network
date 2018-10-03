import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoadingPage from "../components/LoadingPage";
import GbNavBar from './gbNav';
import {PhotographerDashboardHeader} from "../components/photographerDashboardHeader";
import {CompanyDashboardHeader} from "../components/comapnyDashboardHeader";
import fire from '../config/Fire';

export default class Dashboard extends Component {
    state = {
        pageLinks: [
            {txt: "Facebook", link: "www.facebook.com"},
            {txt: "Twitter", link: "www.twitter.com"}
        ]
    };

    /**
     * Logs out the user and redirects him to home.
     */
    logout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    };

    render() {
        const {user, type, loadedResponse} = this.props;
        console.log(type);
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
                                            [{txt: 'Sign out', clickHandler: this.logout}]
                                        }
                                        loggedIn={false}
                                    >
                                    Welcome {user.displayName}!
                                    </GbNavBar>

                                    {type === "photographer" ? (
                                        <PhotographerDashboardHeader>
                                            Welcome {user.displayName}!
                                    </PhotographerDashboardHeader >)
                                        : (
                                            <CompanyDashboardHeader>
                                                Welcome {user.displayName}!
                                    </CompanyDashboardHeader >
                                        )}

                                </div>) :
                            (<Redirect to="/"/>)) : (<LoadingPage/>)
                }
            </React.Fragment>
        );
    }
}