import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { PrivateJobView } from "../../../components/PrivateJobView";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";
import {
  acceptPrivateJobRequest,
  rejectPrivateJobRequest
} from "../../../redux/actions/photographer-actions";

const PrivateJobFunctionality = ({
  ownPrivateJobs,
  match,
  acceptJobReq,
  rejectJobReq
}) => {
  const jobId = match.params.jobId;

  //Still loading for the data to load
  if (!isLoaded(ownPrivateJobs)) {
    return <h2>Loading...</h2>;
  } else if (ownPrivateJobs && !isLoaded(ownPrivateJobs[jobId])) {
    return <h2>Loading...</h2>;
  }

  //After loading check to see if the job for this id exist
  if (!ownPrivateJobs || !ownPrivateJobs[jobId]) {
    return <h2>No job for this iD</h2>;
  }

  //No job for this id
  if (isEmpty(ownPrivateJobs[jobId])) {
    return <h2>There is not a job present for this id.</h2>;
  }

  //Show the private job infos
  const jobInfos = ownPrivateJobs[jobId];

  return (
    <PrivateJobView
      {...jobInfos}
      jobId={jobId}
      acceptJobReq={acceptJobReq}
      rejectJobReq={rejectJobReq}
    />
  );
};

const mapStateToProps = state => ({
  user: state.firebase.profile,
  auth: state.firebase.auth,
  ownPrivateJobs: state.firestore.data.ownPrivateJobs
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  acceptJobReq: (jobId, title, companyId) =>
    dispatch(acceptPrivateJobRequest(jobId, title, companyId, ownProps.user)),
  rejectJobReq: (jobId, title, companyId, status) =>
    dispatch(
      rejectPrivateJobRequest(jobId, title, companyId, ownProps.user, status)
    )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      where: [["sentToId", "==", props.auth.uid]],
      storeAs: "ownPrivateJobs"
    }
  ])
)(PrivateJobFunctionality);
