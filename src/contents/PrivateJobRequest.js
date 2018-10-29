import React from "react";
import { Redirect, Link } from "react-router-dom";
import fire from "../config/Fire";

export default class PrivateJobRequest extends React.Component {
  render() {
    const { loading, user, location } = this.props;

    /* Show loading screen, the user data still processing */
    if (loading != false) {
      return <h2>Loading...</h2>;
    }

    /* Initial check to see if this is the correct user(photographer) */
    let userQueryId = location.search.match(/user=[^&]+/);
    userQueryId = (userQueryId ? userQueryId[0] : "").replace("user=", "");
    const correctUser = userQueryId === user.uid;

    return correctUser ? (
      <PrivateJobRequestFetch {...this.props} />
    ) : (
      <h2>What the fuck are you doing in here?</h2>
    );
  }
}

class PrivateJobRequestFetch extends React.Component {
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
    //update the job in the request
    fire
      .database()
      .ref("requests")
      .child(jobId)
      .update(
        {
          phootgrapher: user.uid,
          status: "in progress"
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            pushToCompanyNotifications();
          }
        }
      );

    const pushToCompanyNotifications = () => {
      fire
        .database()
        .ref("users")
        .child("notifications")
        .push(
          {
            link: "",
            read: false,
            time: new Date().getTime(),
            title: `${
              user.displayName
            } accepted you're private req for the job , proceed to the payment!`
          },
          err => {
            if (err) {
              console.log(err);
            } else {
            }
          }
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
          photographerDeclinedPrivateReq: true
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
        ? `declined-private-job/${jobId}?company=${companyId}`
        : `/job/${jobId}`;
      fire
        .database()
        .ref("users")
        .child(`${companyId}/notifications`)
        .push(
          {
            link: notificationLink,
            read: false,
            date: new Date().getTime(),
            title: `${user.displayName} has declined you private job req.`
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log("Done, Step 2/2 completed!");
            }
          }
        );
    };
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

const PrivateJobView = ({
  companyId,
  companyName,
  date,
  description,
  location,
  price,
  title,
  type,
  acceptJobReq,
  rejectJobReq
}) => (
  <div className="job-view-private">
    <h2>Job title : {title}</h2>
    <p>Description : {description}</p>
    <h2>Budget : {price} </h2>
    <h5>Type of photography : {type} </h5>
    <p>Location : {location} </p>
    <p>Date : {new Date(date).toLocaleDateString()} </p>
    <p>
      Company : <Link to={`/profile/${companyId}`}>{companyName}</Link>{" "}
    </p>
    <div className="accept-reject-buttons">
      <div className="accpet-button" onClick={acceptJobReq}>
        Accept Request
      </div>
      <div className="reject-button" onClick={rejectJobReq}>
        Reject Request
      </div>
    </div>
  </div>
);
