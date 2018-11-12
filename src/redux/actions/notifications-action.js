// ACTION TYPES
export const MARK_AS_READ = "MARK_AS_READ";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

// ACTION CREATORS
export const markAsRead = id => ({
  type: MARK_AS_READ, id
});

export const addNotification = notification => ({
  type: ADD_NOTIFICATION, notification
});

// ASYNC ACTIONS (THUNK)
export const markNotificationAsRead = id => {
  return (dispatch, {getFirestore}) => {
    return getFirestore().collection('notifications').doc(id).update({read: true})
      .then(() => dispatch(markAsRead(id)));
  };
};

export const addNewNotification = notification => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore.collection('notifications').add({
      ...notification,
      senderId: getState().firebase.auth.uid
    })
  };
};



