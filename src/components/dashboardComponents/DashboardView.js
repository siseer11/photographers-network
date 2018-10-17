// dependencies
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

// components
import {DashboardHeader} from "./DashboardHeader";
import {NavFooterWrapper} from "../../contents/shared/NavFooterWrapper";

// contents
import MyJobOffers from '../../contents/company/MyJobOffers';
import AppliedJobs from "../../contents/photographer/AppliedJobs";


const DashboardView = ({user, type, linkHandler, activeComponent, headerLinks, loading , updateAvatar}) => {

  let currentComponent = '';

  //TODO: maybe find a better solultion than the switch?
  switch (activeComponent) {
    case "Home":
      currentComponent = type === "photographer" ?
        (<Link to='/jobs' className="gb-btn gb-btn-medium gb-btn-primary">Search for jobs</Link>) :
        (<React.Fragment>
          <Link to='../createJob' className="gb-btn gb-btn-medium gb-btn-primary">Create job offer</Link>
          <Link to="/search-photographers" className="gb-btn gb-btn-medium gb-btn-primary">Search for photographers</Link>
        </React.Fragment>)
      ;
      break;
    case "Applied Jobs":
      currentComponent = (<AppliedJobs user={user} loading={loading}/>);
      break;
    case "My Jobs":
      currentComponent = (<MyJobOffers user={user} loading={loading}/>);
      break;
    default:
      currentComponent = (<div>No fitting component!</div>);
      break;
  }

  return (
    <div>
      <DashboardHeader updateAvatar={updateAvatar} type={type} links={headerLinks} user={user} linkHandler={linkHandler}>
        Welcome {user.displayName}!
      </DashboardHeader>
      {currentComponent}
    </div>
  );
};

export const DashboardViewWithNav = NavFooterWrapper(DashboardView);

DashboardView.propTypes = {
  user: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  linkHandler: PropTypes.func,
  activeComponent: PropTypes.string,
  headerLinks: PropTypes.array,
};