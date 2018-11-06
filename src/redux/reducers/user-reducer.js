

const initialState = {
  uid: '',
  displayName: ''
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case "USER_RELATED":
      return state;
    default:
      return state;
  }
};
