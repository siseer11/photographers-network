import React from "react";
import {Link} from 'react-router-dom';
import DownPayment from "../../company/single-job/DownPayment";
import {connect} from "react-redux";
import {setInsurancePaymentStatus} from "../../../redux/actions/single-job-action-photographer";

class ProgressSingleJobPhotographer extends React.Component {
    render() {
    const {
      submittedWork,
      acceptedWork,
      jobId,
      jobDescription
    } = this.props;

    return (
      submittedWork.length > 0 && jobDescription.deliveryStatus ?
        (
          acceptedWork ?
            <h2>Your submitted work has been approved. Go to <Link to="/payouts/photographer">payouts</Link> to get your money.</h2> :
            <h2>Waiting for company to approve your submitted work.</h2>
        ) :
        (
          jobDescription.insurance && jobDescription.insurancePaymentStatus === "none" ?
            <DownPayment
              description={
                <p>
                  Please make your insurance payment. The company has decided to use an
                  insurance payment in order to make sure, the work will be delivered. You will get back this amount of
                  money as soon as you delivered your work. The insurance has to be paid
                  by {jobDescription.insuranceDue}, otherwise the job will be cancelled.<br/>
                  <b>Amount: </b>{jobDescription.insuranceAmount} €
                </p>
              }
              paymentHandler={() => this.props.setInsurancePaymentStatus(jobId)}
              price={jobDescription.insuranceAmount}
            />
            :
            <React.Fragment>
              <h2>You have been accepted to do this job.</h2>
              <p>Submit your work here:</p>
              <Link to={`/submit-work/${jobId}`} className="gb-btn gb-btn-medium gb-btn-primary">Submit...</Link>
            </React.Fragment>
        )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setInsurancePaymentStatus: jobId => dispatch(setInsurancePaymentStatus(jobId))
});

export default connect(null, mapDispatchToProps)(ProgressSingleJobPhotographer);
