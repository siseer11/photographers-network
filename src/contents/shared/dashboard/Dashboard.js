// dependencies
import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { DashboardView } from "../../../components/dashboard/DashboardView";

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
    const { userData: user, loading, updateUserInfo } = this.props;
    let activeType = "";
    let activeComponent = "";

    activeType = this.state[user.type];
    activeType.headerLinks.map(link => {
      if (link.active) activeComponent = link.name;
    });

    return (
      <DashboardView
        type={user.type}
        user={user}
        {...this.props}
        linkHandler={this.setComponentToShow}
        headerLinks={activeType.headerLinks}
        activeComponent={activeComponent}
        loading={false}
        updateUserInfo={updateUserInfo}
      />
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user.userData
});

export default connect(mapStateToProps)(Dashboard);
