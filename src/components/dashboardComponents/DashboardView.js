// dependencies
import React from "react";
import {Link} from "react-router-dom";

// components
import {DashboardHeader} from "./DashboardHeader";
import {NavFooterWrapper} from "../../containers/NavFooterWrapper";

// containers
import MyJobOffers from '../../containers/MyJobOffers';
import AppliedJobs from "../../containers/AppliedJobs";


const DashboardView = ({user, type, linkHandler, activeComponent, headerLinks, loading}) => {

  let currentComponent = '';

  //TODO: maybe find a better solultion than the switch?
  switch (activeComponent) {
    case "Home":
      currentComponent = type === "photographer" ?
        (<Link to='/jobs' className="gb-btn gb-btn-medium gb-btn-primary">Search for jobs</Link>) :
        (<Link to='../createJob' className="gb-btn gb-btn-medium gb-btn-primary">Create job offer</Link>)
      ;
      break;
    case "Applied Jobs":
      currentComponent = (<AppliedJobs user={user} loading={loading}/>);
      break;
    case "My Jobs":
      currentComponent = (<MyJobOffers user={user} loading={loading} />);
      break;
    default:
      currentComponent = (<div>No fitting component!</div>);
      break;
  }

  return (
    <div>
      <DashboardHeader type={type} links={headerLinks} uid={user.uid}
                       linkHandler={linkHandler}>
        Welcome {user.displayName}!
      </DashboardHeader>
      {currentComponent}
    </div>
  );
};

export const DashboardViewWithNav = NavFooterWrapper(DashboardView);