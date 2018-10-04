import React, {Component} from "react";
import fire from "./config/Fire";
import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
  state = {
    user: null,
<<<<<<< HEAD
    loading: null,
||||||| merged common ancestors
    loading: true,
=======
    loading: true,
    authenticated: false
>>>>>>> 563339a3beada91d55d592de0e5302a977265961
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
<<<<<<< HEAD
        }));
||||||| merged common ancestors
        });
=======
          authenticated: false
        });
>>>>>>> 563339a3beada91d55d592de0e5302a977265961
      }
    });
  };

  setLoadingTrue = () => {
   console.log("HHHHHHHERERE")
   this.setState({
    loading : true,
   })
  }

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
<<<<<<< HEAD
		const { user, loading } = this.state;
		return <Routes user={user} loading={loading} setLoadingTrue={this.setLoadingTrue}/>;
||||||| merged common ancestors
		const { user, loading } = this.state;
		return <Routes user={user} loading={loading} />;
=======
		const { user, loading, authenticated } = this.state;
		return <Routes user={user} loading={loading} authenticated={authenticated} />;
>>>>>>> 563339a3beada91d55d592de0e5302a977265961
	}
}

export default App;
