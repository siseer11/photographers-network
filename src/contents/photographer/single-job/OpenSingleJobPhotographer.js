import React from "react";
import { connect } from "react-redux";
import { applyForJob } from "../../../redux/actions/photographer-actions";

const mapDispatchToProps = dispatch => ({
  applyForSingleJob: (jobData, user) => dispatch(applyForJob(jobData, user))
});

class OpenSingleJobPhotographer extends React.Component {
  state = {
    loading: false,
    error: null
  };
  /**
   * User applies for a job.
   */
  applyForJob = () => {
    let { jobId, jobData, user } = this.props;
    this.setState({
      loading: true
    });
    jobData = { ...jobData, jobId: jobId };
    this.props
      .applyForSingleJob(jobData, user)
      .then(() => {
        this.setState({
          loading: false,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  };

  render() {
    const { jobData, user } = this.props;
    let status = "not applied";

    //Check to see if this photographer has allready applied, and if him was declined
    if (jobData.photographersWhichApplied) {
      const photographerAppliedData =
        jobData.photographersWhichApplied[user.uid];
      if (photographerAppliedData) {
        if (!photographerAppliedData.declined) {
          status = "applied";
        } else {
          status = "declined";
        }
      }
    }

    if (status === "applied") {
      return <h2>You have already applied for this job.</h2>;
    }

    if (status === "declined") {
      return <h2>You are declined for this job.</h2>;
    }

    return (
      <a
        className="gb-btn gb-btn-medium gb-btn-primary"
        onClick={this.applyForJob}
      >
        Apply
      </a>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(OpenSingleJobPhotographer);
