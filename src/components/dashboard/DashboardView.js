// dependencies
import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";

// components
import {DashboardHeader} from "./DashboardHeader";
import Payouts from "../../contents/photographer/dashboard/Payouts";
import RecentJobs from "../../contents/photographer/dashboard/RecentJobs";

// contents
import {UpcomingJobs} from "../../contents/photographer/dashboard/UpcomingJobs";
import BillingInformation from "../../contents/shared/dashboard/BillingInformation";


// contents
/*
import MyJobOffers from "../../contents/company/my-jobs/MyJobOffers";
import AppliedJobs from "../../contents/photographer/applied-jobs/AppliedJobs";
import NoPremiumUser from "./NoPremiumUser";
import Portofolio from "./Portofolio";
import HireableSwitch from "../../contents/photographer/dashboard/HireableSwtich";*/

export const DashboardView = ({auth, type, linkHandler, headerLinks}) => {
  return (
    <React.Fragment>
      <DashboardHeader
        type={type}
        links={headerLinks}
        auth={auth}
        linkHandler={linkHandler}
      />
      <Route exact path="/dashboard" render={props => <Redirect to="/dashboard/upcoming-jobs"/>}/>
      <Route exact path="/dashboard/upcoming-jobs" render={props => <UpcomingJobs/>}/>
      <Route exact path="/dashboard/payout/:type" render={props => <Payouts {...props}/>}/>
      <Route exact path="/dashboard/billing-information" render={props => <BillingInformation/>}/>
      <Route exact path="/dashboard/recent-jobs" render={props => <RecentJobs/>}/>
    </React.Fragment>
  );
};

DashboardView.propTypes = {
  type: PropTypes.string.isRequired,
  linkHandler: PropTypes.func,
  activeComponent: PropTypes.string,
  headerLinks: PropTypes.array
};

/*
 switch (activeComponent) {
   case "Home":
     currentComponent =
       type === "photographer" ? (
         // user is photographer
         <React.Fragment>
           {profile.premium ? (
             // user is premium
             <Portofolio user={profile}/>
           ) : (
             // user is not premium
             <NoPremiumUser user={profile}/>
           )}
           <Link to="/jobs" className="gb-btn gb-btn-medium gb-btn-primary">
             Search for jobs
           </Link>
           <HireableSwitch user={profile}/>
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
     currentComponent = <AppliedJobs user={profile} auth={auth}/>;
     break;
   case "My Jobs":
     currentComponent = <MyJobOffers user={profile} auth={auth}/>;
     break;
   default:
     currentComponent = <div>No fitting component!</div>;
     break;
 }*/
