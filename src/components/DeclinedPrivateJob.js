import React from "react";
import queryString from "query-string";
import DeclinedPrivateJobFunctionality from "../contents/company/private-job/DeclinedPrivateJobFunctionality";

export const DeclinedPrivateJob = props => {
  const { loading, location, user } = props;

  /* waiting for the user infos */
  if (loading != false) {
    return <h2>Waiting for user data</h2>;
  }

  /* if the company does not own this job , first check against the queryString */
  const companyQueryId = (queryString.parse(location.search) || { company: "" })
    .company;
  if (companyQueryId != user.uid) {
    return <h2>Not your job go away...</h2>;
  }

  return (
    <DeclinedPrivateJobFunctionality
      {...props}
      companyQueryId={companyQueryId}
    />
  );
};
