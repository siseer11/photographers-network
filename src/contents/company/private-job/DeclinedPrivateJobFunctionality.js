import React from "react";
import { DeclinedPrivateJobView } from "../../../components/DeclinedPrivateJobView";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { actionReset } from "../../../redux/actions/generalLoadingErrorSucces-actions";
import {
  deleteCurrentJob,
  makePrivateJobPublic
} from "../../../redux/actions/company-actions";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";

class DeclinedPrivateJobFunctionality extends React.Component {
  componentWillUnmount() {
    this.props.actionReset();
  }
  render() {
    const {
      user,
      auth,
      jobId,
      jobsData,
      makePublic,
      deleteJob,
      generalLoadingDb,
      generalErrorDb,
      generalSuccesDb
    } = this.props;

    // If the data from the DB is not ready yet
    if (!isLoaded(jobsData)) {
      return <h2>Loading data from the DB....</h2>;
    } else if (jobsData && !isLoaded(jobsData[jobId])) {
      return <h2>Loading data from the DB....</h2>;
    }

    // No job with that id or the job was made public
    const jobData = jobsData[jobId];

    if (isEmpty(jobData) || (jobData && jobData.status !== "private")) {
      return "The job does not longer exist OR is not longer editable!";
    }

    // Check against the DB data if this is the company that owns the job
    if (jobData.companyId != auth.uid) {
      return "Not your job get out of here!";
    }

    //When either delete or makePublic succes redirect the user
    if (generalSuccesDb) {
      return <Redirect to={`open-job/${jobId}`} />;
    }

    const editDeleteStatus = generalLoadingDb ? "Loading..." : "";

    return (
      <DeclinedPrivateJobView
        {...jobData}
        jobId={jobId}
        makePublic={makePublic}
        deleteJob={deleteJob}
        editDeleteStatus={editDeleteStatus}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.firebase.auth,
  user: state.firebase.profile,
  jobId: ownProps.match.params.jobId,
  jobsData: state.firestore.data.jobOffers,
  generalLoadingDb: state.generalLoadingErrorSucces.loading,
  generalErrorDb: state.generalLoadingErrorSucces.error,
  generalSuccesDb: state.generalLoadingErrorSucces.succes
});

const mapDispatchToProps = dispatch => ({
  makePublic: jobId => dispatch(makePrivateJobPublic(jobId)),
  deleteJob: jobId => dispatch(deleteCurrentJob(jobId)),
  actionReset: () => dispatch(actionReset())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      doc: props.jobId
    }
  ])
)(DeclinedPrivateJobFunctionality);
