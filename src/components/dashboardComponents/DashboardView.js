// dependencies
import React, {Component} from "react";

// components
import {DashboardHeader} from "./DashboardHeader";
import {NavFooterWrapper} from "../../containers/NavFooterWrapper";


const DashboardView = ({user, type, linkHandler, activeComponent, headerLinks, logoutHandler}) => {
  return (
    <div>
      <DashboardHeader type={type} links={headerLinks} uid={user.uid}
                       linkHandler={linkHandler}>
        Welcome {user.displayName}!
      </DashboardHeader>
      {activeComponent}
    </div>
  );
};

export const DashboardViewWithNav = NavFooterWrapper(DashboardView);