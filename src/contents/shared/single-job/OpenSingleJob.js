import React from "react";
import LoadingPage from "../../../components/LoadingPage";
import OpenSingleJobPhotographer from "../../photographer/single-job/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../../company/single-job/OpenSingleJobCompany";
import {JobDescription} from "../../../components/single-job/JobDescription";
import NavFooterWrapper from "../NavFooterWrapper";
import {connect} from "react-redux";
import {fetchJobInfo} from "../../../redux/actions/single-job-action";

const mapStateToProps = state => ({
  jobLoading: state.singleJob.jobLoading,
  jobExists: state.singleJob.jobExists,
  jobId: state.singleJob.jobId,
  jobDescription: state.singleJob.jobDescription,
  userApplied: state.singleJob.openJob.userApplied,
  appliedPhotographers: state.singleJob.openJob.appliedPhotographers,
  isDeclinedPhotographer: state.singleJob.openJob.isDeclinedPhotographer
});

const mapDispatchToProps = dispatch => ({
  fetchJobInfo: jobId => dispatch(fetchJobInfo(jobId))
});

class OpenSingleJobFetch extends React.Component {
  state = {
    downPayment: false
  };

  componentDidMount() {
    console.log(this.props);
    this.props.fetchJobInfo(this.props.match.params.jobid, "photographer");
  }

  render() {
    const {downPayment} = this.state;

    const {
      jobLoading,
      jobExists,
      jobId,
      jobDescription,
      userApplied,
      appliedPhotographers,
      isDeclinedPhotographer
    } = this.props;

    if (jobLoading) return <LoadingPage/>;

    const type = "photographer";
    const {user} = this.props;

    return (
      <div className="single-job-view section-content">
        {
          jobExists ?
            <React.Fragment>
              <JobDescription {...jobDescription}/>
              {
                type === "photographer" ?
                  <OpenSingleJobPhotographer userApplied={userApplied}
                                             isDeclinedPhotographer={isDeclinedPhotographer}
                                             jobId={jobId}
                  />
                  :
                  <OpenSingleJobCompany appliedPhotographers={appliedPhotographers}
                                        jobDescription={jobDescription}
                                        jobId={jobId}
                                        acceptedApplicant={jobDescription.phootgrapher}
                                        downPayment={downPayment}
                                        {...this.props}
                  />
              }
            </React.Fragment> :
            <p>Job does not exist!</p>
        }

      </div>

    );
  }
}

const OpenSingleJob = NavFooterWrapper(OpenSingleJobFetch);
export default connect(mapStateToProps, mapDispatchToProps)(OpenSingleJob);
