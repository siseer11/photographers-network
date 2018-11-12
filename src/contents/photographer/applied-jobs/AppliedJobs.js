// dependencies
import React, {Component} from "react";
import {connect} from "react-redux";

// components
import MyJobsCategoryView from "../../../components/my-jobs/MyJobsCategoryView";
import {appliedJobsFetch, fetchJobs} from "../../../redux/actions/jobs-action";

const mapStateToProps = state => {
  const jobs = state.allJobs;
  return {
    fetchedAppliedOnce: jobs.fetchedAppliedOnce,
    appliedJobs: jobs.photographer.appliedJobs,
    acceptedJobs: jobs.photographer.acceptedJobs,
    declinedJobs: jobs.photographer.declinedJobs,
    finishedJobs: jobs.photographer.finishedJobs
  };
};

const mapDispatchToProps = dispatch => ({
  fetchJobs: () => dispatch(appliedJobsFetch())
});

class AppliedJobs extends Component {
  componentDidMount() {
    if(!this.props.fetchedAppliedOnce) {
      this.props.fetchJobs();
    }
  }

  render() {
    const {appliedJobs, acceptedJobs, declinedJobs, finishedJobs} = this.props;
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

export default connect(mapStateToProps, mapDispatchToProps)(AppliedJobs);
