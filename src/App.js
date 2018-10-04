import React, {Component} from "react";
import fire from "./config/Fire";
import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
  state = {
    user: null,
    loading: true,
    authenticated: false
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
        this.getUserInfos(user.uid);
      } else {
        this.setState({
          loading: false,
          user: null,
          authenticated: false
        });
      }
    });
  };

  /**
   *
   * @param userId
   */
  getUserInfos = (userId) => {
		this.database
			.child("users")
			.child(userId)
			.once('value',(snap)=>{
				console.log(snap.val());
				const userInfos = snap.val();
				this.setState(()=>({
					user : {...userInfos , uid : userId},
					loading : false,
          authenticated: true
				}))
			}).catch((err)=>console.log(err))

	};

	render() {
		const { user, loading, authenticated } = this.state;
		return <Routes user={user} loading={loading} authenticated={authenticated} />;
	}
}

export default App;
