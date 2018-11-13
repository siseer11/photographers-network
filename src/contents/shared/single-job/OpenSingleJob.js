import React from "react";
import { Redirect } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import OpenSingleJobPhotographer from "../../photographer/single-job/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../../company/single-job/OpenSingleJobCompany";
import { JobDescription } from "../../../components/single-job/JobDescription";
import { connect } from "react-redux";
import { fetchJobInfo } from "../../../redux/actions/single-job-action";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class OpenSingleJob extends React.Component {
  state = {
    downPayment: false
  };

  componentDidMount() {
    //this.props.fetchJobInfo(this.props.match.params.jobid, "photographer");
  }

  render() {
    const { downPayment } = this.state;

    const {
      jobLoading,
      jobId,
      jobDescription,
      userApplied,
      appliedPhotographers,
      isDeclinedPhotographer,
      user,
      auth,
      profile
    } = this.props;
    const jobExists = true;
    if (!jobDescription) return <LoadingPage />;

    const jobDesc = jobDescription[0];

    if (jobDesc.status !== "open")
      return <Redirect to={`/progress-job/${this.props.match.params.jobid}`}/>;

    const type = profile.type;

    return (
      <div className="single-job-view section-content">
        {jobExists ? (
          <React.Fragment>
            <JobDescription {...jobDesc} />
            {type === "photographer" ? (
              <OpenSingleJobPhotographer
                userApplied={userApplied}
                isDeclinedPhotographer={isDeclinedPhotographer}
                jobId={jobDesc.id}
                auth={auth}
                profile={profile}
                jobDescription={jobDesc}
              />
            ) : (
              <OpenSingleJobCompany
                appliedPhotographers={appliedPhotographers}
                jobDescription={jobDesc}
                jobId={jobDesc.id}
                acceptedApplicant={jobDesc.photographer}
                downPayment={downPayment}
                {...this.props}
              />
            )}
          </React.Fragment>
        ) : (
          <p>Job does not exist!</p>
        )}
      </div>
    );
  }
}

//TODO: functionality for single job in action
const mapStateToProps = state => ({
  /*
  user: state.user.userData,
  userOn: state.user.userOn,
  jobLoading: state.singleJob.jobLoading,
  jobExists: state.singleJob.jobExists,
  jobId: state.singleJob.jobId,
  jobDescription: state.singleJob.jobDescription,
  userApplied: state.singleJob.openJob.userApplied,
  appliedPhotographers: state.singleJob.openJob.appliedPhotographers,
  isDeclinedPhotographer: state.singleJob.openJob.isDeclinedPhotographer,*/
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  jobDescription: state.firestore.ordered.openSingleJob,
  appliedPhotographers: []
});

const mapDispatchToProps = dispatch => ({
  fetchJobInfo: jobId => dispatch(fetchJobInfo(jobId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      collection: 'jobOffers',
      doc: props.match.params.jobid,
      storeAs: 'openSingleJob'
    }
  ])
)(OpenSingleJob);
