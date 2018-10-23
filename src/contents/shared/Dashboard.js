// dependencies
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import fire from "../../config/Fire";

// components
import { DashboardViewWithNav } from "../../components/dashboard/DashboardView";

export default class Dashboard extends Component {
  state = {
    photographer: {
      headerLinks: [
        {
          name: "Home",
          active: true
        },
        {
          name: "Applied Jobs",
          active: false
        },
        {
          name: "My Profile",
          active: false
        }
      ]
    },
    company: {
      headerLinks: [
        {
          name: "Home",
          active: true
        },
        {
          name: "My Jobs",
          active: false
        },
        {
          name: "My Profile",
          active: false
        }
      ]
    }
  };
  database = fire.database().ref();

  /**
   * Sets the clicked element to active.
   *
   * @param name
   * @param type
   */
  setComponentToShow = (name, type) => {
    const activeType = this.state[type];
    let headerLinks = [...activeType.headerLinks];
    headerLinks.forEach(link => {
      link.active = link.name === name;
    });
    this.setState({ [type]: { headerLinks } });
  };

  render() {
    const { user, loading, updateUserInfo } = this.props;
    let activeType = "";
    let activeComponent = "";
    if (!loading && user) {
      activeType = this.state[user.type];
      activeType.headerLinks.map(link => {
        if (link.active) activeComponent = link.name;
      });
    } // either company or photographer

    // checks, if there is already a response of the database
    // if not, shows the loading page
    // if yes, checks, if there is actually a user (to avoid to get to the dashboard
    // by just typing dashboard into the url), if there's none, redirects to home
    return (
      <React.Fragment>
        {loading === false ? (
          user ? (
            <DashboardViewWithNav
              type={user.type}
              user={user}
              {...this.props}
              linkHandler={this.setComponentToShow}
              headerLinks={activeType.headerLinks}
              activeComponent={activeComponent}
              loading={loading}
              updateUserInfo={updateUserInfo}
            />
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
