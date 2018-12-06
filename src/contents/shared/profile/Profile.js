// dependencies
import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect, isLoaded, isEmpty} from "react-redux-firebase";

// components
import {ProfileCard} from "../../../components/ProfileCard";
import {ProfileContent} from "./ProfileContent";

const Profile = ({match, profileData, currentUserData, currentUserId, finishedJobs}) => {
  const profileId = match.params.uid;

  if (!isLoaded(profileData)) {
    return <h2>Loading..</h2>;
  } else if (!isLoaded(profileData[profileId])) {
    return <h2>Loading...</h2>;
  }

  if (isEmpty(profileData)) {
    return <h2>No data for this id</h2>;
  }

  const otherUser = currentUserId !== profileId;
  const thisProfileData = profileData[profileId];

  return (
    <div className="profile">
      <ProfileCard {...thisProfileData} siggnedInUser={currentUserData}/>
      <ProfileContent thisProfileData={thisProfileData}
                      currentUserData={currentUserData}
                      currentUserId={currentUserId}
                      otherUser={otherUser}
                      finishedJobs={finishedJobs}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const jobOffers = state.firestore.ordered.jobOffers;
  return {
    profileData: state.firestore.data.users,
    currentUserData: state.firebase.profile,
    currentUserId: state.firebase.auth.uid,
    finishedJobs: jobOffers ? jobOffers.length : 0
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: `users`,
        doc: props.match.params.uid
      },
      {
        collection: "jobOffers",
        where: [["photographer.uid", "==", props.match.params.uid], ["status", "==", "closed"]],
      }
    ];
  })
)(Profile);
