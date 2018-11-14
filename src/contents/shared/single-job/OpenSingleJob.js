import React from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { isLoaded, firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import LoadingPage from "../../../components/LoadingPage";
import OpenSingleJobPhotographer from "../../photographer/single-job/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../../company/single-job/OpenSingleJobCompany";
import { JobDescription } from "../../../components/single-job/JobDescription";

class OpenSingleJob extends React.Component {
  render() {
    let { jobData, user } = this.props;

    //const { downPayment } = this.state;

    const type = user ? user.type : "photographer";

    if (!isLoaded(jobData)) {
      return <LoadingPage />;
    }

    jobData = jobData[this.props.match.params.jobid];

    if (jobData.status !== "open")
      return <Redirect to={`/progress-job/${this.props.match.params.jobid}`} />;

    return (
      <div className="single-job-view section-content">
        {true ? (
          <React.Fragment>
            <JobDescription {...jobData} />
            {type === "photographer" ? (
              <OpenSingleJobPhotographer
                userApplied={jobData.userApplied}
                isDeclinedPhotographer={jobData.isDeclinedPhotographer}
                jobId={jobData.id}
                user={user}
                jobDescription={jobData.description}
              />
            ) : (
              <OpenSingleJobCompany
                appliedPhotographers={jobData.appliedPhotographers}
                jobDescription={jobData.description}
                jobId={jobData.id}
                acceptedApplicant={jobData.phootgrapher}
                downPayment={false}
                {...this.props}
              />
            )}
          </React.Fragment>
        ) : (
          <p>Job does not exist!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile,
  jobData: state.firestore.data.jobOffers
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(ownProps => {
    const id = ownProps.match.params.jobid;
    return [
      {
        collection: "jobOffers",
        doc: id
      }
    ];
  })
)(OpenSingleJob);
