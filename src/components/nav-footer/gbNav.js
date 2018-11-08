import React from "react";
import { PropTypes } from "prop-types";
import { SmallLogoSVG } from "../svg/SmallLogoSVG";
import { LinkLists } from "../LinkLists";
import { Link } from "react-router-dom";
import { BellSVG } from "../svg/BellSVG";
import NotificationContainer from "./NotificationContainer";
import fire from "../../config/Fire";
import WithModal from "../../RenderProp/WithModal";
import {connect} from "react-redux";
import {childAddedListener, fetchNotifications} from "../../redux/actions/notifications-action";

const mapStateToProps = state => ({
  newNotifications: state.notifications.newNotifications,
  auth: state.firebase.auth,
  fetchedNotifications: state.notifications.fetchedNotifications
});

const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(fetchNotifications()),
  childAddedListener: () => dispatch(childAddedListener())
});

class GbNavBar extends React.Component {
  state = {
    sticky: false,
    showNotificationBox: false,
    user: null
  };

  componentDidMount() {
    if(!this.props.fetchedNotifications && this.props.auth.uid) {
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
    const {
      righLinks,
      userImageUrl,
      homeLink,
      userOn,
      user,
      userLinks
    } = this.props;
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
              righLinks={righLinks}
              userImageUrl={userImageUrl}
              userLinks={userLinks}
            />
          )}
        </ul>
      </div>
    );
  }
}

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
            <NotificationContainer
              showBoxHandler={showNotificationsHandler}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(GbNavBar);

GbNavBar.propTypes = {
  righLinks: PropTypes.arrayOf(PropTypes.object),
  userImageUrl: PropTypes.string,
  profileLink: PropTypes.string
};