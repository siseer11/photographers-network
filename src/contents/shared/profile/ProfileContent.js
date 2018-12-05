import React from "react";
import {PhotographerContent} from "../../photographer/dashboard/PhotographerContent";
import {HireButton} from "../../../components/HireButton";
import {Link} from "react-router-dom";
import {PencilSVG} from "../../../components/svg/PencilSVG";

export const ProfileContent = ({thisProfileData, currentUserData, currentUserId, otherUser, finishedJobs}) => (
  <div className="profile-content">
    <h1>{thisProfileData.companyName ||
    `${thisProfileData.firstName} ${thisProfileData.lastName}`}</h1>
    <p>
      <span className="profile-desc bold">{Object.values(thisProfileData.locations)[0].city}</span>
      <span> | </span>
      <span className="profile-desc">{thisProfileData.type === "photographer" ? "Photographer" : "Company"}</span>
    </p>
    {
      (
        thisProfileData.type === "photographer" &&
        currentUserData.type === "company" &&
        thisProfileData.hireable
      ) &&
      <HireButton
        classes="gb-btn gb-btn-small gb-btn-primary gb-btn-white hire"
        photographerData={thisProfileData}
        siggnedInUser={currentUserData}
        uid={currentUserId}
        photographerName={`${thisProfileData.firstName} ${thisProfileData.lastName}`}
      />
    }
    {!otherUser && (
      <Link
        to="/ProfileEdit"
        className="gb-btn gb-btn-small gb-btn-primary gb-btn-white"
      >
        Edit Profile <PencilSVG classes="gb-icon-medium gb-icon-fill-white"/>
      </Link>
    )}
    <div className="black">
      <h3>Description</h3>
      <p className="profile-desc">
        There, between rolling hills and the Apennine mountains in the Mugello valley (home to the famous race
        track) lies Lake Bilancino.
        There, between rolling hills and the Apennine mountains in the Mugello valley.

        There, between rolling hills and the Apennine mountains in the Mugello valley (home to the famous race
        track) lies Lake Bilancino.
      </p>
    </div>

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
      <div>Rest of the company content</div>
    )}
  </div>
);