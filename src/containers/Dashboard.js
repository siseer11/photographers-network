import React, {Component} from 'react';
import fire from '../config/Fire';
import {withRouter, Redirect} from 'react-router-dom';
import {Button} from '../components/Button';
import LoadingPage from "../components/LoadingPage";

class Dashboard extends Component {
    /**
     * Logs out the user and redirects him to home.
     */
    logout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    };

    render() {
        const {user, type, loadedResponse} = this.props;
        // checks, if there is already a response of the database
        // if not, shows the loading page
        // if yes, checks, if there is actually a user (to avoid to get to the dashboard
        // by just typing dashboard into the url), if there's none, redirects to home
        return (
            loadedResponse ?
                (user ?
                    (<div className="section-content">
                        <h1>Dashboard for {type}</h1>
                        <h3>Welcome to the photographer's network, {user.displayName}!</h3>
                        <Button clickHandler={this.logout} classes="gb-btn gb-btn-small gb-btn-primary">Logout</Button>
                    </div>) :
                    (<Redirect to="/"/>)) : (<LoadingPage/>)
        );
    }
}

export const DashboardWithRouter = withRouter(Dashboard);