import React from "react";
import { PropTypes } from "prop-types";
import { SmallLogoSVG } from "../svg/SmallLogoSVG";
import { Avatar } from "../Avatar";
import { LinkLists } from "../LinkLists";
import { Link } from "react-router-dom";
import { BellSVG } from "../svg/BellSVG";
import { NotificationContainer } from "./NotificationContainer";
import fire from "../../config/Fire";

/* rightLinks = [{txt : 'home' , link : '#'}] loggedIn={true/false} userImageUrl='link' profileLink='#'*/
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
      loggedIn,
      userImageUrl,
      profileLink,
      homeLink,
      userOn,
      user
    } = this.props;
    const { showNotificationBox, notifications, newNotifications } = this.state;
    return (
      <div className={`gb-navbar ${this.state.sticky ? "sticky" : ""}`}>
        <Link to={`/${homeLink}`} className="left-content">
          <SmallLogoSVG classes="gb-icon-medium gb-icon-fill-white" />
        </Link>
        <ul className="right-content">
          {userOn ? (
            <React.Fragment>
              <div onClick={this.showNotificationsHandler} className="bell">
                <BellSVG
                  classes={`gb-icon-medium gb-icon-fill-white ${newNotifications &&
                    "new"}`}
                />
              </div>
              <LinkLists
                links={righLinks}
                txtClasses="gb-text-white gb-paragraph-medium gb-tablet-hide"
              />
              <Link
                style={{ backgroundImage: `url(${userImageUrl})` }}
                className="gb-avatar-small gb-avatar"
                to={user ? `profile/${user.uid}` : ""}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {userOn && (
                <div onClick={this.showNotificationsHandler} className="bell">
                  <BellSVG
                    classes={`gb-icon-medium gb-icon-fill-white ${newNotifications &&
                      "new"}`}
                  />
                </div>
              )}
              {showNotificationBox && (
                <NotificationContainer
                  notifications={notifications}
                  showBoxHandler={this.showNotificationsHandler}
                  readHandler={this.handleReadNotification}
                />
              )}
              <LinkLists
                links={righLinks}
                txtClasses="gb-text-white gb-paragraph-medium"
              />
            </React.Fragment>
          )}
        </ul>
      </div>
    );
  }
}

GbNavBar.propTypes = {
  righLinks: PropTypes.arrayOf(PropTypes.object),
  loggedIn: PropTypes.bool.isRequired,
  userImageUrl: PropTypes.string,
  profileLink: PropTypes.string
};
