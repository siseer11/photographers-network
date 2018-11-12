import React from "react";
import { Redirect } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import OpenSingleJobPhotographer from "../../photographer/single-job/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../../company/single-job/OpenSingleJobCompany";
import { JobDescription } from "../../../components/single-job/JobDescription";
import { connect } from "react-redux";
import { fetchJobInfo } from "../../../redux/actions/single-job-action";

const mapStateToProps = state => ({
  user: state.user.userData,
  userOn: state.user.userOn,
  jobLoading: state.singleJob.jobLoading,
  jobExists: state.singleJob.jobExists,
  jobId: state.singleJob.jobId,
  jobDescription: state.singleJob.jobDescription,
  userApplied: state.singleJob.openJob.userApplied,
  appliedPhotographers: state.singleJob.openJob.appliedPhotographers,
  isDeclinedPhotographer: state.singleJob.openJob.isDeclinedPhotographer,
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  fetchJobInfo: jobId => dispatch(fetchJobInfo(jobId))
});

class OpenSingleJob extends React.Component {
  state = {
    downPayment: false
  };

  componentDidMount() {
    this.props.fetchJobInfo(this.props.match.params.jobid, "photographer");
  }

  render() {
    const { downPayment } = this.state;

    const {
      jobLoading,
      jobExists,
      jobId,
      jobDescription,
      userApplied,
      appliedPhotographers,
      isDeclinedPhotographer,
      user,
      auth,
      profile
    } = this.props;

    if (jobLoading) return <LoadingPage />;
    if (jobDescription.status !== "open")
      return <Redirect to={`/progress-job/${this.props.match.params.jobid}`} />;

    const type = profile.type;

    return (
      <div className="single-job-view section-content">
        {jobExists ? (
          <React.Fragment>
            <JobDescription {...jobDescription} />
            {type === "photographer" ? (
              <OpenSingleJobPhotographer
                userApplied={userApplied}
                isDeclinedPhotographer={isDeclinedPhotographer}
                jobId={jobId}
                auth={auth}
                profile={profile}
                jobDescription={jobDescription}
              />
            ) : (
              <OpenSingleJobCompany
                appliedPhotographers={appliedPhotographers}
                jobDescription={jobDescription}
                jobId={jobId}
                acceptedApplicant={jobDescription.phootgrapher}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenSingleJob);
