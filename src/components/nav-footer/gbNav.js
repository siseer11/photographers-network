import React from "react";
import { PropTypes } from "prop-types";
import { SmallLogoSVG } from "../svg/SmallLogoSVG";
import { LinkLists } from "../LinkLists";
import { Link } from "react-router-dom";
import { BellSVG } from "../svg/BellSVG";
import { NotificationContainer } from "./NotificationContainer";
import fire from "../../config/Fire";
import WithModal from "../../RenderProp/WithModal";

export default class GbNavBar extends React.Component {
  state = {
    sticky: false,
    showNotificationBox: false,
    notifications: [],
    newNotifications: false,
    user: null
  };
  database = fire.database();

  componentDidMount() {
    window.addEventListener("scroll", this.stickyNav);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchNotifications(nextProps.user);
  }

  /**
   * Fetches notifications of current users of the database.
   *
   * @param user
   */
  fetchNotifications(user) {
    if (user) {
      this.database
        .ref("users")
        .child(user.uid)
        .child("notifications")
        .once("value", snap => {
          let noteObj = snap.val() || {};
          let notifications = Object.keys(noteObj).map(key => {
            let notification = noteObj[key];
            return {
              id: key,
              ...notification
            };
          });
          notifications.reverse();
          this.setState({ notifications: notifications, user: user }, () => {
            let unreadNotifications = this.state.notifications.filter(
              note => !note.read
            );
            // checks the length of the unread notifications, to see if there are ones
            this.setState({ newNotifications: unreadNotifications.length > 0 });
          });
        });
    }
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
        showNotificationBox: !prev.showNotificationBox,
        newNotifications: false
      };
    });
  };

  handleReadNotification = id => {
    let notificationsCopy = [...this.state.notifications];
    let index = notificationsCopy.findIndex(note => note.id === id);
    notificationsCopy[index].read = true;
    this.database
      .ref("users")
      .child(this.state.user.uid)
      .child("notifications")
      .child(id)
      .update(
        {
          read: true
        },
        () => this.setState({ notifications: notificationsCopy })
      );
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
    const { showNotificationBox, notifications, newNotifications } = this.state;
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
              newNotifications={newNotifications}
              notifications={notifications}
              handleReadNotification={this.handleReadNotification}
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
  handleReadNotification,
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
              notifications={notifications}
              showBoxHandler={showNotificationsHandler}
              readHandler={handleReadNotification}
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

GbNavBar.propTypes = {
  righLinks: PropTypes.arrayOf(PropTypes.object),
  userImageUrl: PropTypes.string,
  profileLink: PropTypes.string
};