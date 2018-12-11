import React from "react";
import { PhotographerContent } from "../../photographer/dashboard/PhotographerContent";
import { HireButton } from "../../../components/HireButton";
import { Link } from "react-router-dom";
import { PencilSVG } from "../../../components/svg/PencilSVG";
import ProfileDescription from "./ProfileDescription";

export const ProfileContent = ({
  thisProfileData,
  currentUserData,
  currentUserId,
  otherUser,
  finishedJobs
}) => (
  <div className="profile-content">
    <h1 className="profile-name">
      {thisProfileData.companyName ||
        `${thisProfileData.firstName} ${thisProfileData.lastName}`}
    </h1>
    <p>
      <span className="profile-desc bold">
        {Object.values(thisProfileData.locations)[0].city}
      </span>
      <span> | </span>
      <span className="profile-desc user-type">{thisProfileData.type}</span>
    </p>
    {thisProfileData.type === "photographer" &&
      currentUserData.type === "company" &&
      thisProfileData.hireable && (
        <HireButton
          classes="gb-btn gb-btn-small gb-btn-primary gb-btn-white hire"
          photographerData={thisProfileData}
          siggnedInUser={currentUserData}
          uid={currentUserId}
          photographerName={`${thisProfileData.firstName} ${
            thisProfileData.lastName
          }`}
        />
      )}
    {!otherUser && (
      <Link
        to="/ProfileEdit"
        className="gb-btn gb-btn-small gb-btn-primary gb-btn-white"
        id="edit-profile-link"
      >
        Edit Profile <PencilSVG classes="gb-icon-medium gb-icon-fill-white" />
      </Link>
    )}
    <ProfileDescription
      description={thisProfileData.description}
      otherUser={otherUser}
    />

    {thisProfileData.type === "photographer" ? (
      <PhotographerContent
        photographerData={thisProfileData}
        isOtherUser={otherUser}
        siggnedInUser={currentUserData}
        uid={currentUserId}
        finishedJobs={finishedJobs}
        hireable={thisProfileData.hireable}
      />
    ) : (
      <div className="company-details">Rest of the company content</div>
    )}
  </div>
);
