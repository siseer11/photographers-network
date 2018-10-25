import React from "react";
import WithModal from "../RenderProp/WithModal";
import fire from "../config/Fire";
import LoadingPage from "../components/LoadingPage";
import { CreateJobbForm } from "../components/CreateJobbForm";

export const HireButton = ({ uid, photographerName, siggnedInUser }) => (
  <WithModal closeItemClass="close">
    {({ showModal, closeModalListener }) => (
      <React.Fragment>
        <div className="hire-button">
          <h5>Hire me!</h5>
        </div>
        {showModal && (
          <HireMeTypeSelect
            closeModal={closeModalListener}
            photographerId={uid}
            photographerName={photographerName}
            company={siggnedInUser}
          />
        )}
      </React.Fragment>
    )}
  </WithModal>
);

class HireMeTypeSelect extends React.Component {
  state = {
    page: "choose",
    reqSentLoading: false
  };

  typeChangeHandler = newOne => {
    this.setState({
      page: newOne
    });
  };

  /* PUSH THE JOB REQ AS NOTIFICATION TO PHOTOGRAPHER */
  sendRequestHandler = (jobbId, newCreatedJob = false) => {
    const { photographerId, company, closeModal } = this.props;
    this.setState({
      reqSentLoading: true
    });

    const changeToSentToPrivate = jobId => {
      fire
        .database()
        .ref("requests")
        .child(jobId)
        .update(
          {
            sentToPrivate: true
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log("finished");
              this.setState({
                reqSentLoading: false
              });
              closeModal();
            }
          }
        );
    };

    fire
      .database()
      .ref("users")
      .child(photographerId)
      .child("notifications")
      .push(
        {
          link: `private/job/${jobbId}?user=${photographerId}`,
          read: false,
          title: `You got a new private job request from ${
            company.displayName
          }`,
          time: new Date().getTime()
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("notification pushed succesfull");
            if (newCreatedJob) {
              this.setState({
                reqSentLoading: false
              });
              closeModal();
            } else {
              changeToSentToPrivate(jobbId);
            }
          }
        }
      );
  };

  render() {
    const { page, reqSentLoading } = this.state;
    const { company, photographerId, photographerName } = this.props;
    return (
      <div className="hireme-full-overlay">
        <div className="black-overlay close" />
        {page == "new-job" ? (
          <HireMeNewJobForm
            company={company}
            photographerId={photographerId}
            photographerName={photographerName}
            sendRequestHandler={this.sendRequestHandler}
          />
        ) : page == "existing-job" ? (
          <HireMeExistingJobOffer
            photographerName={photographerName}
            company={company}
            photographerId={photographerId}
            typeHandler={this.typeChangeHandler}
            sendRequestHandler={this.sendRequestHandler}
            reqSentLoading={reqSentLoading}
          />
        ) : (
          <ChoseTypeHireMe typeHandler={this.typeChangeHandler} />
        )}
      </div>
    );
  }
}

class HireMeNewJobForm extends React.Component {
  state = {
    jobbTitle: "",
    jobbLocation: "",
    jobbType: "nature",
    jobbBudget: "",
    jobbDate: "",
    jobbDescription: "",
    today: ""
  };

  optionSelectHandler = type => {
    this.setState({
      jobbType: type
    });
  };

  showCustomSelectHandler = () => {
    this.setState(
      prevState => ({
        showCustomSelect: !prevState.showCustomSelect
      }),
      () => {
        if (this.state.showCustomSelect === true) {
          window.addEventListener("click", e => {
            if (!e.target.classList.contains("custom-select")) {
              this.setState({
                showCustomSelect: false
              });
            }
          });
        }
      }
    );
  };

  changeHandler = e => {
    this.setState(
      {
        [`jobb${e.target.name}`]: e.target.value
      },
      () => console.log(this.state.jobbDate)
    );
  };

