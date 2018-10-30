// dependencies
import React, {Component} from "react";
import LoadingPage from "../../../components/LoadingPage";
import fire from "../../../config/Fire";

// components
import MyJobsCategoryView from "../../../components/my-jobs/MyJobsCategoryView";

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
            jobs.push({...jobRequest.val(), statusPhotographer: job.val().status});
          })
            .then(() => {
              this.setState({
                appliedJobs: jobs.filter(job => job.statusPhotographer === "applied"),
                acceptedJobs: jobs.filter(job => job.statusPhotographer === "accepted"),
                declinedJobs: jobs.filter(job => job.statusPhotographer === "declined"),
                finishedJobs: jobs.filter(job => job.statusPhotographer === "finished")
              });
            });
        });
      });
  }

  render() {
    const {appliedJobs, acceptedJobs, declinedJobs, finishedJobs} = this.state;
    return (
      <div className="my-jobs-container">
        <MyJobsCategoryView categoryTitle="Applied" jobs={appliedJobs}/>
        <MyJobsCategoryView categoryTitle="Accepted" jobs={acceptedJobs}/>
        <MyJobsCategoryView categoryTitle="Declined" jobs={declinedJobs}/>
        <MyJobsCategoryView categoryTitle="Finished" jobs={finishedJobs}/>
      </div>
    );
  }
}
