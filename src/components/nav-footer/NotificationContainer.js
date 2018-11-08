import React from 'react';
import PropTypes from 'prop-types';
import {Notification} from "./Notification";
import {connect} from "react-redux";
import {markNotificationAsRead} from "../../redux/actions/notifications-action";

const mapStateToProps = state => ({
  notifications: state.notifications.notifications.reverse()
});

const mapDispatchToProps = dispatch => ({
  markAsRead: id => dispatch(markNotificationAsRead(id))
});

const NotificationContainer = ({notifications, markAsRead, showBoxHandler}) => (
  <div className="notification-container">
    <h3>Notifications</h3>
    <div>
    {
      notifications.length > 0 ?
        (notifications.map((note) => (
          <Notification
            cardLink={note.link}
            key={note.id}
            type='half-left'
            postedTime={new Date(note.time).toLocaleDateString("en-US")}
            read={note.read}
            clickHandler={markAsRead}
            showHandler={showBoxHandler}
            index={note.id}
          >
            {note.title}
          </Notification>
        ))) :
        (<div>No notifications yet.</div>)
    }
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

NotificationContainer.propTypes = {
  notifications: PropTypes.array.isRequired,
};