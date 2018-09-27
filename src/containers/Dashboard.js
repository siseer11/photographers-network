import React, {Component} from 'react';
import fire from '../config/Fire';
import {withRouter, Redirect} from 'react-router-dom';
import {Button} from '../components/Button';

class Dashboard extends Component {
    /**
     * Logs out the user and redirects him to home.
     */
    logout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    };

    render() {
        // avoids that user just types in the path to dashboard, without being logged in
        if(!this.props.userState) {
            return (<Redirect to="/"/>);
        } else {
            return (
                <div className="section-content">
                    <h1>Dashboard</h1>
                    <Button clickHandler={this.logout} classes="gb-btn gb-btn-small gb-btn-primary">Logout</Button>
                </div>
            );
        }
    }
}

export const DashboardWithRouter = withRouter(Dashboard);