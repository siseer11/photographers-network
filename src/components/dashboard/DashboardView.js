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
import HireableSwitch from "../../contents/photographer/dashboard/HireableSwtich";

export const DashboardView = ({
  profile,
  auth,
  type,
  linkHandler,
  activeComponent,
  headerLinks
}) => {
  let currentComponent = "";

  //TODO: maybe find a better solultion than the switch?
  switch (activeComponent) {
    case "Home":
      currentComponent =
        type === "photographer" ? (
          // user is photographer
          <React.Fragment>
            {profile.premium ? (
              // user is premium
              <Portofolio user={profile} />
            ) : (
              // user is not premium
              <NoPremiumUser user={profile} />
            )}
            <Link to="/jobs" className="gb-btn gb-btn-medium gb-btn-primary">
              Search for jobs
            </Link>
            <HireableSwitch user={profile} />
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
      currentComponent = <AppliedJobs user={profile} auth={auth} />;
      break;
    case "My Jobs":
      currentComponent = <MyJobOffers user={profile} auth={auth} />;
      break;
    default:
      currentComponent = <div>No fitting component!</div>;
      break;
  }

  return (
    <div>
      <DashboardHeader
        type={type}
        links={headerLinks}
        profile={profile}
        auth={auth}
        linkHandler={linkHandler}
      >
        {profile.type === "photographer" ? (
          <span>Welcome {`${profile.firstName} ${profile.lastName}`}!</span>
        ) : (
          <span>Welcome {`${profile.companyName}`}!</span>
        )}
      </DashboardHeader>
      {currentComponent}
    </div>
  );
};

DashboardView.propTypes = {
  type: PropTypes.string.isRequired,
  linkHandler: PropTypes.func,
  activeComponent: PropTypes.string,
  headerLinks: PropTypes.array
};