  submitHandler = e => {
    e.preventDefault();
    const {
      jobbTitle,
      jobbLocation,
      jobbType,
      jobbBudget,
      jobbDate,
      jobbDescription
    } = this.state;
    const { company, photographerId, sendRequestHandler } = this.props;
    const jobbId = fire
      .database()
      .ref("requests")
      .push().key;

    fire
      .database()
      .ref("requests")
      .child(jobbId)
      .set(
        {
          title: jobbTitle,
          description: jobbDescription,
          price: Number(jobbBudget),
          location: jobbLocation,
          type: jobbType,
          date: new Date(jobbDate).getTime(),
          status: "open",
          payment: "soooooon",
          phootgrapher: "none",
          companyId: company.uid,
          companyName: company.displayName,
          sentTo: photographerId,
          jobbId: jobbId,
          sentToPrivate: true
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("done, almost...");
            addPrivateJobToComapny();
          }
        }
      );

    const addPrivateJobToComapny = () => {
      fire
        .database()
        .ref("company")
        .child(company.uid)
        .child("privateJobs")
        .child(jobbId)
        .set(
          {
            jobId: jobbId,
            private: true
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log("done, almost....");
              sendRequestHandler(jobbId, true);
            }
          }
        );
    };
  };

  render() {
    return (
      <div style={{ zIndex: 120 }} className="z">
        <CreateJobbForm
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          showCustomSelectHandler={this.showCustomSelectHandler}
          optionSelectHandler={this.optionSelectHandler}
          {...this.state}
        />
      </div>
    );
  }
}

class HireMeExistingJobOffer extends React.Component {
  state = {
    loading: true,
    existingJobs: []
  };

  componentDidMount() {
    const { company } = this.props;

    //Get all the jobs ids
    fire
      .database()
      .ref("company")
      .child(company.uid)
      .once("value")
      .then(snap => {
        let postedJobsIds = snap.val().postedJobs;
        postedJobsIds = postedJobsIds ? Object.values(postedJobsIds) : [];

        if (postedJobsIds.length > 0) {
          getOpenJobs(postedJobsIds);
        } else {
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => console.log(err));

    //Get the open jobs
    const getOpenJobs = jobs => {
      let promises = jobs.map(el =>
        fire
          .database()
          .ref("requests")
          .child(el.jobId)
          .once("value")
      );

      //wait for all the jobs to be fetched
      Promise.all(promises)
        .then(values => {
          const filteredJobs = values
            .map(job => job.val())
            .filter(
              jobValue => jobValue.status === "open" && !jobValue.sentToPrivate
            ); //filter out the ones that aren't open
          this.setState({
            loading: false,
            existingJobs: filteredJobs
          });
        })
        .catch(err => console.log(err));
    };
  }

  render() {
    const { loading, existingJobs } = this.state;
    const { reqSentLoading, sendRequestHandler } = this.props;
    return (
      <div className="asd">
        {loading ? (
          <h2>Loading..... Waint no spinner?</h2>
        ) : (
          <SendJobToPhotographer
            existingJobs={existingJobs}
            sendRequestHandler={sendRequestHandler}
            reqSentLoading={reqSentLoading}
          />
        )}
      </div>
    );
  }
}

const SendJobToPhotographer = ({
  existingJobs,
  sendRequestHandler,
  reqSentLoading
}) => (
  <React.Fragment>
    {existingJobs.length == 0 ? (
      <h2>There are no jobs, at least no open jobs</h2>
    ) : reqSentLoading ? (
      <h2>Sending....</h2>
    ) : (
      <ul className="openjobslist">
        {existingJobs.map(el => (
          <li className="openjobitem" key={el.jobbId}>
            <div className="job-infos">
              <h2 className="openjobtitle">{el.title}</h2>
              <p className="openjobtitle">{el.descrition}</p>
              <p className="openjoblocation">{el.location}</p>
              <p className="openjobprice">{el.price}£</p>
            </div>
            <div
              onClick={() => sendRequestHandler(el.jobbId)}
              className="sendoffer"
            >
              Send
            </div>
          </li>
        ))}
      </ul>
    )}
  </React.Fragment>
);

const ChoseTypeHireMe = ({ typeHandler }) => (
  <div className="hire-me-type-selector">
    <div onClick={() => typeHandler("new-job")} className="hire-me-type-one">
      <h2>Create a new job offer.</h2>
      <div className="my-fency-button">Select</div>
    </div>
    <div
      onClick={() => typeHandler("existing-job")}
      className="hire-me-type-one"
    >
      <h2>Select from one of your jobs.</h2>
      <div className="my-fency-button">Select</div>
    </div>
  </div>
);
