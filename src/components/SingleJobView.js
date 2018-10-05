import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "./Button";
import {NavFooterWrapper} from "../containers/NavFooterWrapper";

const SingleJobView = ({company, companyName, date, description, location, price, title, type, user, applyHandler, userApplied}) => (
  <div className="single-job-view section-content">
    <h2 style={{marginBottom: 50}}>Single Job Page</h2>
    <p>Job Title: {title}</p>
    <hr/>
    <p>Job Descrition: {description}</p>
    <hr/>
    <p>Job for the date of : {date}</p>
    <hr/>
    <p>Job in : <Link to={`../jobs?location=${location}`}>{location}</Link></p>
    <hr/>
    <p>Bugdget of : {price} SEK</p>
    <hr/>
    <p>Type of job : <Link to={`../jobs?type=${type}`}>{type}</Link></p>
    <hr/>
    <p>Posted by: <Link to={`../profile/${company}`}>{companyName}</Link></p>
    <hr/>
    {
      user ?
        (user.type === "photographer" ?
          (
            userApplied?(
              <h2>You have already applied for this job.</h2>
            ):(
              <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={applyHandler}>Apply</Button>
            )
          ) : (
          <p>You have to be a photographer to apply.</p>
          )
        ) : (
          <div>
            <p>Sign in/up to apply for this job.</p>
            <Link to="/signUp">Sign up</Link>
            <Link to="/signIn">Sign in</Link>
          </div>
        )
    }
  </div>
);

export const SingleJobViewWithNav = NavFooterWrapper(SingleJobView);