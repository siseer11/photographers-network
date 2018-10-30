import React from 'react';
import {SubmittedWork} from "../SubmittedWork";

export const ProgressSingleJobViewCompany = ({acceptedApplicant, submittedWork, acceptWorkHandler, downloadHandler, acceptedWork}) => (
  <React.Fragment>
    {
      (
        submittedWork.length > 0 ?
          (
            acceptedWork ?
              <h3>Job closed. You accepted submitted work of photographer.</h3> :
              <SubmittedWork
                pictures={submittedWork}
                acceptWorkHandler={acceptWorkHandler}
                downloadHandler={downloadHandler}
              />
          ) :
          <div><h3>Photographer: </h3><p>{acceptedApplicant.displayName}</p></div>
      )
    }
  </React.Fragment>
);