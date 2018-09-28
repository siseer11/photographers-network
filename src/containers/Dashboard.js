import React, {Component} from 'react';
import fire from '../config/Fire';
import {withRouter, Redirect} from 'react-router-dom';
import {Button} from '../components/Button';
import LoadingPage from "../components/LoadingPage";

class Dashboard extends Component {
    state = {
        user: null,
        loadedResponse: false
    };

    /**
     * Checks user state, each time a component did mount.
     */
    componentDidMount() {
        this.authListener();
    }

    /**
     * Checks, if user is logged in and updates state.
     */
    authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                this.setState({user}, () => this.setState({loadedResponse: true}));
            } else {
                this.setState({user: null}, () => this.setState({loadedResponse: true}));
            }
        });
    };

    /**
     * Logs out the user and redirects him to home.
     */
    logout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    };

    render() {
        // avoids that user just types in the path to dashboard, without being logged in
        let currUser = fire.auth().currentUser;
        console.log(currUser);
        if (this.state.loadedResponse) {
            return (this.state.user ?
                (<div className="section-content">
                    <h1>Dashboard</h1>
                    <Button clickHandler={this.logout} classes="gb-btn gb-btn-small gb-btn-primary">Logout</Button>
                </div>) : (<Redirect to="/"/>))
        } else {
            return (<LoadingPage/>);
        }
    }
}

export const DashboardWithRouter = withRouter(Dashboard);