// dependencies
import React, { Component } from "react";
import fire from "../../config/Fire";
import { withRouter } from "react-router-dom";
// containers
import GbNavBar from "../../components/nav-footer/gbNav";

// components
import { GbFooter } from "../../components/nav-footer/Footer";
import { InstagramSVG } from "../../components/svg/InstagramSVG";
import { TwitterSVG } from "../../components/svg/TwitterSVG";
import { FacebookSVG } from "../../components/svg/FacebookSVG";

const NavigationFooterWrapper = WrappedComponent => {
  return class extends Component {
    /**
     * Logs out the user and redirects him to home.
     */
    state = {
      userOn: false,
      links: [
        { txt: "Home", link: "home", nav: true },
        { txt: "Jobs", link: "jobs", nav: true },
        {
          txt: "Sign in",
          link: "signIn"
        }
      ],
      homeLink: "home",
      user: null
    };

    componentDidMount() {
      this.updateLinks(this.props.user);
    }

    updateLinks = user => {
      if (user) {
        if (user.type === "company") {
          this.setState(() => ({
            userOn: true,
            links: [{ txt: "Sign out", clickHandler: this.logout }],
            homeLink: "dashboard",
            user: user
          }));
        } else {
          this.setState(() => ({
            userOn: true,
            links: [{ txt: "Sign out", clickHandler: this.logout }],
            homeLink: "dashboard",
            user: user
          }));
        }
      } else {
        this.setState(() => ({
          userOn: false,
          links: [{ txt: "Sign in", link: "signIn" }],
          homeLink: "home"
        }));
      }
    };

    componentWillReceiveProps(nextProps) {
      this.updateLinks(nextProps.user);
    }

    /**
     * Logs out user.
     */
    logout = () => {
      fire.auth().signOut();
      this.props.history.replace("/");
    };

    render() {
      return (
        <React.Fragment>
          <GbNavBar
            homeLink={this.state.homeLink}
            righLinks={this.state.links}
            loggedIn={false}
            userOn={this.state.userOn}
            user={this.state.user}
          />
          <WrappedComponent {...this.props} />
          <GbFooter
            socialMedias={[
              {
                icon: (
                  <InstagramSVG classes="gb-icon-fill-black-opacity-30 gb-icon-small" />
                ),
                link: "#"
              },
              {
                icon: (
                  <TwitterSVG classes="gb-icon-fill-black-opacity-30 gb-icon-small" />
                ),
                link: "#"
              },
              {
                icon: (
                  <FacebookSVG classes="gb-icon-fill-black-opacity-30 gb-icon-small" />
                ),
                link: "#"
              }
            ]}
          />
        </React.Fragment>
      );
    }
  };
};

export default NavigationFooterWrapper;
