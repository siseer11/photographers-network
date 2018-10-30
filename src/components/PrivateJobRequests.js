import React from "react";
import queryString from "query-string";
import { PropTypes } from "prop-types";
import PrivateJobFunctionality from "../contents/PrivateJobFunctionality";

export const PrivateJobRequest = props => {
  const { loading, user, location } = props;
  /* Show loading screen, the user data still processing */
  if (loading != false) {
    return <h2>Loading...</h2>;
  }
  /* Initial check to see if this is the correct user(photographer) */
  let userQueryId = queryString.parse(location.search).user;
  const correctUser = userQueryId === user.uid;

  return correctUser ? (
    <PrivateJobFunctionality {...props} />
  ) : (
    <h2>What are you doing in here, this is not the place to be!</h2>
  );
};

PrivateJobRequest.propTypes = {
  user: PropTypes.object
};
