import React from "react";
import {Notification} from "./Notification";
import {connect} from "react-redux";
import {markNotificationAsRead} from "../../redux/actions/notifications-action";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const NotificationContainer = ({
                                 notifications,
                                 markAsRead,
                                 showBoxHandler
                               }) => (
  <div className="notification-container">
    <h3>Notifications</h3>
    <div>
      {notifications ? (
        <React.Fragment>
          {notifications.length > 0 ? (
            notifications
              .sort((a, b) => b.createdAt - a.createdAt)
              .map(note => (
                <Notification
                  cardLink={note.link}
                  key={note.id}
                  type="half-left"
                  postedTime={new Date(note.createdAt).toLocaleDateString(
                    "en-US"
                  )}
                  read={note.read}
                  clickHandler={markAsRead}
                  showHandler={showBoxHandler}
                  index={note.id}
                >
                  {note.title}
                </Notification>
              ))
          ) : (
            <div>No notifications yet.</div>
          )}
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications
});

const mapDispatchToProps = dispatch => ({
  markAsRead: id => dispatch(markNotificationAsRead(id))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "notifications",
      where: ["recipientUserId", "==", props.auth.uid]
      //orderBy: ['title', 'desc'] bug!!!
    }
  ])
)(NotificationContainer);
