import {
  NOTIFICATIONS_FETCH_START,
  NOTIFICATIONS_FETCH_ERROR,
  NOTIFICATIONS_FETCH_FINISHED, MARK_AS_READ, ADD_NOTIFICATION
} from "../actions/notifications-action";

const initialState = {
  notifications: [],
  newNotifications: false,
  isFetching: false,
  errorMessage: '',
  fetchedNotifications: false
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_FETCH_START:
      return {...state, isFetching: true};
    case NOTIFICATIONS_FETCH_ERROR:
      return {...state, isFetching: false, errorMessage: action.message};
    case NOTIFICATIONS_FETCH_FINISHED:
      let unreadNotifications = action.notifications.filter(
        note => !note.read
      );
      return {
        ...state,
        isFetching: false,
        notifications: action.notifications,
        newNotifications: unreadNotifications.length > 0,
        fetchedNotifications: true
      };
    case MARK_AS_READ:
      let notes = state.notifications.map(
        note =>
          note.id === action.id ? { ...note, read: true } : note
      );
      return {...state, notifications: notes};
    case ADD_NOTIFICATION:
      return {...state, notifications: [...state.notifications, action.notification], newNotifications: true};
    default:
      return state;
  }
};