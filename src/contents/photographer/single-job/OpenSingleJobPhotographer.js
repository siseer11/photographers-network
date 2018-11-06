import React from "react";
import fire from "../../../config/Fire";
import {OpenSingleJobViewPhotographer} from "../../../components/single-job/open/OpenSingleJobViewPhotographer";
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addNotification: (notification, uid) => dispatch(addNewNotification(notification, uid))
});

class OpenSingleJobPhotographer extends React.Component {
  state = {
    userApplied: this.props.userApplied,
    isDeclinedPhotographer: this.props.isDeclinedPhotographer
  };
  database = fire.database();

// ---------- PHOTOGRAPHERS METHODS ----------:

  /**
   * User applies for a job.
   */
  applyForJob = () => {
    const {user, jobId, jobDescription} = this.props;
    this.database
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .child(user.uid)
      .set({
        email: user.email,
        displayName: user.displayName
      })
      .then(() => {
        this.database
          .ref("photographer")
          .child(user.uid)
          .child("applied-jobs")
          .child(jobId)
          .set({
            jobbId: jobId,
            status: "applied"
          });
      })
      .then(() => {
        this.setState({userApplied: true});
        // creates notification for company
        this.props.addNotification({
          title: `${user.displayName} applied for your job request "${
            jobDescription.title
            }".`,
          link: `/open-job/${jobId}`,
          read: false,
          time: new Date().getTime()
        }, jobDescription.companyId);
      });
  };

  render() {
    const {
      userApplied,
      isDeclinedPhotographer
    } = this.state;

    return (
      <OpenSingleJobViewPhotographer userApplied={userApplied}
                                     isDeclinedPhotographer={isDeclinedPhotographer}
                                     applyHandler={this.applyForJob}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenSingleJobPhotographer);
