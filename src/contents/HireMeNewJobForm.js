import React from "react";
import { PropTypes } from "prop-types";

import fire from "../config/Fire";
import CreateJobForm from "./CreateJobForm";

export default class HireMeNewJobForm extends React.Component {
  static propTypes = {
    backHandler: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    photographerId: PropTypes.string.isRequired,
    photographerName: PropTypes.string.isRequired,
    sendRequestHandler: PropTypes.func.isRequired
  };

  submitHandler = values => {
    const {
      company,
      photographerId,
      phootgrapherName,
      sendRequestHandler
    } = this.props;
    // Get a new id for this jobb
    const jobbId = fire
      .database()
      .ref("requests")
      .push().key;

    // Push the new created job to the database
    fire
      .database()
      .ref("requests")
      .child(jobbId)
      .set(
        {
          ...values,
          status: "open",
          payment: "soooooon",
          phootgrapher: "none",
          companyId: company.uid,
          companyName: company.displayName,
          sentTo: photographerId,
          jobbId: jobbId,
          sentToPrivate: true
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Step 1/3 done...");
            addPrivateJobToComapny();
          }
        }
      );

    // Add the job to the private jobs in the Company db
    const addPrivateJobToComapny = () => {
      fire
        .database()
        .ref("company")
        .child(`${company.uid}/privateJobs/${jobbId}`)
        .set(
          {
            jobId: jobbId,
            private: true
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log("Step 2/3 done...");
              //Send the jobb as Request to the photographer
              sendRequestHandler(jobbId, true);
            }
          }
        );
    };
  };

  render() {
    const { backHandler } = this.props;
    return (
      <div style={{ zIndex: 120 }} className="z">
        <h2 className="send-job-offer-back" onClick={backHandler}>
          BACK
        </h2>
        <CreateJobForm submitHandler={this.submitHandler} />
      </div>
    );
  }
}
