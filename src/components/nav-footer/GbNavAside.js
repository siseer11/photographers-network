import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { StarSVG } from "../svg/StarSVG";
const links = {
  photographer: [
    {
      to: "dashboard",
      txt: "DASHBOARD"
    },
    {
      to: "jobs",
      txt: "JOB OFFERTS"
    },
    {
      to: "ProfileEdit",
      txt: "PROFILE SETTINGS"
    },
    {
      to: "#",
      txt: "BILLING INFORMATION"
    },
    {
      to: "#",
      txt: "PAY OUT"
    }
  ],
  company: [
    {
      to: "dashboard",
      txt: "DASHBOARD"
    },
    {
      to: "search-photographers",
      txt: "SEARCH PHOTOGRAPHERS"
    },
    {
      to: "createJob",
      txt: "CREATE JOB OFFERT"
    },
    {
      to: "jobs",
      txt: "JOB OFFERTS"
    },
    {
      to: "ProfileEdit",
      txt: "PROFILE SETTINGS"
    },
    {
      to: "#",
      txt: "BILLING INFORMATION"
    },
    {
      to: "#",
      txt: "PAY OUT"
    }
  ]
};

export const GbNavAside = ({ expanded, user, signOutUser }) => (
  <div
    className={`gb-nav-aside gb-background-black ${
      expanded ? "translated" : ""
    }`}
  >
    <div className="nav-aside-content">
      {user.uid ? (
        <GbNavAsideUserOn
          expanded={expanded}
          user={user}
          signOutUser={signOutUser}
        />
      ) : (
        <ul className="nav-aside-content-top">
          <li className="nav-aside-top-list-item">
            <Link to="/signIn" className="nav-aside-link gb-text-white">
              <StarSVG classes="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" />
              <h5 className="gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase">
                Sign in
              </h5>
            </Link>
          </li>
        </ul>
      )}
    </div>
  </div>
);

const GbNavAsideUserOn = ({ expanded, user, signOutUser }) => (
  <React.Fragment>
    <ul className="nav-aside-content-top">
      {links[user.type].map((el, idx) => (
        <li
          key={new Date().getTime() + idx}
          className="nav-aside-top-list-item"
        >
          <Link to={`/${el.to}`} className="nav-aside-link gb-text-white">
            <StarSVG classes="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" />
            <h5 className="gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase">
              {el.txt}
            </h5>
          </Link>
        </li>
      ))}
    </ul>

    <div className="nav-aside-content-bottom line-top">
      <div className="content-left">
        <h2
          onClick={signOutUser}
          className="left-link gb-text-uppercase gb-text-white gb-title-tiny"
        >
          SIGN OUT
        </h2>
        <p className="left-link gb-label gb-text-white-opacity-50">
          {user.type === "photographer"
            ? user.firstName + " " + user.lastName
            : user.companyName}
        </p>
      </div>
      <div className="content-right">
        <Link to={`/profile/${user.uid}`} className="profile-link">
          <img
            className="gb-avatar gb-avatar-medium"
            src={user.profileImageUrl}
          />
        </Link>
      </div>
    </div>
  </React.Fragment>
);

GbNavAside.propTypes = {
  expanded: PropTypes.bool.isRequired,
  user: PropTypes.object,
  signOutUser: PropTypes.func.isRequired
};
