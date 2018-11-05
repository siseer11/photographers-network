import { USER_RELATED } from "../actions/first-action";

export const user = (state = { name: "z" }, action) => {
  switch (action.type) {
    case USER_RELATED:
      return state;
    default:
      return state;
  }
};
