import React, {Component} from "react";
import fire from "./config/Fire";
import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
    state = {
        user: null,
        loadedResponse: false,
        type: "",
        authentificated: false,
        currentUsser: null,
        loading: true,
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
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                let currUser = {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL
                };
                this.setState({
                    user: currUser,
                    loading : false,
                    authentificated : true,
                }, () => {
                    this.getUserType();
                });
                console.log('user on');
            } else {
                console.log('no user on');
                this.setState({
                    loading: false,
                    user: null,
                    authentificated: false,
                    type: '',
                    loadedResponse: false,
                });
            }
        });
    };

    /**
     * Checks, if current user is a photographer or a company.
     */
    getUserType = () => {
        const {user} = this.state;
        this.database.child(`photographer/${user.uid}`).once("value", snap => {
            this.setState({
                type: snap.exists() ? "photographer" : "company",
                loadedResponse: true
            });
        });
    };

    setLoading = (to) => {
        this.setState(() => ({
            loading: to,
        }))
    };

    render() {
        const {currentUsser, user, loadedResponse, type, authentificated, loading} = this.state;
        return <Routes loadedResponse={loadedResponse} setLoading={this.setLoading} user={user} loading={loading} type={type} authentificated={authentificated} />;
    }
}

export default App;
