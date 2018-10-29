import React from 'react';
import {Button} from "../Button";
import {Link} from 'react-router-dom';

export const SingleJobViewhotographer = ({user, userApplied, acceptedApplicant, isDeclinedPhotographer, applyHandler, jobId, submittedWork, acceptedWork}) => (
  // user is photographer
  // checks if current user applied for this job
  userApplied ? (
    // checks, if current user has been accepted to do the job
    acceptedApplicant !== "none" && acceptedApplicant.uid === user.uid ?
      (
        submittedWork.length > 0 ?
          (
            acceptedWork ?
              <h2>Your submitted work has been approved. You will receive the payment asap.</h2> :
              <h2>Waiting for company to approve your submitted work.</h2>
          ) :
          <React.Fragment>
            <h2>You have been accepted to do this job.</h2>
            <p>Submit your work here:</p>
            <Link to={`/submit-work/${jobId}`} className="gb-btn gb-btn-medium gb-btn-primary">Submit...</Link>
          </React.Fragment>
      ) : // user applied and has been accepted
      <h2>You have already applied for this job.</h2> // user applied for this job
  ) : (
    isDeclinedPhotographer ?
      // user has already applied for this job, but has been declined
      <h2>You have been declined to do this job.</h2> :
      // user has not applied yet, apply button will be shown
      <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={applyHandler}>Apply</Button>
  )
);