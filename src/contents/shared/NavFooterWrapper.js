// dependencies
import React, {Component} from "react";
import fire from '../../config/Fire';

// containers
import GbNavBar from '../../components/gbNav';

// components
import {GbFooter} from "../../components/Footer";
import {InstagramSVG} from "../../components/svg/InstagramSVG";
import {TwitterSVG} from "../../components/svg/TwitterSVG";
import {FacebookSVG} from "../../components/svg/FacebookSVG";

export const NavFooterWrapper = WrappedComponent => {
  return class extends Component {
    /**
     * Logs out the user and redirects him to home.
     */
    state = {
      userOn: false,
      links: [{txt: 'Home', link: 'home', nav: true}, {txt: 'Jobs', link: 'jobs', nav: true}, {
        txt: 'Sign in',
        link: 'signIn'
      }],
      homeLink: 'home'
    };

    componentDidMount() {
      this.updateLinks(this.props.user)
    }

    updateLinks = (user) => {
      if (user) {
        if (user.type === 'company') {
          this.setState(() => ({
            userOn: true,
            links: [
              //{txt: 'Home' , link:'home' , nav:true},
              //{txt: 'Create Job' , link:'createJob' , nav:true},
              //{txt: 'Dashboard' , link: 'dashboard' , nav:true},
              {txt: 'Sign out', clickHandler: this.logout}],
            homeLink: 'dashboard'
          }));
        } else {
          this.setState(() => ({
            userOn: true,
            links: [
              //{txt: 'Home' , link:'home' , nav:true},
              //{txt: 'Jobs' , link:'jobs' , nav:true},
              //{txt: 'Dashboard' , link: 'dashboard' , nav:true},
              {txt: 'Sign out', clickHandler: this.logout}],
            homeLink: 'dashboard'
          }));
        }
      } else {
        this.setState(() => ({
          userOn: false,
          links: [
            //{txt: 'Home' , link:'home' , nav:true},
            //{txt: 'Jobs' , link:'jobs' , nav:true},
            {txt: 'Sign in', link: 'signIn'}
          ],
          homeLink: 'home'
        }));
      }
    };

    componentWillReceiveProps(nextProps) {
      this.updateLinks(nextProps.user)
    }

    logout = () => {
      fire.auth().signOut();
      this.props.history.replace('/');
    };

    render() {
      return (
        <React.Fragment>
          <GbNavBar
            homeLink={this.state.homeLink}
            righLinks={
              this.state.links
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