import React from 'react';
import {Button} from "../../Button";
import {AppliedPhotographers} from '../open/AppliedPhotographers';
import DownPayment from '../../../contents/company/single-job/DownPayment';
import {SubmittedWork} from "../progress/SubmittedWork";

export const SingleJobViewCompany = ({showDeleteModal, acceptedApplicant, appliedPhotographers, acceptHandler, declineHandler, downPayment, price, successfulPaymentHandler, submittedWork, acceptWorkHandler, downloadHandler, acceptedWork}) => (
  <React.Fragment>
    <Button classes="gb-btn gb-btn-medium gb-btn-primary"
            clickHandler={() => showDeleteModal(true)}>Delete</Button>
    {
      // user is company
      // checks, if there is already an accepted applicant
      acceptedApplicant === "none" ?
        <AppliedPhotographers photographers={appliedPhotographers} acceptHandler={acceptHandler}
                              declineHandler={declineHandler}/> : // showing applicants
        (
          // checks, if the down payment has already been done
          downPayment ?
            // done payment is done, there is chosen photographer
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
            ) :
            // done payment has not been done, payment option is showed
            <DownPayment price={price} acceptedApplicant={acceptedApplicant}
                         paymentHandler={successfulPaymentHandler}/>
        )
    }
  </React.Fragment>
);