import React from "react";
import { PropTypes } from "prop-types";

import fire from "../config/Fire";
import { AvailableJobsToSendList } from "../components/AvailableJobsToSendList";

export default class HireMeExistingJobOffer extends React.Component {
  static propTypes = {
    backHandler: PropTypes.func.isRequired,
    photographerName: PropTypes.string.isRequired,
    company: PropTypes.object.isRequired,
    photographerId: PropTypes.string.isRequired,
    typeHandler: PropTypes.func.isRequired,
    sendRequestHandler: PropTypes.func.isRequired,
    reqSentLoading: PropTypes.func.isRequired
  };

  state = {
    loading: true,
    existingJobs: []
  };

  componentDidMount() {
    const { company } = this.props;

    //Get all the jobs ids
    fire
      .database()
      .ref("company")
      .child(company.uid)
      .once("value")
      .then(snap => {
        let postedJobsIds = snap.val().postedJobs;
        postedJobsIds = postedJobsIds ? Object.values(postedJobsIds) : [];

        if (postedJobsIds.length > 0) {
          getOpenJobs(postedJobsIds);
        } else {
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => console.log(err));

    //Get the open jobs
    const getOpenJobs = jobs => {
      let promises = jobs.map(el =>
        fire
          .database()
          .ref("requests")
          .child(el.jobId)
          .once("value")
      );

      //wait for all the jobs to be fetched
      Promise.all(promises)
        .then(values => {
          const filteredJobs = values
            .map(job => job.val())
            .filter(
              jobValue => jobValue.status === "open" && !jobValue.sentToPrivate
            ); //filter out the ones that aren't open
          this.setState({
            loading: false,
            existingJobs: filteredJobs
          });
        })
        .catch(err => console.log(err));
    };
  }

  render() {
    const { loading, existingJobs } = this.state;
    const { reqSentLoading, sendRequestHandler, backHandler } = this.props;
    return (
      <div className="asd">
        {loading ? (
          <h2>Loading..... Waint no spinner?</h2>
        ) : (
          <AvailableJobsToSendList
            backHandler={backHandler}
            existingJobs={existingJobs}
            sendRequestHandler={sendRequestHandler}
            reqSentLoading={reqSentLoading}
          />
        )}
      </div>
    );
  }
}
