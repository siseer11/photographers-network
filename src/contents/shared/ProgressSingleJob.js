import React from "react";
import fire from "../../config/Fire";
import LoadingPage from "../../components/LoadingPage";
import OpenSingleJobPhotographer from "../photographer/OpenSingleJobPhotographer";
import {JobDescription} from "../../components/single-job/JobDescription";
import NavFooterWrapper from "../shared/NavFooterWrapper";
import ProgressSingleJobCompany from "../company/ProgressSingleJobCompany";
import ProgressSingleJobPhotographer from "../photographer/ProgressSingleJobPhotographer";

export default class ProgressSingleJob extends React.Component {
  render() {
    return (
      <div>
        {this.props.loading === false ? (
          <ProgressSingleJobFetchWithNav {...this.props} />
        ) : (
          <LoadingPage/>
        )}
      </div>
    );
  }
}

class ProgressSingleJobFetch extends React.Component {
  state = {
    jobId: this.props.match.params.jobid,
    jobDescription: null,
    loadingData: true,
    acceptedApplicant: "",
    downPayment: true,
    jobExists: true,
    submittedWork: [],
    acceptedWork: false
  };
  database = fire.database();

  componentDidMount() {
    this.fetchDatabaseInfo(this.props.match.params.jobid);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchDatabaseInfo(nextProps.match.params.jobid);
  }

  /**
   * Fetches information about the job from the database.
   */
  fetchDatabaseInfo = jobId => {
    const {user} = this.props;
    this.database
      .ref("requests")
      .child(jobId)
      .once("value", async snap => {
        // checks, if job exists
        if (!snap.exists()) {
          await this.setState({jobExists: false, loadingData: false,});
          return -1;
        }
        const response = snap.val();
        this.setState(
          () => ({
            jobId: jobId,
            jobDescription: response,
            loadingData: false,
            acceptedApplicant: response.phootgrapher
          })
        );
      })
      .catch(err => console.log(err));
  };

  setAcceptedWork = () => {
    this.setState({acceptedWork:true});
  };

  render() {
    const {
      loadingData,
      jobDescription,
      acceptedApplicant,
      submittedWork,
      acceptedWork,
      jobId
    } = this.state;

    if (loadingData) return <LoadingPage/>;

    const {user} = this.props;
    const {title, description, date, location, price, type, company, companyName} = jobDescription;

    return (
      <div className="single-job-view section-content">
        <JobDescription title={title} description={description} date={date} location={location} price={price}
                        type={type}
                        company={company} companyName={companyName}/>
        {
          user.type === "photographer" ?
            <ProgressSingleJobPhotographer submittedWork={submittedWork}
                                           acceptedWork={acceptedWork}
                                           jobId={jobId}
            />
            :
            <ProgressSingleJobCompany acceptedApplicant={acceptedApplicant}
                                      submittedWork={submittedWork}
                                      setAcceptedWork={this.setAcceptedWork}
            />
        }
      </div>

    );
  }
}

const ProgressSingleJobFetchWithNav = NavFooterWrapper(ProgressSingleJobFetch);
