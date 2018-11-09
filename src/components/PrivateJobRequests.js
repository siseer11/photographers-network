import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import PrivateJobFunctionality from "../contents/PrivateJobFunctionality";

export const PrivateJobRequest = props => {
  const { user, location } = props;

  /* Initial check to see if this is the correct user(photographer) */
  let userQueryId = queryString.parse(location.search).user;
  const correctUser = userQueryId === user.uid;

  return correctUser ? (
    <h2>Here should show the PrivateJobFunctionality</h2>
  ) : (
    <h2>What are you doing in here, this is not the place to be!</h2>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData
});

export default connect(mapStateToProps)(PrivateJobRequest);

/*
<PrivateJobFunctionality {...props} />
*/
