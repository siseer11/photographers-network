// dependencies
import React, {Component} from "react";
import fire from '../config/Fire';

// containers
import GbNavBar from '../components/gbNav';

// components
import {GbFooter} from "../components/Footer";
import {InstagramSVG} from "../components/svg/InstagramSVG";
import {TwitterSVG} from "../components/svg/TwitterSVG";
import {FacebookSVG} from "../components/svg/FacebookSVG";

export const NavFooterWrapper = WrappedComponent => {
  return class extends Component {
    /**
     * Logs out the user and redirects him to home.
     */
    logout = () => {
      fire.auth().signOut();
      this.props.history.push('/');
    };

    render() {
      return (
        <React.Fragment>
          <GbNavBar
            righLinks={
              [{txt: 'Sign out', clickHandler: this.logout}]
            }
            loggedIn={false}
          />
          <WrappedComponent {...this.props}/>
          <GbFooter
            socialMedias={[
              {
                icon: <InstagramSVG
                  classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>, link: '#'
              },
              {
                icon: <TwitterSVG
                  classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
                link: '#'
              },
              {
                icon: <FacebookSVG
                  classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
                link: '#'
              }]}
          />
        </React.Fragment>
      );
    }
  }
};