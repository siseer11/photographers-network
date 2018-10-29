import React from 'react';
import {Link} from 'react-router-dom';
import NavFooterWrapper from "../../contents/shared/NavFooterWrapper";
import PropTypes from 'prop-types'
import {DeleteModal} from "./DeleteModal";
import {JobDescription} from "./JobDescription";
import {SingleJobViewhotographer} from "./SingleJobViewPhotographer";
import {SingleJobViewCompany} from "./SingleJobViewCompany";

const SingleJobView = ({
                         jobId,
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
                         isDeclinedPhotographer,
                         deleteHandler,
                         showDeleteModal,
                         showModal,
                         jobExists,
                         submittedWork,
                         acceptWorkHandler,
                         downloadHandler,
                         acceptedWork
                       }) => (

  <div className="single-job-view section-content">
    {jobExists ?
      <React.Fragment>
        {showModal &&
        <DeleteModal title="Do you really want to delete this job request?"
                     description="Warning: you can't recover this job. We won't recommend you to delete a job in progress!"
                     yesHandler={deleteHandler}
                     noHandler={() => showDeleteModal(false)}
        />
        }
        <JobDescription title={title} description={description} date={date} location={location} price={price}
                        type={type}
                        company={company} companyName={companyName}/>
        {
          // checks, if user is signed in
          user ?
            // user is signed in
            // checks, if user is a photographer
            (user.type === "photographer" ?
                // user is photographer
                (
                  <SingleJobViewhotographer userApplied={userApplied}
                                            acceptedApplicant={acceptedApplicant}
                                            user={user}
                                            isDeclinedPhotographer={isDeclinedPhotographer}
                                            applyHandler={applyHandler}
                                            jobId={jobId}
                                            submittedWork={submittedWork}
                                            acceptedWork={acceptedWork}
                  />
                ) :
                // user is company
                (
                  <SingleJobViewCompany showDeleteModal={showDeleteModal}
                                        acceptedApplicant={acceptedApplicant}
                                        appliedPhotographers={appliedPhotographers}
                                        acceptHandler={acceptHandler}
                                        declineHandler={declineHandler}
                                        downPayment={downPayment}
                                        price={price}
                                        successfulPaymentHandler={successfulPaymentHandler}
                                        submittedWork={submittedWork}
                                        acceptWorkHandler={acceptWorkHandler}
                                        downloadHandler={downloadHandler}
                                        acceptedWork={acceptedWork}
                  />
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
      </React.Fragment> :
      <div>Job does not seem to exist anymore.</div>
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
  userApplied: PropTypes.bool
};