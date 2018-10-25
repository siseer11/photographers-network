// dependencies
import React, { Component } from "react";
import fire from "../../config/Fire";
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
      links: [{ txt: "Sign in", link: "signIn" }],
      homeLink: "home",
      user: null,
      userLinks: []
    };

    componentDidMount() {
      this.updateLinks(this.props.user);
    }

    updateLinks = user => {
      if (user) {
        const company = user.type === "company";
        this.setState(() => ({
          userOn: true,
          homeLink: "dashboard",
          user: user,
          links: [],
          userLinks: [
            {
              txt: "Profile",
              link: `profile/${user.uid}`
            },
            {
              txt: "Dashboard",
              link: "dashboard"
            },
            {
              txt: company ? "Create job" : "Jobs",
              link: company ? "createJob" : "jobs"
            },
            { txt: "Sign out", clickHandler: this.logout }
          ]
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
      const { userLinks, homeLink, links, userOn, user } = this.state;
      return (
        <React.Fragment>
          <GbNavBar
            homeLink={homeLink}
            righLinks={links}
            userOn={userOn}
            user={user}
            userImageUrl={user ? user.photoURL : ""}
            userLinks={userLinks}
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
