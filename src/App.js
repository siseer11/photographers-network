import React, {Component} from 'react';
import './style/gb-style.css';
import './style/photographer-style.css';
import Routes from './routes';
import fire from './config/Fire';

class App extends Component {
    constructor() {
        super();
        this.state = ({
            user: null,
        });
    }

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
                this.setState({user});
            } else {
                this.setState({user: null});
            }
        });
    };

    render() {
        return (
            <Routes userState={this.state.user}/>
        );
    }
}

export default App;
