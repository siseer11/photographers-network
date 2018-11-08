// dependencies
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// components
import { DashboardHeader } from "./DashboardHeader";

// contents
import MyJobOffers from "../../contents/company/my-jobs/MyJobOffers";
import AppliedJobs from "../../contents/photographer/applied-jobs/AppliedJobs";
import NoPremiumUser from "./NoPremiumUser";
import Portofolio from "./Portofolio";
import HireableSwitch from "../../contents/photographer/HireableSwtich";

export const DashboardView = ({
  user,
  type,
  linkHandler,
  activeComponent,
  headerLinks,
  loading,
  updateUserInfo
}) => {
  let currentComponent = "";

  //TODO: maybe find a better solultion than the switch?
  switch (activeComponent) {
    case "Home":
      currentComponent =
        type === "photographer" ? (
          // user is photographer
          <React.Fragment>
            {user.premium ? (
              // user is premium
              <Portofolio user={user} updateUserInfo={updateUserInfo} />
            ) : (
              // user is not premium
              <NoPremiumUser updateUserInfo={updateUserInfo} user={user} />
            )}
            <Link to="/jobs" className="gb-btn gb-btn-medium gb-btn-primary">
              Search for jobs
            </Link>
            <HireableSwitch user={user} updateUserInfo={updateUserInfo} />
          </React.Fragment>
        ) : (
          // user is company
          <React.Fragment>
            <Link
              to="../createJob"
              className="gb-btn gb-btn-medium gb-btn-primary"
            >
              Create job offer
            </Link>
            <Link
              to="/search-photographers"
              className="gb-btn gb-btn-medium gb-btn-primary"
            >
              Search for photographers
            </Link>
          </React.Fragment>
        );
      break;
    case "Applied Jobs":
      currentComponent = <AppliedJobs user={user} loading={loading} />;
      break;
    case "My Jobs":
      currentComponent = <MyJobOffers user={user} loading={loading} />;
      break;
    default:
      currentComponent = <div>No fitting component!</div>;
      break;
  }

  return (
    <div>
      <DashboardHeader
        updateUserInfo={updateUserInfo}
        type={type}
        links={headerLinks}
        user={user}
        linkHandler={linkHandler}
      >
        Welcome {user.displayName}!
      </DashboardHeader>
      {currentComponent}
    </div>
  );
};

DashboardView.propTypes = {
  user: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  linkHandler: PropTypes.func,
  activeComponent: PropTypes.string,
  headerLinks: PropTypes.array
};
