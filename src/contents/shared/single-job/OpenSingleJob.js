import React from "react";
import LoadingPage from "../../../components/LoadingPage";
import OpenSingleJobPhotographer from "../../photographer/single-job/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../../company/single-job/OpenSingleJobCompany";
import { JobDescription } from "../../../components/single-job/JobDescription";
import NavFooterWrapper from "../NavFooterWrapper";
import { connect } from "react-redux";
import { fetchJobInfo } from "../../../redux/actions/single-job-action";

const mapStateToProps = state => {
  const job = state.singleJob;
  const openJob = job.openJob;
  return {
    jobLoading: job.jobLoading,
    jobExists: job.jobExists,
    jobId: job.jobId,
    jobDescription: job.jobDescription,
    userApplied: openJob.userApplied,
    appliedPhotographers: openJob.appliedPhotographers,
    isDeclinedPhotographer: openJob.isDeclinedPhotographer
  };
};

const mapDispatchToProps = dispatch => ({
  fetchJobInfo: jobId => dispatch(fetchJobInfo(jobId))
});

class OpenSingleJobFetch extends React.Component {
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
      isDeclinedPhotographer
    } = this.props;

    if (jobLoading) return <LoadingPage />;

    const type = "photographer";

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

const OpenSingleJob = NavFooterWrapper(OpenSingleJobFetch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenSingleJob);
