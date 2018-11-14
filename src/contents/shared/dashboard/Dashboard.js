// dependencies
import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { DashboardView } from "../../../components/dashboard/DashboardView";
import LoadingPage from "../../../components/LoadingPage";

class Dashboard extends Component {
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
        }
      ]
    }
  };

  /**
   * Sets the clicked element to active.
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
    const { profile, auth } = this.props;
    let activeType = "";
    let activeComponent = "";
    console.log(profile);
    if(!profile.isEmpty) {
      activeType = this.state[profile.type];
      activeType.headerLinks.map(link => {
        if (link.active) activeComponent = link.name;
      });
    }

    console.log(this.props);

    if (!auth.uid || profile.isEmpty) {
      console.log("data not loaded");
      return <LoadingPage/>;
    }

    return (
      <DashboardView
        type={profile.type}
        profile={profile}
        auth={auth}
        {...this.props}
        linkHandler={this.setComponentToShow}
        headerLinks={activeType.headerLinks}
        activeComponent={activeComponent}
        loading={false}
      />
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user.userData,
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(Dashboard);
