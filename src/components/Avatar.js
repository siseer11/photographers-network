import React from "react";
import PropTypes from "prop-types";

export const Avatar = ({ userImageUrl, classes, profileLink }) => (
  <a className="profile-link" href={profileLink}>
    <img src={userImageUrl} alt="avatar" className={`gb-avatar ${classes}`} />
  </a>
);

Avatar.propTypes = {
  userImageUrl: PropTypes.string.isRequired,
  classes: PropTypes.string,
  profileLink: PropTypes.string
};

Avatar.defaultProps = {
  classes: "gb-avatar-medium",
  profileLink: "#"
};
