import React from "react";
import {Redirect} from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import {JobDescription} from "../../../components/single-job/JobDescription";
import ProgressSingleJobCompany from "../../company/single-job/ProgressSingleJobCompany";
import ProgressSingleJobPhotographer from "../../photographer/single-job/ProgressSingleJobPhotographer";
import {connect} from "react-redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class ProgressSingleJob extends React.Component {
  render() {
    const {jobsData, user} = this.props;
    const jobId = this.props.match.params.jobid;

    // job data is not loaded
    if (!isLoaded(jobsData))
      return <LoadingPage/>;
    // job does not exist
    if (!jobsData[jobId])
      return <div className="single-job-view section-content">Job does not seem to exist anymore.</div>;
    const jobDescription = jobsData[jobId];
    // job is not in progress
    if (jobDescription.status === "open")
      return <Redirect to={`/open-job/${jobId}`}/>;

    const submittedWork = Object.values(jobDescription.submittedWork);

    return (
      <div className="single-job-view section-content">
          <JobDescription {...jobDescription} />
          {user.type === "photographer" ? (
            <ProgressSingleJobPhotographer
              submittedWork={submittedWork}
              acceptedWork={jobDescription.status === "closed"}
              jobId={jobId}
            />
          ) : (
            <ProgressSingleJobCompany
              acceptedApplicant={jobDescription.photographer}
              submittedWork={submittedWork}
              jobId={jobId}
              jobDescription={jobDescription}
              user={user}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const firestore = state.firestore.data;
  return {
    user: state.firebase.profile,
    jobExists: true,
    jobsData: firestore.jobOffers
  };
};

export default compose(
  connect(
    mapStateToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      doc: props.match.params.jobid
    }
  ])
)(ProgressSingleJob);
