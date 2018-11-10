import React from "react";
import { connect } from "react-redux";
import { PrivateJobView } from "../components/PrivateJobView";
import {
  fetchPrivateJobInfo,
  acceptJobReq,
  rejectJobReq
} from "../redux/actions/acceptDeclinePrivateJob-action";

class PrivateJobFunctionality extends React.Component {
  componentDidMount() {
    const jobId = this.props.match.params.jobId;
    this.props.fetchJobInfo(jobId);
  }

  render() {
    const { fetchingJobData, user, jobInfos } = this.props;

    /* Still waiting for the DB response */
    if (fetchingJobData) {
      return <h2> Loading... </h2>;
    }

    /* No job found for this id */
    if (!jobInfos.jobId) {
      return <h2>There is not a job present for this id.</h2>;
    }

    /* Job is no longer Open */
    if (jobInfos.status !== "open") {
      return <h2> The job is no longer open.. Find another one! </h2>;
    }
    /* Second check for the correctUser , against the DB this time */
    const correctUser = user.uid === jobInfos.sentTo;

    return correctUser ? (
      <PrivateJobView
        {...jobInfos}
        acceptJobReq={this.props.acceptJobReq}
        rejectJobReq={this.props.rejectJobReq}
      />
    ) : (
      <h2>You are not the one my dude.</h2>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userData,
  fetchingJobData: state.acceptDeclinePrivateJob.fetchingJob,
  jobInfos: state.acceptDeclinePrivateJob.jobData
});

const mapDispatchToProps = dispatch => ({
  fetchJobInfo: jobId => dispatch(fetchPrivateJobInfo(jobId)),
  acceptJobReq: () => dispatch(acceptJobReq()),
  rejectJobReq: () => dispatch(rejectJobReq())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateJobFunctionality);
