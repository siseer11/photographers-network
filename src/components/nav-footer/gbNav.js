import React from "react";
import { PropTypes } from "prop-types";
import { SmallLogoSVG } from "../svg/SmallLogoSVG";
import { LinkLists } from "../LinkLists";
import { Link } from "react-router-dom";
import { BellSVG } from "../svg/BellSVG";
import NotificationContainer from "./NotificationContainer";
import WithModal from "../../RenderProp/WithModal";
import { connect } from "react-redux";
import { signOutUser } from "../../redux/actions/user-action";

import {
  childAddedListener,
  fetchNotifications
} from "../../redux/actions/notifications-action";

class GbNavBar extends React.Component {
  state = {
    sticky: false,
    showNotificationBox: false,
    links: [{ txt: "Sign in", link: "signIn" }],
    homeLink: "home",
    userLinks: []
  };

  componentDidMount() {
    if (!this.props.fetchedNotifications && this.props.userOn) {
      this.props.fetchNotifications();
      this.props.childAddedListener();
    }
    window.addEventListener("scroll", this.stickyNav);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.stickyNav);
  }

  stickyNav = e => {
    this.setState({
      sticky: window.pageYOffset > 0
    });
  };

  showNotificationsHandler = () => {
    this.setState(prev => {
      return {
        showNotificationBox: !prev.showNotificationBox
      };
    });
  };

  render() {
    const { userOn, userData: user, signOutUser } = this.props;

    let righLinks = [{ txt: "Sign in", link: "signIn" }];
    let homeLink = "home";
    let userLinks;

    if (userOn) {
      righLinks = [];
      homeLink = "dashboard";

      const company = user.type === "company";

      let specificLinks = [
        {
          txt: company ? "Create job" : "Jobs",
          link: company ? "createJob" : "jobs"
        }
      ];

      if (company) {
        specificLinks.push({
          txt: "Search for photographers",
          link: "search-photographers"
        });
      }

      userLinks = [
        {
          txt: "Profile",
          link: `profile/${user.uid}`
        },
        {
          txt: "Dashboard",
          link: "dashboard"
        },
        {
          txt: "Edit profile",
          link: "ProfileEdit"
        },
        ...specificLinks,
        { txt: "Sign out", clickHandler: signOutUser }
      ];
    }

    const { showNotificationBox } = this.state;
    return (
      <div className={`gb-navbar ${this.state.sticky ? "sticky" : ""}`}>
        <Link to={`/${homeLink}`} className="left-content">
          <SmallLogoSVG classes="gb-icon-medium gb-icon-fill-white" />
        </Link>
        <ul className="right-content">
          <LinkLists
            links={righLinks}
            txtClasses="gb-text-white gb-paragraph-medium"
          />
          {userOn && (
            <RightUserOn
              showNotificationsHandler={this.showNotificationsHandler}
              newNotifications={this.props.newNotifications}
              showNotificationBox={showNotificationBox}
              user={user}
              userImageUrl={user.photoURL}
              userLinks={userLinks}
            />
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const not = state.notifications;
  return {
    newNotifications: not.newNotifications,
    auth: state.firebase.auth,
    fetchedNotifications: not.fetchedNotifications,
    userOn: state.firebase.auth.uid,
    userData: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(fetchNotifications()),
  childAddedListener: () => dispatch(childAddedListener()),
  signOutUser: () => dispatch(signOutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GbNavBar);

GbNavBar.propTypes = {
  righLinks: PropTypes.arrayOf(PropTypes.object),
  userImageUrl: PropTypes.string,
  profileLink: PropTypes.string
};

const RightUserOn = ({
  showNotificationsHandler,
  newNotifications,
  notifications,
  showNotificationBox,
  userImageUrl,
  userLinks
}) => (
  <React.Fragment>
    <WithModal>
      {({ showModal }) => (
        <React.Fragment>
          <BellSVG
            classes={`gb-icon-medium gb-icon-fill-white ${newNotifications &&
              "new"}`}
          />
          {showModal && (
            <NotificationContainer showBoxHandler={showNotificationsHandler} />
          )}
        </React.Fragment>
      )}
    </WithModal>
    <li className="nav-user-avatar-wrapper">
      <WithModal>
        {({ showModal }) => (
          <React.Fragment>
            <div
              style={{ backgroundImage: `url(${userImageUrl})` }}
              className="gb-avatar-small gb-avatar nav-user-avatar"
            />
            <ul
              className="dropdown-menu-list"
              style={{ display: showModal ? "flex" : "none" }}
            >
              <li className="nav-user-triangle" />
              <LinkLists links={userLinks} liClasses="dropdown-menu-item" />
            </ul>
          </React.Fragment>
        )}
      </WithModal>
    </li>
  </React.Fragment>
);
