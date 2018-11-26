import React from 'react';
import {SubmittedWork} from "./SubmittedWork";

export const ProgressSingleJobViewCompany = ({acceptedApplicant, deliveryStatus, submittedWork, acceptWorkHandler, downloadHandler, acceptedWork}) => (
  <React.Fragment>
    {
      (
        deliveryStatus && deliveryStatus === "delivered" ?
          (
            acceptedWork ?
              <h3>Job closed. You accepted submitted work of photographer.</h3>
              :
              <SubmittedWork
                pictures={submittedWork}
                acceptWorkHandler={acceptWorkHandler}
                downloadHandler={downloadHandler}
              />
          ) :
          <div><h3>Photographer: </h3><p>{`${acceptedApplicant.firstName} ${acceptedApplicant.lastName}`}</p></div>
      )
    }
  </React.Fragment>
);