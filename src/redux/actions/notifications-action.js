import fire from "../../config/Fire";

const database = fire.database();

// ACTION TYPES
export const NOTIFICATIONS_FETCH_START = "NOTIFICATIONS_FETCH_START";
export const NOTIFICATIONS_FETCH_FINISHED = "NOTIFICATIONS_FETCH_FINISHED";
export const NOTIFICATIONS_FETCH_ERROR = "NOTIFICATIONS_FETCH_ERROR";
export const MARK_AS_READ = "MARK_AS_READ";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

// ACTION CREATORS
export const notificationsFetchStart = () => ({
  type: NOTIFICATIONS_FETCH_START
});

export const notificationsFetchError = err => ({
  type: NOTIFICATIONS_FETCH_ERROR, message: err.message
});

export const notificationsFetchFinished = notifications => ({
  type: NOTIFICATIONS_FETCH_FINISHED,
  notifications,
  receivedAt: Date.now()
});

export const markAsRead = id => ({
  type: MARK_AS_READ, id
});

export const addNotification = notification => ({
  type: ADD_NOTIFICATION, notification
});

// ASYNC ACTIONS (THUNK)
export const fetchNotifications = () => {
  return (dispatch, getState) => {
    let state = getState();
    dispatch(notificationsFetchStart());
    return database
      .ref("users")
      .child(state.firebase.auth.uid)
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
        dispatch(notificationsFetchFinished(notifications));
      }).catch(err => dispatch(notificationsFetchError(err)));
  }
};

export const markNotificationAsRead = id => {
  return (dispatch, getState) => {
    const state = getState();
    return database
      .ref("users")
      .child(state.firebase.auth.uid)
      .child("notifications")
      .child(id)
      .update(
        {
          read: true
        }).then(() => dispatch(markAsRead(id)));
  };
};

export const childAddedListener = () => {
  return (dispatch, getState) => {
    let state = getState();
    return database
      .ref("users")
      .child(state.firebase.auth.uid)
      .child("notifications")
      .on("child_added", snapshot => {
        state = getState();
        if (state.notifications.fetchedNotifications) {
          const data = snapshot.val();
          const notification = {
            id: snapshot.key,
            ...data
          };
          dispatch(addNotification(notification));
        }
      });
  };
};

export const addNewNotification = (notification, uid) => {
  return () => {
    return database
      .ref("users")
      .child(uid)
      .child("notifications")
      .push()
      .set({
        ...notification
      });
  };
};



