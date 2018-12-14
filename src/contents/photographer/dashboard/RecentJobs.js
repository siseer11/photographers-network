import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";
import {JobCard} from "../../../components/jobs/JobCard";

const RecentJobs = ({jobs}) => {
  if (!isLoaded(jobs)) {
    return <h2>Loading....</h2>;
  }
  if (isEmpty(jobs)) {
    return <h2>You have no jobs!</h2>;
  }
  return (
    <ul className="paymentList">
      {
        jobs.map(job =>
          <JobCard key={job.id} {...job} moreLink={true}/>
        )
      }
    </ul>
  );
};

const mapStateToProps = state => ({
  jobs: state.firestore.ordered.appliedJobs,
  uid: state.firebase.auth.uid
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(({ uid }) => [
    {
      collection: "jobOffers",
      where: ["photographersWhichAppliedIds", "array-contains", uid],
      storeAs: "appliedJobs"
    }
  ])
)(RecentJobs);
