import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import GbNavBar from '../components/gbNav';
import fire from '../config/Fire';

export default class Dashboard extends Component {
  state = {
    pageLinks: [
      {txt: "Facebook", link: "www.facebook.com"},
      {txt: "Twitter", link: "www.twitter.com"}
    ]
  };

  /**
   * Logs out the user and redirects him to home.
   */
  logout = () => {
    fire.auth().signOut();
    this.props.history.push("/");
  };

  render() {
    const {authentificated, type, loading} = this.props;
    // checks, if there is already a response of the database
    // if not, shows the loading page
    // if yes, checks, if there is actually a user (to avoid to get to the dashboard
    // by just typing dashboard into the url), if there's none, redirects to home
    return (
      <React.Fragment>
        {
          loading ? (
            <LoadingPage/>
          ) : (
            authentificated ? (
              <DashboardView {...this.props} logoutHandler={this.logout}/>
            ) : (
              <Redirect to="/signIn"/>
            )
          )
        }
      </React.Fragment>
    );
  }
}

const DashboardView = ({type, user, logoutHandler}) => (
  <div className='dashboard' style={{backgroundColor: 'rgba(0,0,0,.5)', width: '100vw', height: '100vh'}}>
    <GbNavBar
      righLinks={
        [{txt: 'Sign out', clickHandler: logoutHandler}]
      }
      loggedIn={false}
    />
    <h2 style={{paddingTop: 150}}>The user is a {type} , name : {user.displayName}</h2>
    <Link to={profilePath} className="gb-btn gb-btn-small gb-btn-primary">Userprofile</Link>
    <Link to='/search-photographers' className="gb-btn gb-btn-small gb-btn-primary">Search photographers</Link>
  </div>
)