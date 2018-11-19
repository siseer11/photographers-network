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
        console.log("done , notification added to!");
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
    let photographerAlreadyApplied = false;

    if (
      jobData.photographersWhichApplied &&
      jobData.photographersWhichApplied.hasOwnProperty(user.uid)
    ) {
      photographerAlreadyApplied = true;
    }

    if (photographerAlreadyApplied) {
      return <h2>You have already applied for this job.</h2>; // user applied for this job
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
