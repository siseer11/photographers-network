import React from "react";
import { Link } from "react-router-dom";
import MyJobsCategoryView from "../../../components/my-jobs/MyJobsCategoryView";
import {connect} from "react-redux";
import {myJobsFetch} from "../../../redux/actions/jobs-action";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class MyJobOffers extends React.Component {
  render() {
    const {
      openJobs,
      inProgressJobs,
      closedJobs,
      allJobs
    } = this.props;
    return (
      <React.Fragment>
        {!allJobs ? (
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

const mapStateToProps = state => {
  const allJobs = state.firestore.ordered.jobOffers || [];
  return {
    allJobs,
    openJobs: allJobs.filter(job => job.status === "open"),
    inProgressJobs: allJobs.filter(job => job.status === "in progress"),
    closedJobs: allJobs.filter(job => job.status === "closed"),
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => ({
  fetchJobs: () => dispatch(myJobsFetch())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
      {
        collection: 'jobOffers',
        where: [
          ['companyId', '==', props.auth.uid]
        ]
      }
    ])
)(MyJobOffers);
