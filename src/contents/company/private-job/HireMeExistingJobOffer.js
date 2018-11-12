import React from "react";
import { connect } from "react-redux";
import {
  fetchCreatedJobs,
  pushNotification
} from "../../../redux/actions/privateJob-action";

import { AvailableJobsToSendList } from "../../../components/AvailableJobsToSendList";

class HireMeExistingJobOffer extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    if (this.props.openJobs.length == 0) {
      this.props.fetchCreatedJobs(user);
    } else {
      console.log("e deja , ba pul");
    }
  }

  render() {
    const {
      loading,
      openJobs,
      sendRequestHandler,
      backHandler,
      user,
      photographerId,
      reqSentLoading
    } = this.props;
    return (
      <div className="asd">
        {loading ? (
          <h2>Loading..... Waint no spinner?</h2>
        ) : (
          <AvailableJobsToSendList
            backHandler={backHandler}
            existingJobs={openJobs}
            sendRequestHandler={sendRequestHandler}
            reqSentLoading={reqSentLoading}
            company={user}
            photographerId={photographerId}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const privateReq = state.privateJobRequest;
  return {
    user: state.user.userData,
    openJobs: privateReq.openJobsData,
    loading: privateReq.loadingOpenJobs,
    reqSentLoading: privateReq.loadingPushingNotification
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCreatedJobs: companyData => dispatch(fetchCreatedJobs(companyData)),
  sendRequestHandler: (photographerId, company, jobId) =>
    dispatch(pushNotification(photographerId, company, jobId, false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HireMeExistingJobOffer);
