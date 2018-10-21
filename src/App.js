import React, {Component} from "react";
import fire from "./config/Fire";
import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
  state = {
    user: null,
    loading: null,
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
        this.setState((prevState)=>({
          loading: (prevState.loading!==null),
          user: null,
        }));
      }
    });
  };

  setLoadingTrue = () => {
   this.setState({
    loading : true,
   })
  };

  /**
   * Fetches information about current user of the database.
   *
   * @param userId
   */
  getUserInfos = (userId) => {
		this.database
			.child("users")
			.child(userId)
			.once('value',(snap)=>{
				const userInfos = snap.val();
				this.setState(()=>({
					user : {...userInfos , uid : userId},
					loading : false,
          authenticated: true
				}))
			}).catch((err)=>console.log(err))

  };
  
  updateUserInfo = (newInfos) => {
    this.setState((prevState)=>({
      user : {
        ...prevState.user,
        ...newInfos
      }
    }))
  }

	render() {
		const { user, loading } = this.state;
		return <Routes updateUserInfo={this.updateUserInfo} user={user} loading={loading} setLoadingTrue={this.setLoadingTrue}/>;
	}
}

export default App;
