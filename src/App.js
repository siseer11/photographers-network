import React, {Component} from 'react';
import fire from './config/Fire';
import './style/gb-style.css';
import './style/photographer-style.css';
import Routes from './routes';

class App extends Component {
    state = {
        user: null,
        loadedResponse: false,
        type: ''
    };
    database = fire.database().ref();

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
                let currUser = {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL
                };
                this.setState({user: currUser}, () => {
                    this.getUserType();
                });
            } else {
                this.setState({user: null}, () => this.setState({loadedResponse: true}));
            }
        });
    };

    /**
     * Checks, if current user is a photographer or a company.
     */
    getUserType = () => {
        const {user} = this.state;
        this.database.child(`photographer/${user.uid}`).once('value', snap => {
            this.setState({
                type: (snap.exists() ? "photographer" : "company"),
                loadedResponse: true,
            });
        });
    };

    render() {
        const { user, loadedResponse, type } = this.state;
        return (
            <Routes user={user} loadedResponse={loadedResponse} type={type}/>
        );
    }
}

export default App;
