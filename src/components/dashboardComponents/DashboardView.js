// dependencies
import React, {Component} from "react";

// containers
import GbNavBar from '../gbNav';

// components
import {DashboardHeader} from "./DashboardHeader";
import {GbFooter} from "../Footer";
import {InstagramSVG} from "../svg/InstagramSVG";
import {TwitterSVG} from "../svg/TwitterSVG";
import {FacebookSVG} from "../svg/FacebookSVG";


export const DashboardView = ({user, type, linkHandler, activeComponent, headerLinks, logoutHandler}) => {
    return (
      <div>
        <GbNavBar
          righLinks={
            [{txt: 'Sign out', clickHandler: logoutHandler}]
          }
          loggedIn={false}
        />

        <DashboardHeader type={type} links={headerLinks} uid={user.uid}
                         linkHandler={linkHandler}>
          Welcome {user.displayName}!
        </DashboardHeader>

        {activeComponent}

        <GbFooter
          socialMedias={[
            {
              icon: <InstagramSVG
                classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>, link: '#'
            },
            {
              icon: <TwitterSVG
                classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
              link: '#'
            },
            {
              icon: <FacebookSVG
                classes='gb-icon-fill-black-opacity-30 gb-icon-small'/>,
              link: '#'
            }]}
        />

      </div>
    );
};