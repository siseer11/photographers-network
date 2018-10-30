import React from 'react';
import {Button} from "../../Button";
import {AppliedPhotographers} from '../AppliedPhotographers';
import DownPayment from '../../../contents/company/single-job/DownPayment';

export const OpenSingleJobViewCompany = ({showDeleteModal, acceptedApplicant, appliedPhotographers, acceptHandler, declineHandler, downPayment, price, successfulPaymentHandler}) => (
  <React.Fragment>
    <Button classes="gb-btn gb-btn-medium gb-btn-primary"
            clickHandler={() => showDeleteModal(true)}>Delete</Button>
    {
      // checks, if there is already an accepted applicant
      acceptedApplicant === "none" ?
        <AppliedPhotographers photographers={appliedPhotographers} acceptHandler={acceptHandler}
                              declineHandler={declineHandler}/> : // showing applicants
        // done payment has not been done, payment option is showed
        <DownPayment price={price} acceptedApplicant={acceptedApplicant}
                     paymentHandler={successfulPaymentHandler}/>
    }
  </React.Fragment>
);