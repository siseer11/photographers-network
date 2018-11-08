import React from "react";
import LoadingPage from "../../../components/LoadingPage";
import { JobDescription } from "../../../components/single-job/JobDescription";
import NavFooterWrapper from "../NavFooterWrapper";
import ProgressSingleJobCompany from "../../company/single-job/ProgressSingleJobCompany";
import ProgressSingleJobPhotographer from "../../photographer/single-job/ProgressSingleJobPhotographer";
import { connect } from "react-redux";
import { fetchJobInfo } from "../../../redux/actions/single-job-action";

const mapStateToProps = state => ({
  jobLoading: state.singleJob.jobLoading,
  jobExists: state.singleJob.jobExists,
  jobId: state.singleJob.jobId,
  jobDescription: state.singleJob.jobDescription,
  submittedWork: state.singleJob.progressJob.submittedWork,
  acceptedWork: state.singleJob.progressJob.acceptedWork
});

const mapDispatchToProps = dispatch => ({
  fetchJobInfo: jobId => dispatch(fetchJobInfo(jobId))
});

class ProgressSingleJobFetch extends React.Component {
  componentDidMount() {
    this.props.fetchJobInfo(this.props.match.params.jobid);
  }

  setAcceptedWork = () => {
    this.setState({ acceptedWork: true });
  };

  render() {
    const {
      jobLoading,
      jobExists,
      jobId,
      jobDescription,
      submittedWork,
      acceptedWork
    } = this.props;

    if (jobLoading) return <LoadingPage />;

    const { user } = this.props;

    return (
      <div className="single-job-view section-content">
        {jobExists ? (
          <React.Fragment>
            <JobDescription {...jobDescription} />
            {user.type === "photographer" ? (
              <ProgressSingleJobPhotographer
                submittedWork={submittedWork}
                acceptedWork={acceptedWork}
                jobId={jobId}
              />
            ) : (
              <ProgressSingleJobCompany
                acceptedApplicant={jobDescription.phootgrapher}
                submittedWork={submittedWork}
                acceptedWork={acceptedWork}
                jobId={jobId}
                jobDescription={jobDescription}
                user={user}
                setAcceptedWork={this.setAcceptedWork}
              />
            )}
          </React.Fragment>
        ) : (
          <div>Job does not seem to exist anymore.</div>
        )}
      </div>
    );
  }
}

const ProgressSingleJob = NavFooterWrapper(ProgressSingleJobFetch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressSingleJob);
