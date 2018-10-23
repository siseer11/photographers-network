import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "../Button";
import NavFooterWrapper from "../../contents/shared/NavFooterWrapper";
import {AppliedPhotographers} from './AppliedPhotographers';
import DownPayment from '../../contents/company/DownPayment';
import PropTypes from 'prop-types'

const SingleJobView = ({
                         company,
                         companyName,
                         date,
                         description,
                         location,
                         price,
                         title,
                         type,
                         user,
                         applyHandler,
                         userApplied,
                         appliedPhotographers,
                         acceptHandler,
                         declineHandler,
                         acceptedApplicant,
                         downPayment,
                         successfulPaymentHandler,
                         isDeclinedPhotographer
                       }) => (
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
      // checks, if user is signed in
      user ?
        // user is signed in
        // checks, if user is a photographer
        (user.type === "photographer" ?
            (
              // user is photographer
              // checks if current user applied for this job
              userApplied ? (
                // checks, if current user has been accepted to do the job
                acceptedApplicant !== "none" && acceptedApplicant.uid === user.uid ?
                  <h2>You have been accepted to do this job.</h2> : // user applied and has been accepted
                  <h2>You have already applied for this job.</h2> // user applied for this job
              ) : (
                isDeclinedPhotographer ?
                  // user has already applied for this job, but has been declined
                  <h2>You have been declined to do this job.</h2> :
                  // user has not applied yet, apply button will be shown
                  <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={applyHandler}>Apply</Button>
              )
            ) : (
              // user is company
              // checks, if there is already an accepted applicant
              acceptedApplicant === "none" ?
                <AppliedPhotographers photographers={appliedPhotographers} acceptHandler={acceptHandler}
                                      declineHandler={declineHandler}/> : // showing applicants
                (
                  // checks, if the down payment has already been done
                  downPayment ?
                    <div><h3>Photographer: </h3><p>{acceptedApplicant.displayName}</p></div> : // done payment is done, there is chosen photographer
                    <DownPayment price={price} acceptedApplicant={acceptedApplicant}
                                 paymentHandler={successfulPaymentHandler}/> // done payment has not been done, payment option is showed
                )
            )
        ) : (
          // no user is signed in
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

SingleJobView.propTypes = {
  company: PropTypes.string,
  companyName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  applyHandler: PropTypes.func.isRequired,
  userApplied: PropTypes.bool,
};