import React from "react";
import fire from "../../config/Fire";
import {Link} from 'react-router-dom';

export default class ProgressSingleJobPhotographer extends React.Component {
  state = {
    userApplied: false,
    isDeclinedPhotographer: false
  };
  database = fire.database();

  render() {
    const {
      submittedWork,
      acceptedWork,
      jobId
    } = this.props;

    console.log(this.state.submittedWork);
    return (
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
    );
  }
}
