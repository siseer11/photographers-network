import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoadingPage from "../components/LoadingPage";
import GbNavBar from './gbNav';
import {PhotographerPortfolioList} from '../components/gb-card-photographer-portfolio-list';
import {CompanyPortfolioList} from '../components/gb-card-company-portfolio-list';
import {DashboardHeader} from "../components/dashboardHeader";
import {LinkLists} from "../components/LinkLists";
import {GbFooter} from '../components/Footer';
import {InstagramSVG} from "../components/svg/InstagramSVG";
import {TwitterSVG} from "../components/svg/TwitterSVG";
import {FacebookSVG} from "../components/svg/FacebookSVG";
import PhotographerContent from "./PhotographerContent";
import CompanyContent from "./CompanyContent";
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
                                    

                                    <DashboardHeader
                                     button={
                                     [{
                                         buttonValue: "My Jobs",
                                         buttonLink: '#'
                                     },
                                     {
                                        buttonValue: "My work",
                                        buttonLink: '#'
                                    },
                                    {
                                        buttonValue: "Profile",
                                        buttonLink: '#'
                                    },
                                     
                                     ]
                                    }>
                                    Welcome {user.displayName}!
                                    </DashboardHeader > 
    
                              

                                </div>) :
                            (<Redirect to="/"/>)) : (<LoadingPage/>)
                }
            </React.Fragment>
        );
    }
}