import React from "react";
import { Button } from "../../Button";
import { AppliedPhotographers } from "./AppliedPhotographers";
import DownPayment from "../../../contents/company/single-job/DownPayment";
import { Link } from "react-router-dom";

export const OpenSingleJobViewCompany = ({
  showDeleteModal,
  acceptedApplicant,
  appliedPhotographers,
  acceptHandler,
  declineHandler,
  price,
  successfulPaymentHandler
}) => {
  console.log(acceptedApplicant);
  return (
    <React.Fragment>
      <Button
        classes="gb-btn gb-btn-medium gb-btn-primary"
        clickHandler={() => showDeleteModal(true)}
      >
        Delete
      </Button>
      {// checks, if there is already an accepted applicant
      !acceptedApplicant ? (
        <AppliedPhotographers
          photographers={appliedPhotographers || []}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        /> // showing applicants
      ) : (
        // done payment has not been done, payment option is showed
        <DownPayment
          description={
            <React.Fragment>
              <h3>Make down payment</h3>
              <p>
                Please make your down payment simply by pressing the PayPal
                button in order to accept{" "}
                <Link to={`/profile/${acceptedApplicant.uid}`}>
                  {`${acceptedApplicant.firstName} ${
                    acceptedApplicant.lastName
                  }`}
                </Link>{" "}
                as your photographer for your job request.
              </p>
            </React.Fragment>
          }
          price={price}
          paymentHandler={successfulPaymentHandler}
        />
      )}
    </React.Fragment>
  );
};
