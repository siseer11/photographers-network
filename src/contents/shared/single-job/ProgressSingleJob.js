import React from "react";
import {Redirect} from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import {JobDescription} from "../../../components/single-job/JobDescription";
import ProgressSingleJobCompany from "../../company/single-job/ProgressSingleJobCompany";
import ProgressSingleJobPhotographer from "../../photographer/single-job/ProgressSingleJobPhotographer";
import {connect} from "react-redux";
import {fetchJobInfo} from "../../../redux/actions/single-job-action";

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

class ProgressSingleJob extends React.Component {
  componentDidMount() {
    this.props.fetchJobInfo(this.props.match.params.jobid);
  }

  render() {
    const {
      jobLoading,
      jobExists,
      jobId,
      jobDescription,
      submittedWork,
      acceptedWork
    } = this.props;

    if (jobLoading) return <LoadingPage/>;
    if (jobDescription.status === "open") return <Redirect to={`/open-job/${this.props.match.params.jobid}`}/>;

    const {user} = this.props;
    const type = user ? user.type : "photographer";

    return (
      <div className="single-job-view section-content">
        {
          jobExists ?
            <React.Fragment>
              <JobDescription {...jobDescription}/>
              {
                type === "photographer" ?
                  <ProgressSingleJobPhotographer submittedWork={submittedWork}
                                                 acceptedWork={acceptedWork}
                                                 jobId={jobId}
                  />
                  :
                  <ProgressSingleJobCompany acceptedApplicant={jobDescription.phootgrapher}
                                            submittedWork={submittedWork}
                                            acceptedWork={acceptedWork}
                                            jobId={jobId}
                                            jobDescription={jobDescription}
                                            user={user}
                  />
              }
            </React.Fragment> :
            <div>Job does not seem to exist anymore.</div>
        }
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressSingleJob);