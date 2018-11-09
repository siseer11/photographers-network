import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { pushPrivateJob } from "../redux/actions/privateJob-action";

import CreateJobForm from "./CreateJobForm";

class HireMeNewJobForm extends React.Component {
  static propTypes = {
    backHandler: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    photographerId: PropTypes.string.isRequired,
    photographerName: PropTypes.string.isRequired,
    sendRequestHandler: PropTypes.func.isRequired
  };

  submitHandler = values => {
    /*
      phootgrapherName,
      sendRequestHandler,
    */

    const { company, photographerId, pushPrivateJob } = this.props;
    pushPrivateJob(values, company, photographerId);
  };

  render() {
    const { backHandler } = this.props;
    return (
      <div style={{ zIndex: 120 }} className="z">
        <h2 className="send-job-offer-back" onClick={backHandler}>
          BACK
        </h2>
        <CreateJobForm submitHandler={this.submitHandler} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pushPrivateJob: (jobData, company, photographerId) =>
    dispatch(pushPrivateJob(jobData, company, photographerId))
});

export default connect(
  null,
  mapDispatchToProps
)(HireMeNewJobForm);
