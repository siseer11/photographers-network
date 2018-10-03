import React, { Component } from "react";
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
				console.log('there is an user on')
				this.getUserInfos(user.uid);

			} else {
				this.setState({
					loading: false,
					currentUsser: null,
					authentificated: false,
					type: '',
				});
				console.log('no user')
			}
		});
	};

	/**
		* Checks, if current user is a photographer or a company.
		*/
	getUserInfos = (userId) => {

		this.database
			.child("users")
			.child(userId)
			.once('value',(snap)=>{
				console.log(snap.val());
				const userInfos = snap.val();
				this.setState(()=>({
					currentUsser : {...userInfos , userId : userId},
					loading : false,
					authentificated : true,
				}))
			}).catch((err)=>console.log(err))

	};

	setLoading = (to) => {
		this.setState(() => ({
			loading: to,
		}))
	}

	render() {
		const { currentUsser, loading, type, authentificated } = this.state;
		return <Routes setLoading={this.setLoading} user={currentUsser} loading={loading} type={type} authentificated={authentificated} />;
	}
}

export default App;
