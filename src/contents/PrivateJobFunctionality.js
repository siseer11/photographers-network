import React from "react";
import fire from "../config/Fire";
import { PrivateJobView } from "../components/PrivateJobView";

export default class PrivateJobFunctionality extends React.Component {
  state = {
    loadingResponse: true,
    jobbInfos: {}
  };

  componentDidMount() {
    const jobId = this.props.match.params.jobId;
    this.fetchJobInfos(jobId);
  }

  fetchJobInfos = jobId => {
    fire
      .database()
      .ref("requests")
      .child(jobId)
      .once("value", snap => {
        console.log(snap.val());
        this.setState({
          jobbInfos: snap.val(),
          loadingResponse: false
        });
      })
      .catch(err => console.log(err));
  };

  /* Accept job offer Handler */
  acceptJobReq = () => {
    const { user } = this.props;
    const jobId = this.props.match.params.jobId;

    //1. Update the job in the request
    fire
      .database()
      .ref("requests")
      .child(jobId)
      .update(
        {
          phootgrapher: {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            "photographers-applied": ""
          },
          status: "in progress"
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("job data updated in the DB.");
            pushToCompanyNotifications();
          }
        }
      );

    //2. Push the notification to the company
    const pushToCompanyNotifications = () => {
      const notificationLink = `/progress-job/${jobId}`;
      const notificationTitle = `${
        user.displayName
      } accepted you're private req for the job , proceed to the payment!`;

      this.pushNotificationToCompany(
        this.state.jobbInfos.companyId,
        notificationLink,
        notificationTitle
      );
    };
  };

  /* Reject job offer Handler */
  rejectJobReq = () => {
    const { jobbInfos } = this.state;
    const { user, history } = this.props;
    const isJobPrivate = jobbInfos.private;

    //1. Update the job data so just the company can see it , in order to make it public
    fire
      .database()
      .ref("requests")
      .child(jobbInfos.jobbId)
      .update(
        {
          sentTo: "",
          sentToPrivate: false,
          photographerDeclinedPrivateReq: isJobPrivate ? true : null
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.info("Step 1/2 ... Finished!");
            pushNotificationToCompany(jobbInfos.companyId, jobbInfos.jobbId);
          }
        }
      );

    //2. Push the notification into the comapny notifications field
    const pushNotificationToCompany = (companyId, jobId) => {
      const notificationLink = isJobPrivate
        ? `/declined-private-job/${jobId}?company=${companyId}`
        : `/job/${jobId}`;
      const notificationTitle = `${
        user.displayName
      } has declined you private job req.`;

      this.pushNotificationToCompany(
        jobbInfos.companyId,
        notificationLink,
        notificationTitle
      );
    };
  };

  /* Function that deals with Pushing the notification into the comapny field */
  pushNotificationToCompany = (companyId, link, title) => {
    fire
      .database()
      .ref("users")
      .child(`${companyId}/notifications`)
      .push(
        {
          link: link,
          read: false,
          time: new Date().getTime(),
          title: title
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "Done! The notification was pushed into the company field"
            );
          }
        }
      );
  };

  render() {
    const { loadingResponse, jobbInfos } = this.state;
    const { user } = this.props;

    /* Still waiting for the DB response */
    if (loadingResponse) {
      return <h2> Loading... </h2>;
    }

    /* No job found for this id */
    if (!jobbInfos) {
      return <h2>There is not a job present for this id.</h2>;
    }

    /* Job is no longer Open */
    if (jobbInfos.status !== "open") {
      return <h2> The job is no longer open.. Find another one! </h2>;
    }
    /* Second check for the correctUser , against the DB this time */
    const correctUser = user.uid === jobbInfos.sentTo;

    return correctUser ? (
      <PrivateJobView
        {...jobbInfos}
        acceptJobReq={this.acceptJobReq}
        rejectJobReq={this.rejectJobReq}
      />
    ) : (
      <h2>You are not the one my dude.</h2>
    );
  }
}
