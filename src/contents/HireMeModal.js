import React from "react";
import fire from "../config/Fire";
import { PropTypes } from "prop-types";

import { ChoseTypeHireMe } from "../components/ChoseTypeHireMe";
import HireMeNewJobForm from "./HireMeNewJobForm";
import HireMeExistingJobOffer from "./HireMeExistingJobOffer";

export default class HireMeModal extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    photographerId: PropTypes.string.isRequired,
    photographerName: PropTypes.string.isRequired
  };

  state = {
    page: "choose",
    reqSentLoading: false
  };

  typeChangeHandler = newOne => {
    this.setState({
      page: newOne
    });
  };

  backToChose = () => {
    this.setState({
      page: "choose"
    });
  };

  // PUSH THE JOB REQ AS NOTIFICATION TO PHOTOGRAPHER
  sendRequestHandler = (jobbId, newCreatedJob = false) => {
    const { photographerId, company, closeModal } = this.props;
    this.setState({
      reqSentLoading: true
    });

    /* Send the notification to the photographer */
    fire
      .database()
      .ref("users")
      .child(`${photographerId}/notifications`)
      .push(
        {
          link: `/private/job/${jobbId}?user=${photographerId}`,
          read: false,
          title: `You got a new private job request from ${
            company.displayName
          }`,
          time: new Date().getTime()
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("notification pushed succesfull");
            if (newCreatedJob) {
              this.setState({
                reqSentLoading: false
              });
              closeModal();
            } else {
              updateSentToPrivate(jobbId);
            }
          }
        }
      );

    /* If the job is one that existed, make it's sentToPrivate: true , and add the id of the photographer to the sentTo*/
    const updateSentToPrivate = jobId => {
      fire
        .database()
        .ref("requests")
        .child(jobId)
        .update(
          {
            sentToPrivate: true,
            sentTo: photographerId
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log("finished");
              this.setState({
                reqSentLoading: false
              });
              closeModal();
            }
          }
        );
    };
  };

  render() {
    const { page, reqSentLoading } = this.state;
    const { company, photographerId, photographerName } = this.props;
    return (
      <div className="hireme-full-overlay">
        <div className="black-overlay close" />
        {page == "new-job" ? (
          <HireMeNewJobForm
            backHandler={this.backToChose}
            company={company}
            photographerId={photographerId}
            photographerName={photographerName}
            sendRequestHandler={this.sendRequestHandler}
          />
        ) : page == "existing-job" ? (
          <HireMeExistingJobOffer
            backHandler={this.backToChose}
            photographerName={photographerName}
            company={company}
            photographerId={photographerId}
            typeHandler={this.typeChangeHandler}
            sendRequestHandler={this.sendRequestHandler}
            reqSentLoading={reqSentLoading}
          />
        ) : (
          <ChoseTypeHireMe typeHandler={this.typeChangeHandler} />
        )}
      </div>
    );
  }
}
