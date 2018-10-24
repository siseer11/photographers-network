import React from 'react';
import {Button} from "../Button";
import {AppliedPhotographers} from './AppliedPhotographers';
import DownPayment from '../../contents/company/DownPayment';

export const SingleJobViewCompany = ({showDeleteModal, acceptedApplicant, appliedPhotographers, acceptHandler, declineHandler, downPayment, price, successfulPaymentHandler}) => (
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
            <div><h3>Photographer: </h3><p>{acceptedApplicant.displayName}</p></div> : // done payment is done, there is chosen photographer
            <DownPayment price={price} acceptedApplicant={acceptedApplicant}
                         paymentHandler={successfulPaymentHandler}/> // done payment has not been done, payment option is showed
        )
    }
  </React.Fragment>
);