import React from "react";
import queryString from "query-string";
import DeclinedPrivateJobFunctionality from "../contents/company/private-job/DeclinedPrivateJobFunctionality";
import { connect } from "react-redux";

const DeclinedPrivateJob = ({ location, user, match }) => {
  /* if the company does not own this job , first check against the queryString */
  const companyQueryId = (queryString.parse(location.search) || { company: "" })
    .company;
  if (companyQueryId != user.uid) {
    return <h2>Not your job go away...</h2>;
  }

  return (
    <DeclinedPrivateJobFunctionality
      match={match}
      companyQueryId={companyQueryId}
    />
  );
};

const mapStateToProps = state => ({
  user: state.firebase.profile
});

export default connect(mapStateToProps)(DeclinedPrivateJob);
