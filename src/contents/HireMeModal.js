import React from "react";
import fire from "../config/Fire";
import { PropTypes } from "prop-types";

import { ChoseTypeHireMe } from "../components/ChoseTypeHireMe";
import HireMeNewJobForm from "./HireMeNewJobForm";
import HireMeExistingJobOffer from "./HireMeExistingJobOffer";

export default class HireMeModal extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    photographerId: PropTypes.string.isRequired,
    photographerName: PropTypes.string.isRequired
  };

  state = {
    page: "choose",
    reqSentLoading: false
  };

  typeChangeHandler = newOne => {
    this.setState({
      page: newOne
    });
  };

  backToChose = () => {
    this.setState({
      page: "choose"
    });
  };

  render() {
    const { page, reqSentLoading } = this.state;
    const { company, photographerId, photographerName } = this.props;
    return (
      <div className="hireme-full-overlay">
        <div className="black-overlay close" />
        {page == "new-job" ? (
          <HireMeNewJobForm
            backHandler={this.backToChose}
            company={company}
            photographerId={photographerId}
            photographerName={photographerName}
          />
        ) : page == "existing-job" ? (
          <HireMeExistingJobOffer
            backHandler={this.backToChose}
            photographerName={photographerName}
            company={company}
            photographerId={photographerId}
            typeHandler={this.typeChangeHandler}
            reqSentLoading={reqSentLoading}
          />
        ) : (
          <ChoseTypeHireMe typeHandler={this.typeChangeHandler} />
        )}
      </div>
    );
  }
}
