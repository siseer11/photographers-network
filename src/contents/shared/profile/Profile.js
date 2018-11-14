// dependencies
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

// components
import { ProfileCard } from "../../../components/ProfileCard";
import { LinkLists } from "../../../components/LinkLists";

// contents
import { PhotographerContent } from "../../photographer/dashboard/PhotographerContent";
import CompanyContent from "../../company/profile/CompanyContent";

const Profile = ({ match, profileData, currentUserData, currentUserId }) => {
  if (!isLoaded(profileData)) {
    return <h2>Loading...</h2>;
  }

  if (isEmpty(profileData)) {
    return <h2>No data for this id</h2>;
  }

  const profileId = match.params.uid;
  const otherUser = currentUserId != profileId;

  const thisProfileData = profileData[profileId];

  const pageLinks = [
    { txt: "Facebook", link: "www.facebook.com" },
    { txt: "Twitter", link: "www.twitter.com" }
  ];

  return (
    <div>
      <div className="profile">
        <ProfileCard {...thisProfileData} siggnedInUser={currentUserData}>
          {thisProfileData.displayName}
        </ProfileCard>
        <div className="profile-content">
          <LinkLists
            links={pageLinks}
            txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
            liClasses="footer-nav-item"
          />
          {!otherUser && (
            <Link
              to="/ProfileEdit"
              className="gb-btn gb-btn-medium gb-btn-primary"
            >
              Edit Profile
            </Link>
          )}
        </div>

        {thisProfileData.type === "photographer" ? (
          <PhotographerContent
            photographerData={thisProfileData}
            isOtherUser={otherUser}
          />
        ) : (
          <CompanyContent isOtherUser={otherUser} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profileData: state.firestore.data.users,
  currentUserData: state.firebase.profile,
  currentUserId: state.firebase.auth.uid
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: `users`,
      doc: props.match.params.uid
    }
  ])
)(Profile);
