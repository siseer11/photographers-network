import React from 'react';
import {Button} from "../../Button";

export const OpenSingleJobViewPhotographer = ({userApplied, isDeclinedPhotographer, applyHandler}) => (
  // user is photographer
  // checks if current user applied for this job
  userApplied ?
    <h2>You have already applied for this job.</h2> // user applied for this job
    : (
      isDeclinedPhotographer ?
        // user has already applied for this job, but has been declined
        <h2>You have been declined to do this job.</h2> :
        // user has not applied yet, apply button will be shown
        <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={applyHandler}>Apply</Button>
    )
);