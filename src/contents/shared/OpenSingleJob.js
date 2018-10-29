import React from "react";
import fire from "../../config/Fire";
import LoadingPage from "../../components/LoadingPage";
import OpenSingleJobPhotographer from "../photographer/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../company/OpenSingleJobCompany";
import {JobDescription} from "../../components/single-job/JobDescription";
import NavFooterWrapper from "../shared/NavFooterWrapper";

export default class OpenSingleJob extends React.Component {
  render() {
    return (
      <div>
        {this.props.loading === false ? (
          <OpenSingleJobFetchWithNav {...this.props} />
        ) : (
          <LoadingPage/>
        )}
      </div>
    );
  }
}

class OpenSingleJobFetch extends React.Component {
  state = {
    jobId: this.props.match.params.jobid,
    jobDescription: null,
    loadingData: true,
    userApplied: false,
    appliedPhotographers: [],
    acceptedApplicant: "",
    downPayment: false,
    isDeclinedPhotographer: false,
    jobExists: true
  };
  database = fire.database();

  componentDidMount() {
    this.fetchDatabaseInfo(this.props.match.params.jobid);
    this.setEventListensers();
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
        const photographersObj = response["photographers-applied"]
          ? response["photographers-applied"]
          : [];
        let appliedPhotographers = Object.keys(photographersObj).map(key => {
          let photographer = photographersObj[key];
          return {
            uid: key,
            ...photographer
          };
        });
        this.setState(
          () => ({
            jobId: jobId,
            jobDescription: response,
            userApplied: user
              ? photographersObj.hasOwnProperty(user.uid)
              : false,
            loadingData: false,
            appliedPhotographers: appliedPhotographers,
            acceptedApplicant: response.phootgrapher
          }),
          () => this.userIsDeclinedPhotographer()
        );
      })
      .catch(err => console.log(err));
  };

  /**
   * Checks, if user has already applied to the job and has been declined.
   */
  userIsDeclinedPhotographer() {
    const {user} = this.props;
    if (user.type === "photographer") {
      this.database
        .ref("photographer")
        .child(user.uid)
        .child("applied-jobs")
        .child(this.state.jobId)
        .once("value", snap => {
          this.setState({isDeclinedPhotographer: snap.exists()});
        });
    }
  }

  /**
   * Sets event listeners for changes in the database.
   */
  setEventListensers = () => {
    const {jobId, appliedPhotographers} = this.state;
    let appliedPhotographersCopy = [...appliedPhotographers];

    // Event listener if applicant was added
    this.database
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .on("child_added", snap => {
        let data = snap.val();
        appliedPhotographersCopy.push({
          uid: snap.key,
          displayName: data.displayName,
          email: data.email
        });
        this.setState({appliedPhotographers: appliedPhotographersCopy});
      });
  };

  render() {
    const {
      loadingData,
      jobDescription,
      userApplied,
      appliedPhotographers,
      jobId,
      isDeclinedPhotographer,
      acceptedApplicant,
      downPayment
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
            <OpenSingleJobPhotographer userApplied={userApplied}
                                       isDeclinedPhotographer={isDeclinedPhotographer}
                                       jobDescription={jobDescription}
                                       jobId={jobId}
                                       user={user}
            />
            :
            <OpenSingleJobCompany appliedPhotographers={appliedPhotographers}
                                  jobDescription={jobDescription}
                                  acceptedApplicant={acceptedApplicant}
                                  downPayment={downPayment}
            />
        }
      </div>

    );
  }
}

const OpenSingleJobFetchWithNav = NavFooterWrapper(OpenSingleJobFetch);
