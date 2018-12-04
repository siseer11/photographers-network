import React from "react";
import { PortofolioGallery } from "../../../components/PortofolioGallery";
import { PropTypes } from "prop-types";
import {HireButton} from "../../../components/HireButton";
import {Link} from "react-router-dom";
import {ReviewBox} from "../../../components/profile/ReviewBox";

export const PhotographerContent = ({ photographerData, isOtherUser, siggnedInUser, uid, finishedJobs, hireable }) => (
  <React.Fragment>
    <div className="flex-container-space">
      <div>
        <span className="big-num">{finishedJobs}</span>
        <span className="light-blue">Jobs <br/>done</span>
      </div>
      <Link
        to="/dashboard"
        className="gb-btn gb-btn-small gb-btn-primary gb-btn-white"
      >
        See the projects
      </Link>
    </div>
    {photographerData.portfolio && photographerData.portfolio.length > 0 && (
      <React.Fragment>
        <h2 className="black-header-portfolio">Portfolio</h2>
        <PortofolioGallery photosList={photographerData.portfolio} />
      </React.Fragment>
    )}
    {
      hireable &&
      <div className="pink-box">
        <p>There, between rolling hills and the Apennine mountains in the Mugello valley.</p>
        <HireButton
          classes="hire-button"
          photographerData={photographerData}
          siggnedInUser={siggnedInUser}
          uid={uid}
          photographerName={`${photographerData.firstName} ${photographerData.lastName}`}
        />
      </div>
    }
    <ReviewBox title="Last review"
               userImageURL="https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg"
               name="John Doe"
               quote="New battery for smartphones can be charged in a minute"
    />
  </React.Fragment>
);

PhotographerContent.propTypes = {
  photographerData: PropTypes.object.isRequired
};
