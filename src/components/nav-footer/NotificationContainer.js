import React from 'react';
import PropTypes from 'prop-types';
import {Notification} from "./Notification";
import {connect} from "react-redux";
import {markNotificationAsRead} from "../../redux/actions/notifications-action";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

const NotificationContainer = ({notifications, markAsRead, showBoxHandler}) => (
  <div className="notification-container">
    <h3>Notifications</h3>
    <div>
      {
        notifications ?
          <React.Fragment>
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
                (
                  <div>No notifications yet.</div>
                )
            }
          </React.Fragment>
          :
          <div>Loading...</div>
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications.sort((a, b) => new Date(b.date) - new Date(a.date))
});

const mapDispatchToProps = dispatch => ({
  markAsRead: id => dispatch(markNotificationAsRead(id))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      collection: 'notifications',
      where: ['recipientUserId', '==', props.auth.uid],
      //orderBy: ['title', 'desc'] bug!!!
    }
  ])
)(NotificationContainer);