// ASYNC ACTIONS (THUNK)
export const markNotificationAsRead = id => {
  return (dispatch, getState, { getFirestore }) => {
    return getFirestore()
      .collection("notifications")
      .doc(id)
      .update({ read: true });
  };
};

export const addNewNotification = notification => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore.collection("notifications").add({
      ...notification,
      senderId: getState().firebase.auth.uid
    });
  };
};
