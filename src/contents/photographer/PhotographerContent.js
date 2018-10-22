import React from "react";
import { Link } from "react-router-dom";
import { PortofolioGallery } from "../../components/PortofolioGallery";
import { PropTypes } from "prop-types";

export const PhotographerContent = ({ user }) => (
  <React.Fragment>
    {user.portofolio.length > 0 && (
      <PortofolioGallery photosList={user.portofolio} />
    )}
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
  </React.Fragment>
);

PhotographerContent.propTypes = {
  user: PropTypes.object.isRequired
};
