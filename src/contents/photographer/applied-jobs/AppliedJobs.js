// dependencies
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";

// components
import MyJobsCategoryView from "../../../components/my-jobs/MyJobsCategoryView";

const AppliedJobs = ({ appliedJobsList, uid }) => {
  if (!isLoaded(appliedJobsList)) {
    return <h2>Loading....</h2>;
  }
  if (isEmpty(appliedJobsList)) {
    return <h2>You have no applied jobs!</h2>;
  }

  const appliedJobsOpen = appliedJobsList.filter(el => el.status === "open");
  const appliedJobsAccepted = appliedJobsList.filter(
    el => el.status === "in progress" && el.photographer.uid === uid
  );
  const appliedJobsDeclined = appliedJobsList.filter(
    el => el.status !== "open" && el.photographer.uid !== uid
  );
  const finishedJobs = appliedJobsList.filter(
    el => el.status === "closed" && el.photographer.uid === uid
  );

  return (
    <div className="my-jobs-container">
      <MyJobsCategoryView categoryTitle="Applied" jobs={appliedJobsOpen} />
      <MyJobsCategoryView categoryTitle="Accepted" jobs={appliedJobsAccepted} />
      <MyJobsCategoryView categoryTitle="Declined" jobs={appliedJobsDeclined} />
      <MyJobsCategoryView categoryTitle="Finished" jobs={finishedJobs} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  appliedJobsList: state.firestore.ordered.appliedJobs,
  uid: ownProps.auth.uid
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(({ auth }) => [
    {
      collection: "jobOffers",
      where: ["photographersWhichAppliedIds", "array-contains", auth.uid],
      storeAs: "appliedJobs"
    }
  ])
)(AppliedJobs);
