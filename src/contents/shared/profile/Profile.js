// dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProfileInfos } from "../../../redux/actions/profile-action";

// components
import { ProfileCard } from "../../../components/ProfileCard";
import { LinkLists } from "../../../components/LinkLists";

// contents
import { PhotographerContent } from "../../photographer/dashboard/PhotographerContent";
import CompanyContent from "../../company/profile/CompanyContent";

class Profile extends Component {
  componentDidMount() {
    const { profilesData, user } = this.props;

    const profileId = this.props.match.params.uid;

    if (!profilesData[profileId]) {
      console.log("nu e");
      this.props.fetchProfile(profileId);
    }
  }

  render() {
    const { fetchingProfile, profilesData, error, match, user } = this.props;
    const queryId = match.params.uid;
    const isOtherUser = queryId !== user.uid;
    const pageLinks = [
      { txt: "Facebook", link: "www.facebook.com" },
      { txt: "Twitter", link: "www.twitter.com" }
    ];

    let thisProfileData = profilesData[queryId];

    if (fetchingProfile) {
      return <h2>Fetching Profile Data...</h2>;
    }

    if (error) {
      return <h2>404 ERROR</h2>;
    }

    return (
      <ProfileView
        isOtherUser={isOtherUser}
        thisProfileData={thisProfileData}
        pageLinks={pageLinks}
        siggnedInUser={user}
      />
    );
  }
}

const mapStateToProps = state => {
  const profiles = state.profiles;
  const user = state.user;
  return {
    user: user.userData,
    userOn: user.userOn,
    profilesData: profiles.data,
    fetchingProfile: profiles.fetchingProfile,
    error: profiles.error
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: uid => dispatch(fetchProfileInfos(uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const ProfileView = ({
  isOtherUser,
  thisProfileData,
  pageLinks,
  siggnedInUser
}) => (
  <div>
    <div className="profile">
      <ProfileCard {...thisProfileData} siggnedInUser={siggnedInUser}>
        {thisProfileData.displayName}
      </ProfileCard>
      <div className="profile-content">
        <LinkLists
          links={pageLinks}
          txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
          liClasses="footer-nav-item"
        />
        {!isOtherUser && (
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
          isOtherUser={isOtherUser}
        />
      ) : (
        <CompanyContent isOtherUser={isOtherUser} />
      )}
    </div>
  </div>
);
