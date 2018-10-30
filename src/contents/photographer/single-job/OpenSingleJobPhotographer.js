import React from "react";
import fire from "../../../config/Fire";
import {OpenSingleJobViewPhotographer} from "../../../components/single-job/open/OpenSingleJobViewPhotographer";


export default class OpenSingleJobPhotographer extends React.Component {
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
        this.database
          .ref("users")
          .child(jobDescription.companyId)
          .child("notifications")
          .push()
          .set({
            title: `${user.displayName} applied for your job request "${
              jobDescription.title
              }".`,
            link: `/open-job/${jobId}`,
            read: false,
            time: new Date().getTime()
          });
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
