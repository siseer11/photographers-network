import {MARK_AS_READ, ADD_NOTIFICATION} from "../actions/notifications-action";

const initialState = {
  errorMessage: ''
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_AS_READ:
      console.log('marked as read!');
      return state;
    case ADD_NOTIFICATION:
      console.log('added successfully!');
      return state;
    default:
      return state;
  }
};