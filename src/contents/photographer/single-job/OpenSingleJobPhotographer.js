import React from "react";
import { OpenSingleJobViewPhotographer } from "../../../components/single-job/open/OpenSingleJobViewPhotographer";
import { connect } from "react-redux";
import { addNewNotification } from "../../../redux/actions/notifications-action";
import { applyForJob } from "../../../redux/actions/single-job-action-photographer";

const mapDispatchToProps = dispatch => ({
  addNotification: (notification, uid) =>
    dispatch(addNewNotification(notification, uid)),
  applyForSingleJob: jobId => dispatch(applyForJob(jobId))
});

class OpenSingleJobPhotographer extends React.Component {
  /**
   * User applies for a job.
   */
  applyForJob = () => {
    const { user, jobId, jobDescription } = this.props;
    this.props.applyForSingleJob(jobId);
    const notification = {
      title: `${profile.firstName} ${profile.lastName} applied for your job request "${
        jobDescription.title
      }".`,
      link: `/open-job/${jobId}`,
      read: false,
      createdAt: new Date(),
      recipientUserId: jobDescription.companyId
    };
    this.props.addNotification(notification);
  };

  render() {
    const { userApplied, isDeclinedPhotographer } = this.props;

    return (
      <OpenSingleJobViewPhotographer
        userApplied={userApplied}
        isDeclinedPhotographer={isDeclinedPhotographer}
        applyHandler={this.applyForJob}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(OpenSingleJobPhotographer);
