import React from "react";
import { Link } from "react-router-dom";
import { PortofolioGallery } from "../../../components/PortofolioGallery";
import { PropTypes } from "prop-types";

export const PhotographerContent = ({ photographerData, isOtherUser }) => (
  <React.Fragment>
    {photographerData.portfolio && photographerData.portfolio.length > 0 && (
      <React.Fragment>
        <h2>Portfolio</h2>
        <PortofolioGallery photosList={photographerData.portfolio} />
      </React.Fragment>
    )}
    {!isOtherUser && <OwnPhotographerProfile />}
  </React.Fragment>
);

const OwnPhotographerProfile = () => (
  <div className="section-content normalized">
    <h3>Job Offers</h3>
    <Link to="/" className="gb-btn gb-btn-medium gb-btn-primary">
      See all job offers...
    </Link>
    <h3>My Jobs</h3>
    <p>Here are my jobs</p>
    <Link to="/my-jobs" className="gb-btn gb-btn-medium gb-btn-primary">
      View all of my jobs
    </Link>
  </div>
);

PhotographerContent.propTypes = {
  photographerData: PropTypes.object.isRequired
};
