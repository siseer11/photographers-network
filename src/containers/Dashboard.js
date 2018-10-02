import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import GbNavBar from "./gbNav";
import { ProfileCard } from "../components/ProfileCard";
import { LinkLists } from "../components/LinkLists";
import { GbFooter } from "../components/Footer";
import { InstagramSVG } from "../components/svg/InstagramSVG";
import { TwitterSVG } from "../components/svg/TwitterSVG";
import { FacebookSVG } from "../components/svg/FacebookSVG";
import PhotographerContent from "./PhotographerContent";
import CompanyContent from "./CompanyContent";
import fire from '../config/Fire'

export default class Dashboard extends Component {
  state = {
    pageLinks: [
      { txt: "Facebook", link: "www.facebook.com" },
      { txt: "Twitter", link: "www.twitter.com" }
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
    const { user, type, loadedResponse } = this.props;
    console.log(type);
    // checks, if there is already a response of the database
    // if not, shows the loading page
    // if yes, checks, if there is actually a user (to avoid to get to the dashboard
    // by just typing dashboard into the url), if there's none, redirects to home
    return (
      <React.Fragment>
        {loadedResponse ? (
          user ? (
            <div className="dashboard">
              <GbNavBar
                righLinks={[{ txt: "Sign out", clickHandler: this.logout }]}
                loggedIn={false}
              />
              <ProfileCard
                backgroundImg="https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340"
                profileImg="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
              >
                Welcome {user.displayName}!
              </ProfileCard>
              <div className="profile-content">
                <LinkLists
                  links={this.state.pageLinks}
                  txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
                  liClasses="footer-nav-item"
                />
              </div>
              {type === "photographer" ? (
                <PhotographerContent />
              ) : (
                <CompanyContent />
              )}
              <GbFooter
                links={[
                  { txt: "About us", link: "#" },
                  { txt: "Forum", link: "#" },
                  { txt: "Contact us", link: "#" }
                ]}
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
            </div>
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <LoadingPage />
        )}
      </React.Fragment>
    );
  }
}
