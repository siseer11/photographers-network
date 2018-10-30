// dependencies
import React, {Component} from "react";
import LoadingPage from "../../../components/LoadingPage";
import fire from "../../../config/Fire";

// components
import {GbCard50} from "../../../components/gbCard50";

export default class AppliedJobs extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.loading === false ? (
          <AppliedJobsFetch {...this.props} />
        ) : (
          <LoadingPage/>
        )}
      </React.Fragment>
    );
  }
}

/**
 * Helper component because we need user information to fetch data from the database.
 */
class AppliedJobsFetch extends Component {
  state = {
    loadedDb: false,
    jobList: [],
    appliedJobs: [],
    acceptedJobs: [],
    declinedJobs: [],
    finishedJobs: []
  };

  database = fire.database().ref();

  componentDidMount() {
    this.fetchJobs();
  }

  /**
   * Fetches applied jobs from current user from database.
   */
  fetchJobs() {
    const {user} = this.props;
    let jobs = [];
    this.database
      .child("photographer")
      .child(user.uid)
      .child("applied-jobs")
      .once("value", snap => {
        snap.forEach(job => {
          this.database.child("requests").child(job.val().jobbId).once("value", jobRequest => {
            jobs.push(jobRequest.val());
          })
            .then(() => {
              this.setState({jobList: jobs});
            });
        });
      });
  }

  render() {
    const {jobList} = this.state;
    return (
      <div>
        {jobList.map(job => (
          <GbCard50
            key={job.jobbId}
            cardLink={`${job.status === "open" ? "open" : "progress"}-job/${job.jobbId}`}
            type="half-left"
            source={{
              txt: job.companyName,
              link: `/profile/${job.company}`
            }}
            postedTime={new Date(job.date).toLocaleDateString("en-US")}
            category={job.type}
          >
            {job.title}
          </GbCard50>
        ))}
      </div>
    );
  }
}
