import React from 'react';
import PropTypes from 'prop-types';
import {Notification} from "./Notification";

export const NotificationContainer = ({notifications, readHandler, showBoxHandler}) => (
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
            clickHandler={readHandler}
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

NotificationContainer.propTypes = {
  notifications: PropTypes.array.isRequired,
};