import React from "react";
import { Link } from "react-router-dom";
import MyJobsCategoryView from "../../../components/my-jobs/MyJobsCategoryView";
import {connect} from "react-redux";
import {myJobsFetch} from "../../../redux/actions/jobs-action";

const mapStateToProps = state => {
  const jobs = state.allJobs;
  return {
    jobsLoading: jobs.jobsLoading,
    fetchedCompanyJobsOnce: jobs.fetchedCompanyJobsOnce,
    openJobs: jobs.company.openJobs,
    inProgressJobs: jobs.company.inProgressJobs,
    closedJobs: jobs.company.closedJobs,
    allJobs: jobs.company.allJobs
  };
};

const mapDispatchToProps = dispatch => ({
  fetchJobs: () => dispatch(myJobsFetch())
});

class MyJobOffers extends React.Component {
  componentDidMount() {
    if(!this.props.fetchedCompanyJobsOnce) {
      this.props.fetchJobs();
    }
  }

  render() {
    const {
      jobsLoading,
      openJobs,
      inProgressJobs,
      closedJobs,
      allJobs
    } = this.props;
    return (
      <React.Fragment>
        {jobsLoading ? (
          <h2>Loading...</h2>
        ) : allJobs.length === 0 ? (
          <h2>
            You have no jobs posted yet, create your first{" "}
            <Link to="/createJob">here</Link>
          </h2>
        ) : (
          <div className="my-jobs-container">
            <MyJobsCategoryView
              categoryTitle="Open"
              jobs={openJobs}
            />
            <MyJobsCategoryView
              categoryTitle="In Progress"
              jobs={inProgressJobs}
            />
            <MyJobsCategoryView
              categoryTitle="Closed"
              jobs={closedJobs}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobOffers);
